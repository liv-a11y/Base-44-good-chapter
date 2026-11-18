/**
 * The concepts the shop does not carry for this chapter. They sit beside the
 * suggestions and never join the eight.
 */
export default function GapQueue({ gaps }) {
  if (!gaps.length) return null;

  return (
    <section className="mt-7 border-t border-clay/40 pt-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="gc-label text-clay">Missing from the shop</span>
        <span className="gc-spec text-clay/60">{String(gaps.length).padStart(2, "0")}</span>
      </div>

      <p className="mt-2 text-[13px] leading-[1.4] text-ink/50">
        Concepts only. None of this is in the shop today, and none of it goes into the eight.
      </p>

      <ul className="mt-3 space-y-3">
        {gaps.map((gap) => (
          <li key={gap.concept} className="border border-dashed border-clay/60 bg-plaster/50 p-3">
            <p className="font-heading text-[17px] leading-[1.2]">{gap.concept}</p>
            {gap.detail ? (
              <p className="mt-1 text-[14px] leading-[1.4] text-ink/70">{gap.detail}</p>
            ) : null}
            {gap.reason ? (
              <p className="mt-1.5 text-[13px] leading-[1.4] text-ink/55">{gap.reason}</p>
            ) : null}
            {gap.phrases?.length ? (
              <p className="gc-spec mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-clay/80">
                {gap.phrases.map((phrase) => (
                  <span key={phrase}>{phrase}</span>
                ))}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}