import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireUser } from "@/lib/auth-middleware";
import { browseProducts, searchProducts, shopifyReady } from "@/lib/shopify.server";

/** Only the curator searches the shop, and only the curator desk calls this. */
const curatorOnly = (context) => {
  if (context.user?.role !== "admin") {
    throw Object.assign(new Error("The shop is for the curator"), {
      status: 403,
      code: "FORBIDDEN",
    });
  }
};

/**
 * Products from the store, for the curator to put straight into a chapter.
 * An empty search shows what the shop already sells.
 */
export const searchShop = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(z.object({ query: z.string().trim().max(80).optional() }))
  .handler(async ({ data, context }) => {
    curatorOnly(context);
    if (!shopifyReady()) return { connected: false, items: [] };

    const query = (data.query || "").trim();
    const items = query ? await searchProducts(query, 12) : await browseProducts(12);
    return { connected: true, items };
  });