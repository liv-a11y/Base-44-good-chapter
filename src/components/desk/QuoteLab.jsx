import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { checkQuote, startQuote } from "@/lib/quote-fns";

// The default allowance is 50 requests a day, so the desk checks a quote a
// few times and then waits to be asked.
const AUTO_CHECKS = 8;
const CHECK_EVERY_MS = 10000;

const DONE = ["awaiting_confirmation", "completed", "failed"];

const STATE_LABEL = {
  retrieving_offer: "Asking the store",
  awaiting_confirmation: "Quote ready",
  placing_order: "Placing order",
  completed: "Completed",
  failed: "No quote",
  unknown: "Waiting",
};

const money = (value) => (value == null ? "Not given" : `$${Number(value).toFixed(2)}`);

const EMPTY_BUYER = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  city: "",
  province: "",
  postalCode: "",
};

const FIELDS = [
  ["firstName", "First name", "given-name"],
  ["lastName", "Last name", "family-name"],
  ["email", "Email", "email"],
  ["phone", "Phone", "tel"],
  ["address1", "Street address", "address-line1"],
  ["city", "City", "address-level2"],
  ["province", "State", "address-level1"],
  ["postalCode", "ZIP", "postal-code"],
];

/** Paste any product link, get the real landed cost. Quote only: nothing is ordered. */
export default function QuoteLab({ status }) {
  const start = useServerFn(startQuote);
  const check = useServerFn(checkQuote);

  const [productUrl, setProductUrl] = useState("");
  const [buyer, setBuyer] = useState(EMPTY_BUYER);
  const [quote, setQuote] = useState(null);
  const [checks, setChecks] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const settled = quote ? DONE.includes(quote.state) : false;
  const waiting = Boolean(quote?.id) && !settled;

  const refresh = async (id) => {
    try {
      const result = await check({ data: { id } });
      if (result.quote) setQuote(result.quote);
    } catch (problem) {
      setError(problem?.message || "The quote did not answer. Check again in a moment.");
    } finally {
      setChecks((count) => count + 1);
    }
  };

  useEffect(() => {
    if (!waiting || checks >= AUTO_CHECKS) return undefined;
    const timer = setTimeout(() => refresh(quote.id), CHECK_EVERY_MS);
    return () => clearTimeout(timer);
    // refresh is stable enough for a timer keyed on the quote and the count
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waiting, checks, quote?.id]);

  const run = async (event) => {
    event.preventDefault();
    setError("");
    setQuote(null);
    setChecks(0);
    setBusy(true);
    try {
      const result = await start({ data: { productUrl: productUrl.trim(), buyer } });
      if (!result.connected) {
        setError("Rye is not connected. Save the API key first.");
        return;
      }
      setQuote(result.quote);
    } catch (problem) {
      setError(problem?.message || "That link did not go through. Check it and try once more.");
    } finally {
      setBusy(false);
    }
  };

  if (!status.connected) {
    return (
      <div className="mt-6 border border-ink bg-paper p-5">
        <h3 className="gc-label text-ink/55">Not connected yet</h3>
        <p className="mt-2 max-w-[62ch] text-[17px] leading-[1.5] text-ink/80">
          Save a secret named RYE_API_KEY in the app settings, using the key from the Rye staging
          console. The desk talks to the sandbox until a secret named RYE_API_BASE says otherwise.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <form onSubmit={run} className="border border-ink bg-paper p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="gc-label text-ink/55">Product link</h3>
          <span className="gc-spec text-ink/40">{status.sandbox ? "Sandbox" : "Live"}</span>
        </div>
        <input
          className="gc-input mt-2"
          type="url"
          required
          value={productUrl}
          onChange={(event) => setProductUrl(event.target.value)}
          placeholder="https://store.com/products/the-thing"
          maxLength={600}
          aria-label="Product link"
        />

        <h3 className="gc-label mt-6 text-ink/55">Deliver to</h3>
        <p className="mt-1 text-[15px] leading-[1.4] text-ink/55">
          US addresses only. Shipping and tax are priced for this address, and it is sent to Rye.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {FIELDS.map(([name, label, autoComplete]) => (
            <label key={name} className={name === "address1" ? "sm:col-span-2" : ""}>
              <span className="gc-spec text-ink/50">{label}</span>
              <input
                className="gc-input mt-1"
                required
                type={name === "email" ? "email" : "text"}
                autoComplete={autoComplete}
                value={buyer[name]}
                onChange={(event) => setBuyer((current) => ({ ...current, [name]: event.target.value }))}
                maxLength={120}
              />
            </label>
          ))}
        </div>

        <button type="submit" className="gc-btn mt-5" disabled={busy || waiting}>
          <span className="gc-btn-label">{busy ? "Sending" : waiting ? "Waiting on the store" : "Get the quote"}</span>
        </button>
        {error ? <p className="mt-3 text-[17px] text-clay">{error}</p> : null}
      </form>

      <div className="border border-ink bg-paper p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="gc-label text-ink/55">Landed cost</h3>
          {quote ? <span className="gc-spec text-ink/40">{STATE_LABEL[quote.state] || quote.state}</span> : null}
        </div>

        {!quote ? (
          <p className="mt-2 text-[15px] leading-[1.4] text-ink/55">
            Nothing asked yet. A quote can take a few seconds or several minutes, depending on the store.
          </p>
        ) : null}

        {quote && quote.state === "failed" ? (
          <p className="mt-2 text-[17px] leading-[1.4] text-clay">
            {quote.failure || "The store could not be priced. Rye gave no reason."}
          </p>
        ) : null}

        {quote && quote.total != null ? (
          <dl className="mt-3">
            {[
              ["Item", quote.subtotal],
              ["Shipping", quote.shipping],
              ["Tax", quote.tax],
            ].map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between border-t border-ink/20 py-2.5">
                <dt className="text-[16px] text-ink/70">{label}</dt>
                <dd className="gc-spec">{money(value)}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between border-t-2 border-ink py-3">
              <dt className="font-heading text-[20px]">Total</dt>
              <dd className="font-heading text-[20px]">{money(quote.total)}</dd>
            </div>
          </dl>
        ) : null}

        {waiting ? (
          <div className="mt-3">
            <p className="text-[15px] leading-[1.4] text-ink/55">
              {checks < AUTO_CHECKS
                ? "Checking every ten seconds."
                : "Still waiting. The desk stopped checking to save the daily allowance."}
            </p>
            {checks >= AUTO_CHECKS ? (
              <button type="button" onClick={() => refresh(quote.id)} className="gc-label gc-link mt-2 pb-0.5">
                Check again
              </button>
            ) : null}
          </div>
        ) : null}

        <p className="mt-4 border-t border-ink/20 pt-3 text-[14px] leading-[1.4] text-ink/50">
          Quote only. This page cannot place an order or charge a card.
        </p>
      </div>
    </div>
  );
}
