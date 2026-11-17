import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireUser } from "@/lib/auth-middleware";

/** Only the curator reads or writes these. Entity rules gate the rest; this is the door. */
const serviceFor = (context) => {
  if (context.user?.role !== "admin") {
    throw Object.assign(new Error("The desk is for the curator"), {
      status: 403,
      code: "FORBIDDEN",
    });
  }
  return context.getBase44().asServiceRole;
};

/** Phrases travel as JSON so a record stays one row. */
export const readPhrases = (value) => {
  if (!value) return [];
  try {
    const rows = JSON.parse(value);
    if (!Array.isArray(rows)) return [];
    return rows.filter((row) => typeof row === "string" && row.trim()).slice(0, 5);
  } catch {
    return [];
  }
};

const IDEA = {
  type: "object",
  properties: {
    concept: { type: "string" },
    detail: { type: "string" },
    category: { type: "string" },
    phrases: { type: "array", items: { type: "string" } },
    reason: { type: "string" },
  },
  required: ["concept", "detail", "category", "phrases", "reason"],
};

const buildPrompt = (chapter, search, history) => `You name one product concept for a small independent shop. The shop sells the things that go into a chapter: eight objects chosen by hand for one person.

Today the shop has nothing that fits. Name the one thing it should start carrying.

The chapter:
- What it is: ${chapter.chapter_type || "not said"}
- What the person always wears: ${chapter.always_wears || "not said"}
- What the person rewatches: ${chapter.rewatches || "not said"}
- What the person would never buy themselves: ${chapter.never_buys || "not said"}
- The one gift the starter would give first: ${chapter.anchor_idea || "not said"}
- Money per thing: ${chapter.pool_amount ? `$${chapter.pool_amount}` : "no set amount"}
- What the curator already searched for: ${search || "nothing in particular"}

Ideas kept from earlier chapters, newest first. Build on them, never repeat one word for word:
${history.length ? history.map((line) => `- ${line}`).join("\n") : "- none yet"}

Rules:
- Name one object, not a category and not a bundle. The kind of thing a person keeps for years.
- The concept is four to seven words, written the way a shop labels a product. No brand names, no people's names, no prices.
- Detail is one sentence, at most twenty words, saying plainly what it is.
- Reason is one sentence, at most twenty words, saying why this closes the gap in this chapter.
- Category is one word, such as Kitchen, Textile, Light, Garden, Desk.
- Give up to four search phrases a buyer would type to source it. Three words or fewer each.
- Never use em dashes. Never mention AI. Never claim the shop has this today.`;

/**
 * When the store has nothing for a search, the model names the closest thing it
 * should carry. An idea only: it is never added to the eight from here.
 */
export const suggestInventoryIdea = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    z.object({
      chapter_id: z.string().min(1).max(64),
      query: z.string().trim().max(120).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    const chapter = await service.entities.Chapter.get(data.chapter_id).catch((error) => {
      if (error?.status === 404) return null;
      throw error;
    });
    if (!chapter) {
      throw Object.assign(new Error("That chapter is gone"), { status: 404 });
    }

    // What past chapters needed and the shop did not have, so the next answer
    // builds on real gaps rather than guessing from nothing.
    const past = await service.entities.InventoryIdea.list({ sort: "-created_date", limit: 60 });
    const history = [
      ...new Set(
        (past.items ?? past)
          .map((row) => [row.concept, row.category].filter(Boolean).join(", "))
          .filter(Boolean),
      ),
    ].slice(0, 20);

    const plan = await service.integrations.Core.InvokeLLM({
      prompt: buildPrompt(chapter, data.query || "", history),
      response_json_schema: IDEA,
    });

    const clean = {
      concept: String(plan?.concept || "").trim().slice(0, 90),
      detail: String(plan?.detail || "").trim().slice(0, 240),
      category: String(plan?.category || "").trim().slice(0, 40),
      reason: String(plan?.reason || "").trim().slice(0, 240),
      phrases: (Array.isArray(plan?.phrases) ? plan.phrases : [])
        .map((row) => String(row || "").trim().slice(0, 60))
        .filter(Boolean)
        .slice(0, 4),
    };

    if (!clean.concept) {
      throw Object.assign(new Error("The desk could not name anything"), { status: 502 });
    }

    return { idea: clean };
  });

/** Keep one idea with the chapter it came from. Still an idea, never an item. */
export const saveInventoryIdea = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    z.object({
      chapter_id: z.string().min(1).max(64),
      concept: z.string().trim().min(1).max(90),
      detail: z.string().trim().max(240).optional(),
      category: z.string().trim().max(40).optional(),
      reason: z.string().trim().max(240).optional(),
      phrases: z.array(z.string().trim().max(60)).max(4).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    const record = await service.entities.InventoryIdea.create({
      chapter_id: data.chapter_id,
      concept: data.concept,
      detail: data.detail ?? "",
      category: data.category ?? "",
      reason: data.reason ?? "",
      phrases: JSON.stringify((data.phrases ?? []).filter(Boolean)),
    });

    return { ok: true, id: record.id };
  });

/**
 * Every gap the shop has been asked to close, with repeats counted. Only the
 * product concepts are read here, never the chapter they came from.
 */
export const listInventoryIdeas = createServerFn({ method: "GET" })
  .middleware([requireUser])
  .handler(async ({ context }) => {
    const service = serviceFor(context);

    const page = await service.entities.InventoryIdea.list({ sort: "-created_date", limit: 200 });
    const rows = page.items ?? page;

    const counts = new Map();
    rows.forEach((row) => {
      const key = String(row.concept || "").trim().toLowerCase();
      if (!key) return;
      const seen = counts.get(key);
      counts.set(key, {
        concept: row.concept,
        category: row.category || "",
        count: (seen?.count ?? 0) + 1,
      });
    });

    return {
      total: rows.length,
      rows: [...counts.values()].sort((a, b) => b.count - a.count),
    };
  });