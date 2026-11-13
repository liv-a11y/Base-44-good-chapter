import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { reopenChapter } from "@/lib/curator-fns";
import { DECISION_LABELS } from "@/lib/chapter-types";

const on = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        timeZone: "UTC",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

/** The person's first say, on the desk: waiting, accepted, or sent back. */
export default function DecisionPanel({ chapter }) {
  const router = useRouter();
  const reopen = useServerFn(reopenChapter);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const decision = chapter.person_decision || "pending";

  const again = async () => {
    setBusy(true);
    setError("");
    try {
      await reopen({ data: { chapter_id: chapter.id } });
      await router.invalidate();
    } catch (cause) {
      setError(cause?.message || "That did not move.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section aria-labelledby="decision-heading" className="mt-8 border-t border-ink/25 pt-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="decision-heading" className="text-[26px]">
          Their first say
        </h2>
        <span className="gc-label text-ink/50">{DECISION_LABELS[decision]}</span>
      </div>

      {decision === "pending" ? (
        <p className="mt-2 max-w-[46ch] text-[19px] leading-[1.35] text-ink/85">
          {chapter.accept_token
            ? `${chapter.person_name} has the letter with two buttons. Nothing reaches the guests until they answer.`
            : "The letter has not gone out yet. Sending the chapter to the person asks first."}
        </p>
      ) : null}

      {decision === "accepted" ? (
        <p className="mt-2 max-w-[46ch] text-[19px] leading-[1.35] text-ink/85">
          Accepted {on(chapter.person_decided_at)}. The list can go to the guests.
        </p>
      ) : null}

      {decision === "declined" ? (
        <>
          <p className="mt-2 max-w-[46ch] text-[19px] leading-[1.35] text-ink/85">
            Sent back {on(chapter.person_decided_at)}. Nothing went to the guests.
          </p>
          {chapter.person_decline_reason ? (
            <p className="mt-3 max-w-[44ch] border-l border-ink pl-3 text-[19px] leading-[1.35] text-ink/85">
              {chapter.person_decline_reason}
            </p>
          ) : null}
          <button type="button" onClick={again} disabled={busy} className="gc-btn mt-4">
            <span className="gc-btn-label">
              {busy ? "Opening" : "Change the list and ask again"}
            </span>
            <span className="gc-btn-arrow" aria-hidden="true">
              →
            </span>
          </button>
          <p className="gc-label mt-2 text-ink/50">This puts the chapter back in curating.</p>
        </>
      ) : null}

      {error ? <p className="mt-2 max-w-[44ch] text-[17px] text-clay">{error}</p> : null}
    </section>
  );
}