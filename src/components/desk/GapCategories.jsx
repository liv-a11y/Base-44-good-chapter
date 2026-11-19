const shortDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        timeZone: "UTC",
        month: "short",
        day: "numeric",
      })
    : "None yet";

const COLUMNS = ["Category", "Asked for", "Chapters", "Last asked", "The concepts"];

/** One row per category, longest bar first: the shelves the shop keeps missing. */
export default function GapCategories({ categories }) {
  const most = categories[0]?.asks ?? 1;

  if (!categories.length) {
    return (
      <p className="mt-8 max-w-[54ch] border border-dashed border-ink/35 px-5 py-6 text-[19px] leading-[1.38] text-ink/60">
        Nothing kept yet. A category appears here the first time a chapter asks for something the shop
        does not carry.
      </p>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full min-w-[780px] border-collapse text-left">
        <thead>
          <tr className="border-y border-ink">
            {COLUMNS.map((column) => (
              <th key={column} className="gc-label py-3 pr-4 font-normal text-ink/60">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((row) => (
            <tr key={row.category} className="border-b border-ink/25 align-top">
              <td className="py-4 pr-4">
                <span className="font-heading text-[22px] leading-tight">{row.category}</span>
                {row.recent ? (
                  <span className="gc-label ml-2 text-clay">{row.recent} recent</span>
                ) : null}
              </td>
              <td className="py-4 pr-4">
                <div className="flex items-center gap-3">
                  <span
                    className="h-[6px] bg-ink"
                    style={{ width: `${Math.max(6, (row.asks / most) * 120)}px` }}
                  />
                  <span className="gc-spec text-ink/60">{row.asks}</span>
                </div>
              </td>
              <td className="py-4 pr-4">
                <span className="gc-spec text-ink/60">{row.chapters}</span>
              </td>
              <td className="py-4 pr-4">
                <span className="gc-spec text-ink/60">{shortDate(row.latest)}</span>
              </td>
              <td className="py-4 pr-4 text-[17px] leading-[1.35] text-ink/80">
                {row.concepts.map((concept) => concept.concept).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}