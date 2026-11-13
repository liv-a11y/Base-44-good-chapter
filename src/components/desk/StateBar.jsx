import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { advanceChapter } from "@/lib/curator-fns";
import { NEXT_STEP_LABELS } from "@/lib/chapter-types";

const EIGHT = 8;

export default function StateBar({ chapter, itemCount }) {
  const router = useRouter();
  const advance = useServerFn(advanceChapter);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(null);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");

  const next = NEXT_STEP_LABELS[chapter.state];
  const needsEight = next === "With the person" && itemCount !== EIGHT;
  const accepted = (chapter.person_decision || "pending") === "accepted";
  const waitingOnPerson =
    !accepted && (chapter.state === "with_person_items" || chapter.state === "with_person_guests");

  const move = async () => {
    setBusy(true);
    setError("");
    setNote(null);
    try {
      const result = await advance({
        data: { chapter_id: chapter.id, origin: window.location.origin },
      });

      let message = "";
      const links = [];
      if (result.guests) {
        const { sent, total, unsent } = result.guests;
        message = unsent.length
          ? `Sent to ${sent} of ${total}. Send the rest by hand.`
          : `Sent to ${sent} of ${total}.`;
        links.push(...unsent.map((row) => ({ name: row.name, link: row.link })));
      } else if (result.email) {
        message = result.email.sent
          ? `Sent to ${chapter.person_email}.`
          : "The letter did not send. Send the private link below by hand.";
        if (!result.email.sent && result.link) links.push({ name: null, link: result.link });
      }
      if (message) setNote({ message, links });

      await router.invalidate();
    } catch (cause) {
      setError(cause?.message || "The chapter did not move.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async (link) => {
    await navigator.clipboard.writeText(link);
    setCopied(link);
  };

  return (
    <div className="flex flex-col items-start gap-3 sm:items-end">
      {next ? (
        <>
          <button
            type="button"
            onClick={move}
            disabled={busy || needsEight || waitingOnPerson}
            className="gc-btn"
          >
            <span className="gc-btn-label">{busy ? "Moving" : `Move to ${next}`}</span>
            <span className="gc-btn-arrow" aria-hidden="true">
              →
            </span>
          </button>
          {needsEight ? (
            <p className="gc-label text-ink/50">The person sees eight items, not {itemCount}</p>
          ) : null}
          {waitingOnPerson ? (
            <p className="gc-label max-w-[280px] text-right text-ink/50">
              Nothing goes to the guests until the person has answered
            </p>
          ) : null}
        </>
      ) : (
        <p className="gc-label text-ink/45">Nowhere left to go</p>
      )}

      {note ? (
        <div className="max-w-[340px] border-t border-ink/30 pt-2">
          <p className="text-[17px] leading-[1.35] text-ink/80">{note.message}</p>
          {note.links.map((row) => (
            <div key={row.link} className="mt-2">
              {row.name ? <p className="gc-label text-ink/55">{row.name}</p> : null}
              <p className="break-all font-mono text-[13px] text-ink/80">{row.link}</p>
              <button
                type="button"
                onClick={() => copy(row.link)}
                className="gc-label gc-link mt-1 pb-0.5"
              >
                {copied === row.link ? "Copied" : "Copy link"}
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {error ? <p className="max-w-[340px] text-[17px] text-clay">{error}</p> : null}
    </div>
  );
}