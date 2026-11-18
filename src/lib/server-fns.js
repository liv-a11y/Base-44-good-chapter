import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { BUDGET_PATHS, CHAPTER_TYPES } from "@/lib/chapter-types";

const EIGHT = 8;

const APP_URL = "https://goodchaptercollective.com";

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

/** One suggestion from the shop panel: a draft, reviewed by the curator. */
const suggestion = z.object({
  name: z.string().trim().min(1).max(160),
  photo_url: z.string().trim().max(600).optional(),
  price: z.number().min(0).max(100000).nullable().optional(),
  source: z.string().trim().max(120).optional(),
  source_url: z.string().trim().max(600).optional(),
  why: z.string().trim().max(400).optional(),
});

/** A concept the shop does not carry. Kept as an idea, never as an item. */
const gapConcept = z.object({
  concept: z.string().trim().min(1).max(90),
  detail: z.string().trim().max(240).optional(),
  category: z.string().trim().max(40).optional(),
  reason: z.string().trim().max(240).optional(),
  phrases: z.array(z.string().trim().max(60)).max(4).optional(),
});

const newChapter = z.object({
  personName: z.string().trim().min(1).max(80),
  personEmail: email,
  chapterType: z.enum(CHAPTER_TYPES),
  alwaysWears: z.string().trim().max(300),
  rewatches: z.string().trim().max(300),
  neverBuys: z.string().trim().max(300),
  starterIdeas: z.string().trim().max(600).optional(),
  path: z.enum(["anchor_gift", "employer_pool", "realtor_budget"]).optional(),
  anchorIdea: z.string().trim().max(120).optional(),
  anchorNote: z.string().trim().max(400).optional(),
  poolEmployer: z.string().trim().max(120).optional(),
  poolAmount: z.number().min(0).max(100000).optional(),
  poolTerm: z.string().trim().max(60).optional(),
  starterName: z.string().trim().min(1).max(80),
  starterEmail: email,
  guests: z.array(guest).max(40),
  items: z.array(suggestion).max(EIGHT).optional(),
  gaps: z.array(gapConcept).max(4).optional(),
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
    const record = await service.entities.Waitlist.create({
      email: data.email,
      interest: data.interest,
      comments: data.comments ?? "",
    });

    // The receipt goes out at submission. It is not part of the answer: a send
    // that fails leaves the request saved, and the desk shows it as unsent.
    try {
      await service.integrations.Core.SendEmail({
        to: record.email,
        template_name: "PartnerAcknowledgment",
        variables: { interest: record.interest, app_url: APP_URL },
        category: "transactional",
        from_name: "Good Chapter Co.",
      });
      await service.entities.Waitlist.update(record.id, {
        acknowledged_at: new Date().toISOString(),
      });
    } catch {
      // Nothing to do: the curator can send it from the desk once email is set up.
    }

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

    // A set amount starts from a number instead of an anchor gift.
    const path = data.path ?? "anchor_gift";
    const budget = BUDGET_PATHS.includes(path);

    const chapter = await service.entities.Chapter.create({
      person_name: data.personName,
      person_email: data.personEmail,
      chapter_type: data.chapterType,
      starter_name: data.starterName,
      starter_email: data.starterEmail,
      always_wears: data.alwaysWears,
      rewatches: data.rewatches,
      never_buys: data.neverBuys,
      starter_ideas: data.starterIdeas ?? "",
      path,
      anchor_idea: budget ? "" : (data.anchorIdea ?? ""),
      anchor_note: budget ? "" : (data.anchorNote ?? ""),
      pool_employer: budget ? (data.poolEmployer ?? "") : "",
      pool_amount: budget ? (data.poolAmount ?? 0) : 0,
      pool_term: budget ? (data.poolTerm ?? "") : "",
      state: "started",
      state_changed_at: new Date().toISOString(),
      is_sample: false,
      reference: reference(),
      person_token: personToken(),
    });

    // The shop suggestions the starter saw become the draft list. Draft only:
    // the curator reads and can replace each one before the person sees it.
    if (data.items?.length) {
      await service.entities.Item.bulkCreate(
        data.items.slice(0, EIGHT).map((row, index) => ({
          chapter_id: chapter.id,
          position: index + 1,
          name: row.name,
          photo_url: row.photo_url ?? "",
          price: row.price ?? 0,
          source: row.source ?? "",
          source_url: row.source_url ?? "",
          why: row.why ?? "",
          status: "proposed",
        })),
      );
    }

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

    // What the shop could not answer, kept with the chapter so the shelf can be
    // stocked later. An idea only: none of these become items.
    if (data.gaps?.length) {
      await service.entities.InventoryIdea.bulkCreate(
        data.gaps.map((row) => ({
          chapter_id: chapter.id,
          concept: row.concept,
          detail: row.detail ?? "",
          category: row.category ?? "",
          reason: row.reason ?? "",
          phrases: JSON.stringify((row.phrases ?? []).filter(Boolean)),
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