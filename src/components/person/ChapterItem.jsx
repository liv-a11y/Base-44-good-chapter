import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Image } from "@/components/ui/image";
import DrawingPlaceholder from "@/components/site/DrawingPlaceholder";
import { answerItem } from "@/lib/server-fns";

const money = (value) => (value == null ? "" : `$${value}`);

const ANSWER_WORDS = {
  approved: "Approved. It stays.",
  declined: "Declined. It comes off the list.",
};

/** One of the eight, on the person's own link, with their approve or decline. */
export default function ChapterItem({ token, item, index, open, awaiting }) {
  const answer = useServerFn(answerItem);
  const saved = item.status === "approved" || item.status === "declined" ? item.status : "";
  const [status, setStatus] = useState(saved);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  const decide = async (value) => {
    setBusy(value);
    setError("");
    try {
      const result = await answer({ data: { token, itemId: item.id, answer: value } });
      if (!result?.ok) {
        setError("That did not save. Open your link again and try once more.");
        return;
      }
      setStatus(result.status);
    } catch {
      setError("That did not save. Open your link again and try once more.");
    } finally {
      setBusy("");
    }
  };

  const given = item.status === "given";

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
          <span className="gc-label text-ink/45">{item.source}</span>
          <span className="gc-spec text-ink">{money(item.price)}</span>
        </div>

        {item.source_url && (status || item.status) === "approved" ? (
          <a
            href={item.source_url}
            target="_blank"
            rel="noreferrer"
            className="gc-label gc-link mt-2 self-start pb-0.5 text-[13px]"
          >
            Find it at {item.source || "the shop"}
          </a>
        ) : null}

        <div className="mt-auto pt-4">
          {given ? (
            <p className="gc-label text-ink/50">Already given.</p>
          ) : open ? (
            <>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="gc-option flex-1 justify-center px-3 py-2 text-[17px]"
                  aria-pressed={status === "approved"}
                  disabled={Boolean(busy)}
                  onClick={() => decide("approved")}
                >
                  {busy === "approved" ? "Saving" : "Approve"}
                </button>
                <button
                  type="button"
                  className="gc-option flex-1 justify-center px-3 py-2 text-[17px]"
                  aria-pressed={status === "declined"}
                  disabled={Boolean(busy)}
                  onClick={() => decide("declined")}
                >
                  {busy === "declined" ? "Saving" : "Decline"}
                </button>
              </div>
              {error ? (
                <p className="mt-2 text-[15px] leading-snug text-clay">{error}</p>
              ) : status ? (
                <p className="gc-label mt-2 text-ink/50">{ANSWER_WORDS[status]}</p>
              ) : null}
            </>
          ) : status ? (
            <p className="gc-label text-ink/50">{ANSWER_WORDS[status]}</p>
          ) : (
            <p className="gc-label text-ink/50">
              {awaiting ? "Say yes and you can answer this." : "Answers are closed."}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}