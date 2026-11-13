import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import Wordmark from "@/components/site/Wordmark";
import { recordDecision } from "@/lib/decision-fns";

/**
 * The two answers the person can give, on a page of their own. The page never
 * shows the list, the guests or a gift: it only holds the one decision.
 */
export default function DecisionScreen({ chapter, token, answer }) {
  const record = useServerFn(recordDecision);
  const [result, setResult] = useState(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const first = result?.person_first || chapter.person_first;
  const starter = result?.starter_name || chapter.starter_name;
  const settled = result || (chapter.settled ? { decision: chapter.decision, decided_on: chapter.decided_on } : null);

  const decide = async () => {
    setBusy(true);
    setError("");
    try {
      const saved = await record({
        data: { token, answer, reason: answer === "decline" ? reason : "" },
      });
      if (!saved?.ok) {
        setError("This link is no longer good. Ask for a fresh letter.");
        return;
      }
      setResult(saved);
    } catch {
      setError("That did not save. Open the link again and try once more.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-plaster">
      <header className="bg-ink">
        <div className="mx-auto flex w-full max-w-[760px] items-center justify-between gap-6 px-6 py-5">
          <Wordmark tone="reverse" />
          <span className="gc-label text-plaster/70">Your answer</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[760px] px-6 pb-24 pt-14">
        <p className="gc-label text-ink/50">{chapter.chapter_type}</p>

        {settled ? (
          <Settled decision={settled.decision} first={first} starter={starter} on={settled.decided_on} />
        ) : answer === "accept" ? (
          <>
            <h1 className="gc-loud mt-4 text-[clamp(40px,8vw,76px)]">say yes, or send it back.</h1>
            <p className="mt-6 max-w-[46ch] text-[21px] leading-[1.38] text-ink/85">
              {starter} started this chapter for you. Eight things, chosen one at a time, each with
              the reason it was chosen.
            </p>
            <p className="mt-4 max-w-[46ch] text-[21px] leading-[1.38] text-ink/85">
              Saying yes opens it to the people you named. Saying no sends it back before anyone
              sees a thing.
            </p>
            <button
              type="button"
              onClick={decide}
              disabled={busy}
              className="gc-btn mt-8 w-full sm:w-auto"
            >
              <span className="gc-btn-label">{busy ? "Saving" : "Yes, accept it"}</span>
              <span className="gc-btn-arrow" aria-hidden="true">
                →
              </span>
            </button>
            <p className="gc-label mt-4 text-ink/45">
              Changed your mind? The other button in the letter sends it back.
            </p>
          </>
        ) : (
          <>
            <h1 className="gc-loud mt-4 text-[clamp(40px,8vw,76px)]">send it back.</h1>
            <p className="mt-6 max-w-[46ch] text-[21px] leading-[1.38] text-ink/85">
              Nothing goes to the guests. {starter} will see that you sent it back and can change
              the list before asking you again.
            </p>

            <label className="gc-label mt-8 block text-ink/55" htmlFor="decline-reason">
              Why, if you want to say
            </label>
            <textarea
              id="decline-reason"
              className="gc-input mt-2"
              value={reason}
              maxLength={600}
              onChange={(event) => setReason(event.target.value)}
              placeholder={`Optional. It goes to ${starter} only.`}
            />

            <button
              type="button"
              onClick={decide}
              disabled={busy}
              className="gc-btn mt-6 w-full sm:w-auto"
            >
              <span className="gc-btn-label">{busy ? "Saving" : "Send it back"}</span>
              <span className="gc-btn-arrow" aria-hidden="true">
                →
              </span>
            </button>
            <p className="gc-label mt-4 text-ink/45">
              Nothing reaches the guests, and no reason is needed.
            </p>
          </>
        )}

        {error ? <p className="mt-5 max-w-[46ch] text-[18px] leading-snug text-clay">{error}</p> : null}
      </main>
    </div>
  );
}

function Settled({ decision, first, starter, on }) {
  const accepted = decision === "accepted";

  return (
    <>
      <h1 className="gc-loud mt-4 text-[clamp(40px,8vw,76px)]">
        {accepted ? "thank you." : "sent back."}
      </h1>
      <p className="mt-6 max-w-[46ch] text-[21px] leading-[1.38] text-ink/85">
        {accepted
          ? `${first}, your chapter is accepted. ${starter} can now open it to the people you named. Nothing is charged to you.`
          : `Nothing went to the guests. ${starter} has your answer and can change the list before asking you again.`}
      </p>
      {on ? <p className="gc-label mt-6 text-ink/50">Answered {on}</p> : null}
      <p className="gc-label mt-10 text-ink/40">You can close this page.</p>
    </>
  );
}