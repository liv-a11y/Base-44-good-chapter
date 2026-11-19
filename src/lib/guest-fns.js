import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { paymentsReady } from "@/lib/payments";

/** Guests only ever see a chapter once it has gone out to them. */
export const OPEN_STATE = "sent_to_guests";

/** And never before the person has answered the letter. */
export const personSaidYes = (chapter) =>
  (chapter.person_decision || "pending") === "accepted";

/** The person's yes is the only thing that makes an item visible to guests. */
export const VISIBLE = ["approved", "given"];

export const guestByToken = async (service, token) => {
  const page = await service.entities.Guest.filter({ guest_token: token }, { limit: 1 });
  return (page.items ?? page)[0] ?? null;
};

export const findChapter = (service, id) =>
  service.entities.Chapter.get(id).catch((error) => {
    if (error?.status === 404) return null;
    throw error;
  });

/**
 * One guest's private link. The token is the only key, so this runs as the
 * operator and returns nothing but the approved list and who has taken what.
 */
export const getGuestChapter = createServerFn({ method: "GET" })
  .validator(z.object({ token: z.string().trim().min(12).max(64) }))
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const guest = await guestByToken(service, data.token);
    if (!guest) return null;

    const chapter = await findChapter(service, guest.chapter_id);
    if (!chapter) return null;

    const itemPage = await service.entities.Item.filter(
      { chapter_id: chapter.id },
      { sort: "position", limit: 8 },
    );
    const claimPage = await service.entities.Claim.filter(
      { chapter_id: chapter.id },
      { limit: 50 },
    );
    const claims = claimPage.items ?? claimPage;

    // Only money the provider confirmed counts toward an item.
    const paidPage = await service.entities.Contribution.filter(
      { chapter_id: chapter.id, status: "paid" },
      { limit: 200 },
    );
    const paid = paidPage.items ?? paidPage;

    return {
      checkout_ready: paymentsReady(),
      person_name: chapter.person_name,
      starter_name: chapter.starter_name || "A friend",
      chapter_type: chapter.chapter_type,
      state: chapter.state,
      open: chapter.state === OPEN_STATE && personSaidYes(chapter),
      accepted: personSaidYes(chapter),
      guest_name: guest.name,
      items: (itemPage.items ?? itemPage)
        .filter((item) => VISIBLE.includes(item.status))
        .map((item) => {
          const claim = claims.find((row) => row.item_id === item.id);
          const given = paid.filter((row) => row.item_id === item.id);
          const collected = given.reduce((sum, row) => sum + (row.amount || 0), 0);
          const mineGiven = given
            .filter((row) => row.guest_id === guest.id)
            .reduce((sum, row) => sum + (row.amount || 0), 0);
          return {
            id: item.id,
            name: item.name,
            photo_url: item.photo_url || "",
            price: item.price ?? null,
            source: item.source || "",
            source_url: item.source_url || "",
            why: item.why || "",
            giving_mode: item.giving_mode === "pool" ? "pool" : "individual",
            pool_target: item.pool_target ?? 0,
            collected,
            my_amount: mineGiven,
            givers: given.length,
            claim: claim
              ? {
                  display_name: claim.display_name || "",
                  mine: claim.guest_id === guest.id,
                }
              : null,
          };
        }),
    };
  });

const IDEAS_SCHEMA = {
  type: "object",
  properties: {
    ideas: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          what: { type: "string" },
          why: { type: "string" },
          find: { type: "string" },
        },
        required: ["name", "what", "why"],
      },
    },
  },
  required: ["ideas"],
};

const parseIdeas = (raw) => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((row) => row && row.name) : [];
  } catch {
    return [];
  }
};

const short = (value, limit) => (value ? String(value).slice(0, limit) : "");

/**
 * Three ideas for one guest, built from the chapter and stored on their own
 * record. Only that guest's link ever gets them back.
 */
export const getGuestIdeas = createServerFn({ method: "GET" })
  .validator(z.object({ token: z.string().trim().min(12).max(64) }))
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const guest = await guestByToken(service, data.token);
    if (!guest) return null;

    const chapter = await findChapter(service, guest.chapter_id);
    if (!chapter || chapter.state !== OPEN_STATE || !personSaidYes(chapter)) return null;

    const stored = parseIdeas(guest.ideas);
    if (stored.length) return { ideas: stored, shared: guest.shared_idea || "" };

    const itemPage = await service.entities.Item.filter(
      { chapter_id: chapter.id },
      { sort: "position", limit: 8 },
    );
    const approved = (itemPage.items ?? itemPage).filter((item) =>
      VISIBLE.includes(item.status),
    );

    const first = (chapter.person_name || "the person").trim().split(/\s+/)[0];
    const prompt = [
      `Three extra gift ideas for one guest in a chapter for ${first}. The guest sees these privately; nobody else does.`,
      `The chapter: ${short(chapter.chapter_type, 80)}.`,
      chapter.always_wears ? `What ${first} always wears: ${short(chapter.always_wears, 200)}` : "",
      chapter.rewatches ? `What ${first} rewatches: ${short(chapter.rewatches, 200)}` : "",
      chapter.never_buys ? `What ${first} would never buy: ${short(chapter.never_buys, 200)}` : "",
      chapter.anchor_idea ? `The starter's own anchor idea: ${short(chapter.anchor_idea, 120)}` : "",
      `The eight already approved: ${approved
        .map((item) => `${item.name} (${short(item.why, 120)})`)
        .join("; ")}`,
      "Give exactly three ideas for something this guest could give on top of those. Each is one real object a person can buy.",
      "Make them specific and unexpected, never a catalogue pick. No gift cards, no money, no bookings. Each must connect to something above in a way that is not obvious.",
      "For each: name (four words or fewer), what (one sentence on the object), why (one sentence on why it fits this person), find (where to look, a few words). Plain sentences, no exclamation marks, no dashes.",
    ]
      .filter(Boolean)
      .join("\n");

    const result = await service.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: IDEAS_SCHEMA,
    });

    const ideas = (result?.ideas ?? [])
      .filter((row) => row && row.name)
      .slice(0, 3)
      .map((row) => ({
        name: short(row.name, 90),
        what: short(row.what, 240),
        why: short(row.why, 280),
        find: short(row.find, 90),
      }));

    if (ideas.length) {
      await service.entities.Guest.update(guest.id, { ideas: JSON.stringify(ideas) });
    }

    return { ideas, shared: "" };
  });

/** One guest passes an idea to the curator. It is never added to the list. */
export const shareIdea = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string().trim().min(12).max(64),
      name: z.string().trim().min(1).max(90),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const guest = await guestByToken(service, data.token);
    if (!guest) return { ok: false };

    const chapter = await findChapter(service, guest.chapter_id);
    if (!chapter || chapter.state !== OPEN_STATE || !personSaidYes(chapter)) return { ok: false };

    const idea = parseIdeas(guest.ideas).find((row) => row.name === data.name);
    if (!idea) return { ok: false };

    await service.entities.Guest.update(guest.id, {
      shared_idea: idea.name,
      shared_idea_note: idea.what || "",
    });

    return { ok: true, shared: idea.name };
  });

/**
 * A guest takes one item. The token proves who they are, the claim is refused
 * if anything already holds that item, and the name they pick is stored with it.
 * An empty name is how someone gives without being named.
 */
export const claimItem = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string().trim().min(12).max(64),
      item_id: z.string().trim().min(1).max(64),
      display_name: z.string().trim().max(60),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const guest = await guestByToken(service, data.token);
    if (!guest) return { ok: false };

    const chapter = await findChapter(service, guest.chapter_id);
    if (!chapter || chapter.state !== OPEN_STATE || !personSaidYes(chapter)) return { ok: false };

    const item = await service.entities.Item.get(data.item_id).catch((error) => {
      if (error?.status === 404) return null;
      throw error;
    });
    if (!item || item.chapter_id !== chapter.id || !VISIBLE.includes(item.status)) {
      return { ok: false };
    }

    const takenPage = await service.entities.Claim.filter({ item_id: item.id }, { limit: 2 });
    if ((takenPage.items ?? takenPage).length) return { ok: false };

    await service.entities.Claim.create({
      chapter_id: chapter.id,
      item_id: item.id,
      guest_id: guest.id,
      display_name: data.display_name,
      claimed_at: new Date().toISOString(),
    });

    return { ok: true, display_name: data.display_name };
  });