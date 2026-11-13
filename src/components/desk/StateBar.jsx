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
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const next = NEXT_STEP_LABELS[chapter.state];
  const needsEight = next === "With the person" && itemCount !== EIGHT;

  const move = async () => {
    setBusy(true);
    setError("");
    setNote(null);
    try {
      const result = await advance({
        data: { chapter_id: chapter.id, origin: window.location.origin },
      });
      if (result.email) {
        setNote(
          result.email.sent
            ? { link: null, message: `Sent to ${chapter.person_email}.` }
            : {
                link: result.link,
                message: "The letter did not send. Send the private link below by hand.",
              },
        );
      }
      await router.invalidate();
    } catch (cause) {
      setError(cause?.message || "The chapter did not move.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(note.link);
    setCopied(true);
  };

  return (
    <div className="flex flex-col items-start gap-3 sm:items-end">
      {next ? (
        <>
          <button
            type="button"
            onClick={move}
            disabled={busy || needsEight}
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
        </>
      ) : (
        <p className="gc-label text-ink/45">Nowhere left to go</p>
      )}

      {note ? (
        <div className="max-w-[340px] border-t border-ink/30 pt-2">
          <p className="text-[17px] leading-[1.35] text-ink/80">{note.message}</p>
          {note.link ? (
            <div className="mt-1">
              <p className="break-all font-mono text-[13px] text-ink/80">{note.link}</p>
              <button type="button" onClick={copy} className="gc-label gc-link mt-1 pb-0.5">
                {copied ? "Copied" : "Copy link"}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {error ? <p className="max-w-[340px] text-[17px] text-clay">{error}</p> : null}
    </div>
  );
}