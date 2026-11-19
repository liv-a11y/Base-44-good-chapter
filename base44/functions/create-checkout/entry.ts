// Base44 Payments checkout — base44/functions/create-checkout/entry.ts
//
// Provided by the platform. Edit only the two regions marked `// ===== APP-SPECIFIC =====`: resolve,
// SERVER-SIDE, what the buyer is purchasing and its price (NEVER take an amount from the browser), and
// save the pending purchase record for `checkout.checkout_id` once the checkout exists.
// PUBLIC by design: storefront buyers often have no account, so never 401 here.

import { createClientFromRequest } from "npm:@base44/sdk@0.8.54";

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }
  const base44 = createClientFromRequest(req);
  const body = await req.json().catch(() => ({}));

  // ===== APP-SPECIFIC =====
  // Amounts are in minor units (2500 = $25.00). Validate the RAW quantity is a positive integer;
  // for a fixed-entitlement product hard-code 1. Add `recurring` to an item to sell a subscription.
  // `success_path` must be a real, publicly reachable route: `/ThankYou`, not `/thank-you`.
  const productId = String(body.productId ?? "");
  const items = [{ name: "Purchase", amount: 0, quantity: 1 }]; // TODO: from your trusted product source
  const success_path = "/ThankYou";
  // ===== END APP-SPECIFIC =====

  try {
    const checkout = await base44.asServiceRole.payments.createCheckout({ items, success_path });

    // ===== APP-SPECIFIC =====
    // Save a purchase record for `checkout.checkout_id` BEFORE returning: what it unlocks, for whom,
    // `status: "pending"` (RLS: only admins write it). The Thank You page and the payment workflow
    // find the purchase by this id, so a checkout with no record can never be granted.
    // ===== END APP-SPECIFIC =====

    return Response.json({ redirectUrl: checkout.redirect_url });
  } catch (err) {
    console.error("create-checkout: createCheckout failed", productId, err);
    return Response.json({ error: "Could not start checkout" }, { status: 502 });
  }
});
