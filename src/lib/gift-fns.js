import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { searchProducts, shopifyReady } from "@/lib/shopify.server";

const EIGHT = 8;

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

const buildPrompt = (data) => `You are writing search box queries for a small shop, for one person's chapter.

About the person:
- The chapter: ${data.chapterType || "not said"}
- What they always wear: ${data.alwaysWears || "not said"}
- What they rewatch: ${data.rewatches || "not said"}
- What they would never buy themselves: ${data.neverBuys || "not said"}
- The one gift the starter would give first: ${data.anchorIdea || "not said"}
- Money per thing: ${data.cap ? `$${data.cap}` : "no set amount"}

Return exactly four searches. Each is two to four words naming an object plus a material, a colour, or a use, the way a shop labels a product. Concrete and buyable. No brand names. No people's names. Nothing over the money per thing.

For each search, also write one short sentence of at most ten words saying why it suits this person, in the voice of someone who listened carefully. Plain sentences ending with a period. Never use em dashes. Never mention AI.`;

const total = (data) =>
  [data.alwaysWears, data.rewatches, data.neverBuys, data.anchorIdea]
    .filter(Boolean)
    .join(" ")
    .trim().length;

/**
 * Eight things from the store, chosen from what the starter has answered so
 * far. Suggestions only: nothing is saved until the chapter is started.
 */
export const suggestGifts = createServerFn({ method: "POST" })
  .validator(answers)
  .handler(async ({ data, context }) => {
    if (!shopifyReady()) return { connected: false, items: [] };
    if (total(data) < 8) return { connected: true, items: [] };

    const service = context.getBase44().asServiceRole;

    let searches = [];
    try {
      const plan = await service.integrations.Core.InvokeLLM({
        prompt: buildPrompt(data),
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

    if (!clean.length) return { connected: true, items: [] };

    const found = await Promise.all(
      clean.map(async (search) => ({
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
    const items = [];

    for (const product of candidates) {
      if (items.length >= EIGHT) break;
      if (seen.has(product.id)) continue;
      if (cap > 0 && product.price > cap) continue;
      seen.add(product.id);
      items.push(product);
    }

    return { connected: true, items };
  });