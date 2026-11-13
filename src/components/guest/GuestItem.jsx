import { useState } from "react";
import { Image } from "@/components/ui/image";
import DrawingPlaceholder from "@/components/site/DrawingPlaceholder";
import ClaimForm from "@/components/guest/ClaimForm";

const money = (value) => (value == null ? "" : `$${value}`);

/** One of the eight that the person approved, with a guest's way to take it. */
export default function GuestItem({ item, index, open, onClaim }) {
  const [claim, setClaim] = useState(item.claim);
  const [asking, setAsking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const take = async (displayName) => {
    setSaving(true);
    setError("");
    try {
      const result = await onClaim(item.id, displayName);
      if (!result?.ok) {
        setError("That one has just been taken. Open a fresh one.");
        return;
      }
      setClaim({ display_name: displayName, mine: true });
      setAsking(false);
    } catch {
      setError("That did not save. Open your link again and try once more.");
    } finally {
      setSaving(false);
    }
  };

  const mine = claim?.mine;
  const takenBy = claim && !claim.mine ? claim.display_name || "Someone who cares" : "";

  return (
    <article className="flex flex-col border border-ink bg-paper">
      {item.photo_url ? (
        <Image
          src={item.photo_url}
          alt={item.name}
          className="h-44 w-full border-b border-ink object-cover"
        />
      ) : (
        <DrawingPlaceholder label="Drawing to come" className="h-44 w-full border-x-0 border-t-0" />
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="gc-spec text-ink/50">{String(index + 1).padStart(2, "0")}</p>
        <h2 className="mt-2 text-[26px] leading-[1.05]">{item.name}</h2>
        <p className="mt-2 text-[19px] leading-[1.35] text-ink/85">{item.why}</p>

        <div className="mt-3 flex items-baseline justify-between gap-3">
          <span className="gc-label truncate text-ink/45">{item.source}</span>
          <span className="gc-spec shrink-0 text-ink">{money(item.price)}</span>
        </div>

        <div className="mt-auto pt-4">
          {claim ? (
            <div className="border-t border-ink/25 pt-4">
              <p className={`gc-label ${mine ? "text-cobalt" : "text-ink/45"}`}>
                {mine ? "Yours to give" : "Taken"}
              </p>
              <p className="mt-1 text-[19px] leading-[1.3] text-ink/80">
                {mine ? `From ${claim.display_name || "Someone who cares"}` : takenBy}
              </p>
            </div>
          ) : !open ? (
            <p className="gc-label text-ink/40">Not open</p>
          ) : asking ? (
            <ClaimForm
              saving={saving}
              error={error}
              onClaim={take}
              onCancel={() => setAsking(false)}
            />
          ) : (
            <button
              type="button"
              className="gc-btn w-full justify-between"
              onClick={() => setAsking(true)}
            >
              <span className="gc-btn-label">Take this one</span>
              <span className="gc-btn-arrow" aria-hidden="true">
                →
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}