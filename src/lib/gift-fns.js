import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { browseProducts, searchProducts, shopifyReady } from "@/lib/shopify.server";

const EIGHT = 8;
const GAP_LIMIT = 2;

const answers = z.object({
  alwaysWears: z.string().trim().max(300).optional(),
  rewatches: z.string().trim().max(300).optional(),
  neverBuys: z.string().trim().max(300).optional(),
  chapterType: z.string().trim().max(80).optional(),
  anchorIdea: z.string().trim().max(120).optional(),
  cap: z.number().min(0).max(100000).optional(),
});

const SEARCHES = {
  type: "object",
  properties: {
    searches: {
      type: "array",
      items: {
        type: "object",
        properties: {
          query: { type: "string" },
          why: { type: "string" },
        },
        required: ["query", "why"],
      },
    },
  },
  required: ["searches"],
};

const GAPS = {
  type: "object",
  properties: {
    gaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          concept: { type: "string" },
          detail: { type: "string" },
          category: { type: "string" },
          reason: { type: "string" },
          phrases: { type: "array", items: { type: "string" } },
        },
        required: ["concept", "detail", "category", "reason", "phrases"],
      },
    },
  },
  required: ["gaps"],
};

const aboutPerson = (data) => `- The chapter: ${data.chapterType || "not said"}
- What they always wear: ${data.alwaysWears || "not said"}
- What they rewatch: ${data.rewatches || "not said"}
- What they would never buy themselves: ${data.neverBuys || "not said"}
- The one gift the starter would give first: ${data.anchorIdea || "not said"}
- Money per thing: ${data.cap ? `$${data.cap}` : "no set amount"}`;

const historyLines = (recurring) =>
  recurring
    .slice(0, 8)
    .map(
      (row) =>
        `- ${row.concept}${row.category ? `, ${row.category}` : ""}, asked ${row.count} time${
          row.count === 1 ? "" : "s"
        }`,
    )
    .join("\n") || "- none yet";

const buildPrompt = (data, recurring) => `You are writing search box queries for a small shop, for one person's chapter.

About the person:
${aboutPerson(data)}

Things earlier chapters asked for and the shop does not carry, most asked first. This is a signal of what chapters like this one need, never a list to repeat:
${historyLines(recurring)}

Return exactly four searches. Each is two to four words naming an object plus a material, a colour, or a use, the way a shop labels a product. Concrete and buyable, and the kind of thing this shop could plausibly stock today. No brand names. No people's names. Nothing over the money per thing.

For each search, also write one short sentence of at most ten words saying why it suits this person, in the voice of someone who listened carefully. Plain sentences ending with a period. Never use em dashes. Never mention AI.`;

const buildGapPrompt = (data, recurring, thin) => `You name product concepts for a small independent shop. The shop sells the things that go into a chapter: eight objects chosen by hand for one person.

Today the shop came up short${thin.length ? ` on these searches: ${thin.join(", ")}` : " and could not fill the chapter"}.

The chapter:
${aboutPerson(data)}

Things earlier chapters asked for and the shop does not carry:
${historyLines(recurring)}

Rules:
- Name at most ${GAP_LIMIT} objects, not categories and not bundles. The kind of thing a person keeps for years.
- The concept is four to seven words, written the way a shop labels a product. No brand names, no people's names, no prices.
- Detail is one sentence, at most twenty words, saying plainly what it is.
- Reason is one sentence, at most twenty words, saying why it closes the gap in this chapter.
- Category is one word, such as Kitchen, Textile, Light, Garden, Desk.
- Give up to four search phrases a buyer would type to source it. Three words or fewer each.
- Never repeat a concept from the list above word for word.
- Never use em dashes. Never mention AI. Never claim the shop has this today.`;

const total = (data) =>
  [data.alwaysWears, data.rewatches, data.neverBuys, data.anchorIdea]
    .filter(Boolean)
    .join(" ")
    .trim().length;

/** The same concept asked for by several chapters counts once, and higher. */
const recurringFrom = (rows) => {
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
  return [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 6);
};

/** Concepts only: never a product, never one of the eight. */
async function nameGaps(service, data, recurring, thin) {
  const plan = await service.integrations.Core.InvokeLLM({
    prompt: buildGapPrompt(data, recurring, thin),
    response_json_schema: GAPS,
  });

  return (Array.isArray(plan?.gaps) ? plan.gaps : [])
    .map((row) => ({
      concept: String(row?.concept || "").trim().slice(0, 90),
      detail: String(row?.detail || "").trim().slice(0, 240),
      category: String(row?.category || "").trim().slice(0, 40),
      reason: String(row?.reason || "").trim().slice(0, 240),
      phrases: (Array.isArray(row?.phrases) ? row.phrases : [])
        .map((phrase) => String(phrase || "").trim().slice(0, 60))
        .filter(Boolean)
        .slice(0, 4),
    }))
    .filter((row) => row.concept)
    .slice(0, GAP_LIMIT);
}

/**
 * Eight things from the store, chosen from what the starter has answered so
 * far, plus the concepts the shop could not answer. Suggestions only: nothing
 * is saved until the chapter is started.
 */
export const suggestGifts = createServerFn({ method: "POST" })
  .validator(answers)
  .handler(async ({ data, context }) => {
    if (!shopifyReady()) return { connected: false, items: [], gaps: [], recurring: [] };
    if (total(data) < 8) return { connected: true, items: [], gaps: [], recurring: [] };

    const service = context.getBase44().asServiceRole;

    // What earlier chapters needed and the shop did not have. Shared across
    // chapters: it shapes the searches below and never fills a slot itself.
    let recurring = [];
    try {
      const past = await service.entities.InventoryIdea.list({
        sort: "-created_date",
        limit: 120,
      });
      recurring = recurringFrom(past.items ?? past);
    } catch {
      recurring = [];
    }

    let searches = [];
    try {
      const plan = await service.integrations.Core.InvokeLLM({
        prompt: buildPrompt(data, recurring),
        response_json_schema: SEARCHES,
      });
      searches = Array.isArray(plan?.searches) ? plan.searches : [];
    } catch {
      searches = [];
    }

    const clean = searches
      .map((row) => ({
        query: String(row?.query || "").trim().slice(0, 60),
        why: String(row?.why || "").trim().slice(0, 200),
      }))
      .filter((row) => row.query)
      .slice(0, 4);

    if (!clean.length) return { connected: true, items: [], gaps: [], recurring };

    const found = await Promise.all(
      clean.map(async (search) => ({
        query: search.query,
        why: search.why,
        products: await searchProducts(search.query, 3),
      })),
    );

    // Round robin, so all four searches show up rather than the first one
    // filling the panel. Spares stay in line when a price is over the budget.
    const depth = Math.max(0, ...found.map((group) => group.products.length));
    const candidates = [];
    for (let index = 0; index < depth; index += 1) {
      found.forEach((group) => {
        if (group.products[index]) candidates.push({ ...group.products[index], why: group.why });
      });
    }

    const cap = data.cap ?? 0;
    const seen = new Set();
    let items = [];

    for (const product of candidates) {
      if (items.length >= EIGHT) break;
      if (seen.has(product.id)) continue;
      if (cap > 0 && product.price > cap) continue;
      seen.add(product.id);
      items.push(product);
    }

    // A shop that carries nothing matching the searches still has a shelf. Show
    // what it sells rather than an empty panel.
    if (!items.length) {
      const shelf = await browseProducts(EIGHT);
      items = shelf
        .filter((product) => !cap || product.price <= cap)
        .map((product) => ({ ...product, why: "" }));
    }

    // Where the shop came up short, name the thing it should carry. Bounded to
    // two concepts, and kept apart from the eight.
    const thin = found.filter((group) => !group.products.length).map((group) => group.query);
    let gaps = [];
    if (items.length < EIGHT || thin.length) {
      try {
        gaps = await nameGaps(service, data, recurring, thin);
      } catch {
        gaps = [];
      }
    }

    return { connected: true, items, gaps, recurring };
  });