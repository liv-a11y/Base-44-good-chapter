import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireUser } from "@/lib/auth-middleware";
import { readIntent, ryeReady, ryeSandbox, startIntent } from "@/lib/rye.server";

/** Quotes spend a small daily allowance, so only the curator asks for them. */
const curatorOnly = (context) => {
  if (context.user?.role !== "admin") {
    throw Object.assign(new Error("Quotes are for the curator"), {
      status: 403,
      code: "FORBIDDEN",
    });
  }
};

const line = (max) => z.string().trim().min(1).max(max);

const buyerShape = z.object({
  firstName: line(60),
  lastName: line(60),
  email: z.string().trim().email().max(120),
  phone: line(30),
  address1: line(120),
  city: line(80),
  province: line(40),
  postalCode: line(12),
});

/** Whether the key is saved, and whether the desk is on the sandbox. */
export const quoteStatus = createServerFn({ method: "GET" })
  .middleware([requireUser])
  .handler(({ context }) => {
    curatorOnly(context);
    return { connected: ryeReady(), sandbox: ryeSandbox() };
  });

/** Price one product URL, delivered to one US address. Quote only: nothing is ordered. */
export const startQuote = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    z.object({
      productUrl: z
        .string()
        .trim()
        .url()
        .max(600)
        .refine((value) => value.startsWith("https://"), "Use an https product link"),
      buyer: buyerShape,
    }),
  )
  .handler(async ({ data, context }) => {
    curatorOnly(context);
    if (!ryeReady()) return { connected: false };
    const quote = await startIntent({
      productUrl: data.productUrl,
      buyer: { ...data.buyer, country: "US" },
    });
    return { connected: true, sandbox: ryeSandbox(), quote };
  });

/** Where a quote stands. */
export const checkQuote = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(z.object({ id: z.string().trim().min(1).max(120).regex(/^[\w-]+$/) }))
  .handler(async ({ data, context }) => {
    curatorOnly(context);
    if (!ryeReady()) return { connected: false };
    return { connected: true, quote: await readIntent(data.id) };
  });
