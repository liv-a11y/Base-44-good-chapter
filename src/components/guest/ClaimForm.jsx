import { useState } from "react";

/** The one decision a guest makes: which name sits next to what they give. */
export default function ClaimForm({ saving, error, onClaim, onCancel }) {
  const [name, setName] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  return (
    <div className="mt-4 border-t border-ink/25 pt-4">
      <label className="gc-label block text-ink/55" htmlFor="claim-name">
        Who it is from
      </label>

      {anonymous ? (
        <p className="mt-2 border border-ink bg-plaster px-3 py-2 text-[19px] text-ink/70">
          Someone who cares
        </p>
      ) : (
        <input
          id="claim-name"
          className="gc-input mt-2"
          value={name}
          maxLength={60}
          placeholder="The Jones Family"
          onChange={(event) => setName(event.target.value)}
        />
      )}

      <button
        type="button"
        className="gc-label gc-link mt-3 pb-0.5"
        onClick={() => setAnonymous((value) => !value)}
      >
        {anonymous ? "Use a family name instead" : "Give it without my name"}
      </button>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          className="gc-btn flex-1 justify-between"
          disabled={saving}
          onClick={() => onClaim(anonymous ? "" : name.trim())}
        >
          <span className="gc-btn-label">{saving ? "Saving" : "Take it"}</span>
          <span className="gc-btn-arrow" aria-hidden="true">
            →
          </span>
        </button>
        <button type="button" className="gc-label px-2 py-2 text-ink/55" onClick={onCancel}>
          Never mind
        </button>
      </div>

      {error ? <p className="mt-2 text-[16px] leading-snug text-clay">{error}</p> : null}
    </div>
  );
}