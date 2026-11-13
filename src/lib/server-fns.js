import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CHAPTER_TYPES } from "@/lib/chapter-types";

const EIGHT = 8;

/** The person can still change their answers until the list goes out to guests. */
const ANSWERS_OPEN_STATES = ["started", "curating", "with_person_items", "with_person_guests"];

export const getServerInfo = createServerFn({ method: "GET" }).handler(async () => ({
  renderedAt: new Date().toISOString(),
}));

const email = z
  .string()
  .trim()
  .min(3)
  .max(160)
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Needs an email address");

const guest = z.object({
  name: z.string().trim().min(1).max(80),
  email,
});

const newChapter = z.object({
  personName: z.string().trim().min(1).max(80),
  personEmail: email,
  chapterType: z.enum(CHAPTER_TYPES),
  alwaysWears: z.string().trim().max(300),
  rewatches: z.string().trim().max(300),
  neverBuys: z.string().trim().max(300),
  starterName: z.string().trim().min(1).max(80),
  starterEmail: email,
  guests: z.array(guest).max(40),
});

const reference = () =>
  `GC-${Math.random().toString(36).slice(2, 5).toUpperCase()}${Math.random().toString(36).slice(2, 4).toUpperCase()}`;

const personToken = () =>
  Array.from({ length: 20 }, () => "abcdefghijkmnpqrstuvwxyz23456789"[Math.floor(Math.random() * 32)]).join("");

/**
 * The public invitation request on the site. Visitors are not signed in, so
 * this writes the request as the operator after checking its shape. Only the
 * request itself is stored; nothing is emailed from here.
 */
export const requestInvitation = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email,
      interest: z.enum([
        "Consumer",
        "Founding partner: Employer",
        "Founding partner: Real estate",
        "Founding partner: Brand",
        "Investor",
        "General inquiry",
      ]),
      comments: z.string().trim().max(1000).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;
    await service.entities.Waitlist.create({
      email: data.email,
      interest: data.interest,
      comments: data.comments ?? "",
    });
    return { ok: true };
  });

/**
 * The starter flow writes one chapter plus its guest list. The starter does not
 * hold an account, so this runs as the operator and stores the submission for
 * the curator. Nothing is emailed from here.
 */
export const startChapter = createServerFn({ method: "POST" })
  .validator(newChapter)
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const chapter = await service.entities.Chapter.create({
      person_name: data.personName,
      person_email: data.personEmail,
      chapter_type: data.chapterType,
      starter_name: data.starterName,
      starter_email: data.starterEmail,
      always_wears: data.alwaysWears,
      rewatches: data.rewatches,
      never_buys: data.neverBuys,
      state: "started",
      state_changed_at: new Date().toISOString(),
      is_sample: false,
      reference: reference(),
      person_token: personToken(),
    });

    if (data.guests.length) {
      await service.entities.Guest.bulkCreate(
        data.guests.map((row) => ({
          chapter_id: chapter.id,
          name: row.name,
          email: row.email,
          approved: false,
        })),
      );
    }
    return { reference: chapter.reference, id: chapter.id };
  });

/** The seeded sample chapter, shown on the home page with its SAMPLE label. */
export const getSampleChapter = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  const service = context.getBase44().asServiceRole;
  const chapters = await service.entities.Chapter.filter({ is_sample: true }, { limit: 1 });
  const chapter = chapters.items?.[0] ?? chapters[0];
  if (!chapter) return null;

  const items = await service.entities.Item.filter(
    { chapter_id: chapter.id },
    { sort: "position", limit: 8 },
  );
  const rows = items.items ?? items;

  return {
    person_name: chapter.person_name,
    chapter_type: chapter.chapter_type,
    story_line: chapter.story_line,
    items: rows.map((item) => ({
      name: item.name,
      photo_url: item.photo_url,
      price: item.price,
      source: item.source,
      why: item.why,
    })),
  };
});

/**
 * The person's own chapter, reached only with the private token from their
 * letter. The token is the key, so this runs as the operator.
 */
export const getChapterByToken = createServerFn({ method: "GET" })
  .validator(z.object({ token: z.string().trim().min(12).max(64) }))
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const chapterPage = await service.entities.Chapter.filter(
      { person_token: data.token },
      { limit: 1 },
    );
    const chapter = (chapterPage.items ?? chapterPage)[0];
    if (!chapter) return null;

    const itemPage = await service.entities.Item.filter(
      { chapter_id: chapter.id },
      { sort: "position", limit: EIGHT },
    );

    const decision = chapter.person_decision || "pending";
    /** A letter with buttons went out and has not been answered: the list is read only. */
    const awaiting = Boolean(chapter.accept_token) && decision === "pending";

    return {
      person_name: chapter.person_name,
      chapter_type: chapter.chapter_type,
      story_line: chapter.story_line,
      state: chapter.state,
      is_sample: Boolean(chapter.is_sample),
      starter_name: chapter.starter_name || "",
      person_decision: decision,
      decided_on: chapter.person_decided_at
        ? new Date(chapter.person_decided_at).toLocaleDateString("en-US", {
            timeZone: "UTC",
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "",
      await_answer: awaiting,
      accept_token: awaiting ? chapter.accept_token : "",
      decline_token: awaiting ? chapter.decline_token || "" : "",
      answers_open:
        ANSWERS_OPEN_STATES.includes(chapter.state) && !awaiting && decision !== "declined",
      items: (itemPage.items ?? itemPage).map((item) => ({
        id: item.id,
        name: item.name,
        photo_url: item.photo_url || "",
        price: item.price ?? null,
        source: item.source || "",
        source_url: item.source_url || "",
        why: item.why || "",
        status: item.status || "proposed",
      })),
    };
  });

/**
 * The person answers one item from their private link. The link token is the
 * only key, so this runs as the operator and checks the item belongs to the
 * chapter that token opens. Answers close once the chapter moves on to guests.
 */
export const answerItem = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string().trim().min(12).max(64),
      itemId: z.string().trim().min(1).max(64),
      answer: z.enum(["approved", "declined"]),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const chapterPage = await service.entities.Chapter.filter(
      { person_token: data.token },
      { limit: 1 },
    );
    const chapter = (chapterPage.items ?? chapterPage)[0];
    if (!chapter || !ANSWERS_OPEN_STATES.includes(chapter.state)) return { ok: false };
    if (chapter.accept_token && (chapter.person_decision || "pending") === "pending") {
      return { ok: false };
    }

    const item = await service.entities.Item.get(data.itemId).catch((error) => {
      if (error.status === 404) return null;
      throw error;
    });
    if (!item || item.chapter_id !== chapter.id) return { ok: false };

    const updated = await service.entities.Item.update(item.id, { status: data.answer });
    return { ok: true, status: updated.status ?? data.answer };
  });