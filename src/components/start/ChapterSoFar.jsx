const PATH_LABEL = {
  anchor_gift: "An anchor gift",
  employer_pool: "A pool from work",
  realtor_budget: "A realtor's budget",
};

export default function ChapterSoFar({ form }) {
  const guests = form.guests.filter((row) => row.name.trim() || row.email.trim()).length;

  const rows = [
    ["The person", form.personName.trim()],
    ["The chapter", form.chapterType],
    ["Starts with", PATH_LABEL[form.path] ?? ""],
    ["Guests", guests ? `${guests} named` : ""],
  ];

  return (
    <div className="border border-ink/25 bg-paper/50">
      <div className="flex items-baseline justify-between gap-3 border-b border-ink/25 px-4 py-3">
        <span className="gc-label text-ink/55">The chapter so far</span>
        <span className="gc-spec text-ink/35">Draft</span>
      </div>

      <dl>
        {rows.map(([label, value], index) => (
          <div
            key={label}
            className={`flex items-baseline justify-between gap-4 px-4 py-2.5 ${
              index ? "border-t border-ink/15" : ""
            }`}
          >
            <dt className="gc-label shrink-0 text-[11px] text-ink/45">{label}</dt>
            <dd
              className={`text-right text-[17px] leading-[1.25] ${
                value ? "text-ink" : "text-ink/30"
              }`}
            >
              {value ? (
                <span key={value} className="gc-step inline-block">
                  {value}
                </span>
              ) : (
                "Not yet"
              )}
            </dd>
          </div>
        ))}
      </dl>

      <p className="border-t border-ink/25 px-4 py-3 text-[13px] leading-[1.4] text-ink/50">
        Nothing is sent until the curator builds the eight and the person says yes to them.
      </p>
    </div>
  );
}