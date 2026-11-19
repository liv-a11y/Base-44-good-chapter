import { useState } from "react";

const money = (value) => `$${Number(value || 0).toLocaleString("en-US")}`;

/** One guest's share of a pooled item. The server caps it at what is still missing. */
export default function PoolForm({ remaining, ready, saving, error, onContribute }) {
  const [amount, setAmount] = useState("");
  const [local, setLocal] = useState("");

  const value = Number(amount);
  const valid = Number.isFinite(value) && value >= 1 && value <= remaining;

  const submit = () => {
    if (!valid) {
      setLocal("Put in any amount from $1 up to what is still missing.");
      return;
    }
    setLocal("");
    onContribute(value);
  };

  return (
    <div className="mt-4 border-t border-ink/25 pt-4">
      <label className="gc-label block text-ink/55" htmlFor="pool-amount">
        Put something in
      </label>

      <input
        id="pool-amount"
        className="gc-input mt-2"
        value={amount}
        inputMode="decimal"
        placeholder="25"
        maxLength={8}
        onChange={(event) => setAmount(event.target.value.replace(/[^\d.]/g, ""))}
      />

      <button
        type="button"
        className="gc-btn mt-3 w-full justify-between"
        disabled={saving || !ready}
        onClick={submit}
      >
        <span className="gc-btn-label">
          {saving ? "Opening checkout" : `Put in ${valid ? money(value) : ""}`.trim()}
        </span>
        <span className="gc-btn-arrow" aria-hidden="true">
          →
        </span>
      </button>

      <p className="gc-label mt-2 text-ink/40">
        {ready
          ? `Up to ${money(remaining)} left on this one.`
          : "Card checkout is being connected. Nothing is charged yet."}
      </p>

      {local || error ? (
        <p className="mt-2 text-[16px] leading-snug text-clay">{local || error}</p>
      ) : null}
    </div>
  );
}