import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireUser } from "@/lib/auth-middleware";
import { guestInvitationEmail, personLinkEmail } from "@/lib/emails";
import { readPhrases } from "@/lib/idea-fns";
import { newToken } from "@/lib/tokens";

/** The chapter lifecycle, in the only order the desk can walk it. */
const NEXT_STATE = {
  started: "curating",
  curating: "with_person_items",
  with_person_items: "with_person_guests",
  with_person_guests: "sent_to_guests",
  sent_to_guests: "closed",
};

const EIGHT = 8;

const daysIn = (from) =>
  Math.max(0, Math.floor((Date.now() - new Date(from || Date.now()).getTime()) / 86400000));

/** Only the curator works here. Entity rules already gate the desk; this is the door. */
const serviceFor = (context) => {
  if (context.user?.role !== "admin") {
    throw Object.assign(new Error("The curator desk is for the curator"), {
      status: 403,
      code: "FORBIDDEN",
    });
  }
  return context.getBase44().asServiceRole;
};

const hostOf = (value) => {
  if (!value) return "";
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

export const listChapters = createServerFn({ method: "GET" })
  .middleware([requireUser])
  .handler(async ({ context }) => {
    const service = serviceFor(context);
    const page = await service.entities.Chapter.list({ sort: "-created_date", limit: 200 });
    const chapters = page.items ?? page;

    return chapters.map((chapter) => ({
      id: chapter.id,
      reference: chapter.reference || "",
      person_name: chapter.person_name,
      chapter_type: chapter.chapter_type,
      starter_name: chapter.starter_name || "",
      state: chapter.state,
      days_in_state: daysIn(chapter.state_changed_at || chapter.created_date),
      is_sample: Boolean(chapter.is_sample),
    }));
  });

export const getChapter = createServerFn({ method: "GET" })
  .middleware([requireUser])
  .validator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    const chapter = await service.entities.Chapter.get(data.id).catch((error) => {
      if (error?.status === 404) return null;
      throw error;
    });
    if (!chapter) return null;

    const itemPage = await service.entities.Item.filter(
      { chapter_id: chapter.id },
      { sort: "position", limit: 20 },
    );
    const guestPage = await service.entities.Guest.filter(
      { chapter_id: chapter.id },
      { limit: 50 },
    );
    const reasonPage = await service.entities.EditReason.filter(
      { chapter_id: chapter.id },
      { sort: "-created_date", limit: 20 },
    );
    const claimPage = await service.entities.Claim.filter(
      { chapter_id: chapter.id },
      { limit: 50 },
    );
    const claims = claimPage.items ?? claimPage;
    const ideaPage = await service.entities.InventoryIdea.filter(
      { chapter_id: chapter.id },
      { sort: "-created_date", limit: 20 },
    );

    return {
      chapter,
      items: (itemPage.items ?? itemPage).map((item) => {
        const claim = claims.find((row) => row.item_id === item.id);
        return {
          id: item.id,
          position: item.position,
          name: item.name,
          photo_url: item.photo_url || "",
          price: item.price ?? null,
          source: item.source || "",
          source_url: item.source_url || "",
          why: item.why || "",
          status: item.status,
          claim: claim ? claim.display_name || "Someone who cares" : "",
        };
      }),
      guests: (guestPage.items ?? guestPage).map((guest) => ({
        id: guest.id,
        name: guest.name,
        email: guest.email,
        shared_idea: guest.shared_idea || "",
        shared_idea_note: guest.shared_idea_note || "",
      })),
      reasons: (reasonPage.items ?? reasonPage).map((row) => ({
        id: row.id,
        item_id: row.item_id,
        reason_code: row.reason_code,
        note: row.note || "",
      })),
      ideas: (ideaPage.items ?? ideaPage).map((row) => ({
        id: row.id,
        concept: row.concept,
        detail: row.detail || "",
        category: row.category || "",
        reason: row.reason || "",
        phrases: readPhrases(row.phrases),
      })),
    };
  });

const itemFields = z.object({
  name: z.string().trim().min(1).max(120),
  photo_url: z.string().trim().max(600),
  price: z.number().min(0).max(100000),
  source_url: z.string().trim().max(600),
  why: z.string().trim().min(1).max(600),
});

export const addItem = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(itemFields.extend({ chapter_id: z.string().min(1) }))
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    const existing = await service.entities.Item.filter(
      { chapter_id: data.chapter_id },
      { limit: 20 },
    );
    const rows = existing.items ?? existing;
    if (rows.length >= EIGHT) {
      throw Object.assign(new Error("Eight is the limit"), { status: 400 });
    }

    return service.entities.Item.create({
      chapter_id: data.chapter_id,
      position: rows.length + 1,
      name: data.name,
      photo_url: data.photo_url,
      price: data.price,
      source: hostOf(data.source_url),
      source_url: data.source_url,
      why: data.why,
      status: "proposed",
    });
  });

export const reorderItems = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    z.object({
      chapter_id: z.string().min(1),
      ids: z.array(z.string().min(1)).min(1).max(EIGHT),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    const existing = await service.entities.Item.filter(
      { chapter_id: data.chapter_id },
      { limit: 20 },
    );
    const rows = existing.items ?? existing;
    const known = new Set(rows.map((row) => row.id));
    if (data.ids.length !== rows.length || data.ids.some((id) => !known.has(id))) {
      throw Object.assign(new Error("That list is out of date"), { status: 400 });
    }

    await service.entities.Item.bulkUpdate(
      data.ids.map((id, index) => ({ id, position: index + 1 })),
    );
    return { ok: true };
  });

export const replaceItem = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    itemFields.extend({
      item_id: z.string().min(1),
      chapter_id: z.string().min(1),
      reason_code: z.enum(["price", "taste", "duplicate", "availability", "person_asked"]),
      note: z.string().trim().max(400),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    await service.entities.Item.update(data.item_id, {
      name: data.name,
      photo_url: data.photo_url,
      price: data.price,
      source: hostOf(data.source_url),
      source_url: data.source_url,
      why: data.why,
      status: "edited",
    });

    await service.entities.EditReason.create({
      chapter_id: data.chapter_id,
      item_id: data.item_id,
      changed_by: "curator",
      reason_code: data.reason_code,
      note: data.note,
    });

    return { ok: true };
  });

const chunk = (rows, size) =>
  rows.reduce((all, row, index) => {
    const bucket = Math.floor(index / size);
    all[bucket] = [...(all[bucket] || []), row];
    return all;
  }, []);

/**
 * Every guest gets their own private link, sent in the starter's name. Links
 * are made once and kept, so a guest who comes back finds the same chapter.
 */
const sendGuestLinks = async (service, chapter, origin) => {
  const page = await service.entities.Guest.filter({ chapter_id: chapter.id }, { limit: 50 });
  const guests = page.items ?? page;
  if (!guests.length) {
    throw Object.assign(new Error("A chapter needs people before it goes out"), { status: 400 });
  }

  const base = origin.replace(/\/$/, "");
  const rows = [];

  for (const group of chunk(guests, 4)) {
    const settled = await Promise.all(
      group.map(async (guest) => {
        const guestToken = guest.guest_token || newToken();
        await service.entities.Guest.update(guest.id, {
          guest_token: guestToken,
          approved: true,
          invited_at: new Date().toISOString(),
        });

        const link = `${base}/guest/${guestToken}`;
        const letter = guestInvitationEmail({ chapter, guestName: guest.name, link });
        try {
          await service.integrations.Core.SendEmail({
            to: guest.email,
            subject: letter.subject,
            text: letter.text,
            html: letter.html,
            from_name: (chapter.starter_name || "Good Chapter").trim(),
            category: "transactional",
          });
          return { name: guest.name, link, sent: true };
        } catch {
          return { name: guest.name, link, sent: false };
        }
      }),
    );
    rows.push(...settled);
  }

  return {
    total: rows.length,
    sent: rows.filter((row) => row.sent).length,
    unsent: rows.filter((row) => !row.sent),
  };
};

/**
 * A chapter the person sent back goes to the curator again. The next send makes
 * fresh tokens, so the letter that was declined stops working.
 */
export const reopenChapter = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(z.object({ chapter_id: z.string().min(1) }))
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    const chapter = await service.entities.Chapter.get(data.chapter_id);
    if ((chapter.person_decision || "pending") !== "declined") {
      throw Object.assign(new Error("That chapter was not sent back"), { status: 400 });
    }

    await service.entities.Chapter.update(chapter.id, {
      state: "curating",
      state_changed_at: new Date().toISOString(),
      person_decision: "pending",
      person_decided_at: "",
    });

    return { ok: true };
  });

/**
 * Walk the chapter one state forward. The move to "With the person" is the
 * moment the letter leaves the building, so it asks for an answer first.
 */
export const advanceChapter = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    z.object({
      chapter_id: z.string().min(1),
      origin: z.string().url().max(300),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    const chapter = await service.entities.Chapter.get(data.chapter_id);
    const next = NEXT_STATE[chapter.state];
    if (!next) {
      throw Object.assign(new Error("This chapter has nowhere left to go"), { status: 400 });
    }

    if (next === "with_person_items") {
      const existing = await service.entities.Item.filter(
        { chapter_id: chapter.id },
        { limit: 20 },
      );
      const rows = existing.items ?? existing;
      if (rows.length !== EIGHT) {
        throw Object.assign(new Error("A chapter goes to the person with eight items"), {
          status: 400,
        });
      }
    }

    const accepted = (chapter.person_decision || "pending") === "accepted";
    if ((next === "with_person_guests" || next === "sent_to_guests") && !accepted) {
      throw Object.assign(new Error("The person has not answered yet"), { status: 400 });
    }

    const personToken = chapter.person_token || newToken();
    const acceptToken = next === "with_person_items" ? newToken() : chapter.accept_token;
    const declineToken = next === "with_person_items" ? newToken() : chapter.decline_token;

    await service.entities.Chapter.update(chapter.id, {
      state: next,
      state_changed_at: new Date().toISOString(),
      person_token: personToken,
      accept_token: acceptToken || "",
      decline_token: declineToken || "",
      ...(next === "with_person_items"
        ? { person_decision: "pending", person_decided_at: "" }
        : {}),
    });

    const result = { state: next, link: null, email: null };
    if (next === "sent_to_guests") {
      result.guests = await sendGuestLinks(service, chapter, data.origin);
      return result;
    }
    if (next !== "with_person_items") return result;

    const base = data.origin.replace(/\/$/, "");
    const link = `${base}/chapter/${personToken}`;
    result.link = link;

    const letter = personLinkEmail({
      chapter,
      link,
      acceptLink: `${base}/decide/${acceptToken}/accept`,
      declineLink: `${base}/decide/${declineToken}/decline`,
    });
    try {
      await service.integrations.Core.SendEmail({
        to: chapter.person_email,
        subject: letter.subject,
        text: letter.text,
        html: letter.html,
        from_name: "Good Chapter",
        category: "transactional",
      });
      result.email = { sent: true };
    } catch (error) {
      result.email = {
        sent: false,
        message: error?.message || "The letter did not send.",
      };
    }
    return result;
  });