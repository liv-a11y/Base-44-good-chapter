import StartQuestion from "@/components/start/StartQuestion";

export default function ReviewStep({ gaps, suggestionCount, submitting, error, onNext, onBack }) {
  return (
    <StartQuestion
      label="Before it goes in"
      question="What the shop could not answer."
      hint="Keep what belongs here, or go back and change an answer. These stay ideas: the curator builds the eight by hand, and the person approves every one."
      nextLabel="Send the chapter in"
      submitting={submitting}
      onSubmit={onNext}
      onBack={onBack}
      error={error}
    >
      {gaps.length ? (
        <ul className="border border-ink/25 bg-paper/50">
          {gaps.map((gap, index) => (
            <li
              key={gap.concept}
              className={`px-4 py-4 ${index ? "border-t border-ink/15" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="gc-label text-[11px] text-clay">Not in the shop</span>
                <span className="gc-spec text-[11px] text-ink/35">
                  {gap.category || "Unsorted"}
                </span>
              </div>
              <p className="mt-2 font-heading text-[20px] leading-[1.15]">{gap.concept}</p>
              {gap.detail ? (
                <p className="mt-1.5 text-[16px] leading-[1.4] text-ink/70">{gap.detail}</p>
              ) : null}
              {gap.reason ? (
                <p className="mt-2 text-[15px] leading-[1.4] text-ink/55">{gap.reason}</p>
              ) : null}
              {gap.phrases?.length ? (
                <p className="gc-spec mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-clay/80">
                  {gap.phrases.map((phrase) => (
                    <span key={phrase}>{phrase}</span>
                  ))}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="border border-dashed border-ink/30 px-4 py-6 text-[17px] leading-[1.4] text-ink/60">
          Nothing was missing. Every search found something in the shop.
        </p>
      )}

      <p className="gc-spec mt-5 text-ink/45">
        {String(suggestionCount).padStart(2, "0")} of 08 held for the curator
      </p>
    </StartQuestion>
  );
}