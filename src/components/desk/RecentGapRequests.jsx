import { Link } from "@tanstack/react-router";

const shortDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        timeZone: "UTC",
        month: "short",
        day: "numeric",
      })
    : "Not dated";

/** The recent chapters that produced the gaps, so a category can be read against its ask. */
export default function RecentGapRequests({ rows, windowDays }) {
  return (
    <section aria-labelledby="recent-gaps-heading" className="mt-12 border-t border-ink pt-6">
      <h2 id="recent-gaps-heading" className="text-[26px]">
        What recent chapters asked for
      </h2>
      <p className="mt-2 max-w-[64ch] text-[17px] leading-[1.4] text-ink/70">
        Every gap kept in the last {windowDays} days, against the chapter that needed it. Open one to
        read the answers behind the ask.
      </p>

      {!rows.length ? (
        <p className="mt-4 text-[17px] leading-[1.4] text-ink/50">
          No gaps kept in this window. Older ones still count in the table above.
        </p>
      ) : (
        <ul className="mt-4 border-y border-ink/20">
          {rows.map((row, index) => (
            <li key={row.chapter_id} className={`py-3 ${index ? "border-t border-ink/15" : ""}`}>
              <Link
                to="/desk/$chapterId"
                params={{ chapterId: row.chapter_id }}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
              >
                <span className="text-[19px] leading-tight">
                  {row.person_name}
                  <span className="ml-2 text-ink/50">{row.chapter_type}</span>
                </span>
                <span className="gc-spec text-ink/45">{shortDate(row.at)}</span>
              </Link>
              <p className="mt-1 text-[17px] leading-[1.35] text-ink/70">
                {row.concepts
                  .map((concept) => `${concept.concept} (${concept.category})`)
                  .join(" / ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}