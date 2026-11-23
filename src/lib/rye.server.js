import { secrets } from "base44:runtime";

// Rye (now Jolly) Universal Checkout: a product URL plus a buyer becomes a
// live quote with shipping and tax. This file only asks for quotes. It never
// confirms an intent, so nothing here can place an order or charge a card.
const STAGING = "https://api.commerce.staging.jolly.dev";

const base = () =>
  String(secrets.get("RYE_API_BASE") || "")
    .trim()
    .replace(/\/+$/, "") || STAGING;

/** True once the API key is saved. */
export const ryeReady = () => Boolean(secrets.get("RYE_API_KEY"));

/** True while the desk talks to the sandbox, where no order is real. */
export const ryeSandbox = () => base().includes("staging");

// The docs show both "Basic" and "Bearer" for the same key, so try one and
// fall back to the other on a 401.
async function call(path, init = {}) {
  const key = secrets.get("RYE_API_KEY");
  const send = (scheme) =>
    fetch(`${base()}/api/v1${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${scheme} ${key}`,
      },
    });

  let response = await send("Basic");
  if (response.status === 401) response = await send("Bearer");

  const text = await response.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = null;
  }

  if (!response.ok) {
    const message =
      body?.message || body?.error?.message || body?.error || `Rye answered ${response.status}`;
    throw Object.assign(new Error(String(message).slice(0, 300)), {
      status: response.status === 401 ? 502 : response.status,
      code: "RYE_ERROR",
    });
  }
  return body;
}

const dollars = (money) =>
  money?.amountSubunits == null ? null : Number(money.amountSubunits) / 100;

/** The parts of an intent the desk shows. Buyer details are never sent back. */
function plain(intent) {
  const cost = intent?.offer?.cost;
  const shipping = intent?.offer?.shipping;
  const options = shipping?.availableOptions ?? [];
  const chosen = options.find((option) => option.id === shipping?.selectedOptionId) ?? options[0];
  const failure = intent?.failureReason ?? intent?.failure ?? intent?.error ?? null;

  return {
    id: intent?.id ?? null,
    state: intent?.state ?? intent?.status ?? "unknown",
    subtotal: dollars(cost?.subtotal),
    tax: dollars(cost?.tax),
    shipping: dollars(cost?.shipping) ?? dollars(chosen?.cost),
    total: dollars(cost?.total),
    shippingOptions: options.length,
    failure: failure
      ? String(typeof failure === "string" ? failure : failure.message || JSON.stringify(failure)).slice(0, 400)
      : null,
  };
}

/** Ask Rye to price one product for one buyer. Answers at once with an id to poll. */
export async function startIntent({ productUrl, buyer }) {
  const intent = await call("/checkout-intents", {
    method: "POST",
    body: JSON.stringify({ productUrl, quantity: 1, buyer }),
  });
  return plain(intent);
}

/** Where a quote stands now. */
export async function readIntent(id) {
  return plain(await call(`/checkout-intents/${encodeURIComponent(id)}`));
}
