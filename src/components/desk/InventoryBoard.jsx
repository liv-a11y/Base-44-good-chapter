/** What the shop keeps missing, across every chapter. Repeats come first. */
export default function InventoryBoard({ ideas }) {
  const rows = ideas?.rows ?? [];

  return (
    <section aria-labelledby="inventory-heading" className="mt-12 border-t border-ink pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="inventory-heading" className="text-[26px]">
          What the shop keeps missing
        </h2>
        <span className="gc-label text-ink/50">{ideas?.total ?? 0} kept</span>
      </div>
      <p className="mt-2 max-w-[64ch] text-[17px] leading-[1.4] text-ink/70">
        Product concepts saved from chapters where the store had nothing to offer. Every new idea is
        read alongside this list, so the desk stops naming the same gap twice.
      </p>

      {!rows.length ? (
        <p className="mt-4 text-[17px] leading-[1.4] text-ink/50">
          Nothing kept yet. When a shop search comes up empty, name the closest thing and keep it
          with the chapter.
        </p>
      ) : (
        <ul className="mt-4 border-y border-ink/20">
          {rows.map((row, index) => (
            <li
              key={row.concept}
              className={`flex items-baseline justify-between gap-4 py-2.5 ${
                index ? "border-t border-ink/15" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="text-[19px] leading-tight">{row.concept}</p>
                {row.category ? (
                  <span className="gc-label text-ink/45">{row.category}</span>
                ) : null}
              </div>
              <span className="gc-spec shrink-0 text-ink/45">
                {row.count} {row.count === 1 ? "chapter" : "chapters"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}