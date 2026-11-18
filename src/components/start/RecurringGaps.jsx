/**
 * Gaps kept from earlier chapters. Shared learning: it tells the shop what to
 * look for, and it never becomes one of this chapter's eight.
 */
export default function RecurringGaps({ rows }) {
  if (!rows.length) return null;

  return (
    <section className="mt-6 border-t border-ink/15 pt-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="gc-label text-ink/50">Asked for before</span>
        <span className="gc-spec text-ink/35">Across chapters</span>
      </div>

      <p className="mt-2 text-[13px] leading-[1.4] text-ink/50">
        Kept from chapters that came before. They shape what the shop looks for next.
      </p>

      <ul className="mt-3 border-y border-ink/15">
        {rows.slice(0, 5).map((row, index) => (
          <li
            key={row.concept}
            className={`flex items-baseline justify-between gap-3 py-2 ${
              index ? "border-t border-ink/10" : ""
            }`}
          >
            <span className="text-[15px] leading-[1.25] text-ink/80">{row.concept}</span>
            <span className="gc-spec shrink-0 text-[11px] text-ink/40">
              {row.category || "Unsorted"} / {row.count}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}