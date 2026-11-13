import { CHAPTER_STATE_LABELS } from "@/lib/chapter-types";

const Field = ({ label, value }) => (
  <div className="border-t border-ink/25 py-3">
    <p className="gc-label text-ink/50">{label}</p>
    <p className="mt-1 whitespace-pre-line text-[19px] leading-[1.35]">
      {value || "Not answered"}
    </p>
  </div>
);

export default function AnswersPanel({ chapter, guests, reasons }) {
  return (
    <section aria-labelledby="answers-heading">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="answers-heading" className="text-[26px]">
          What the starter said
        </h2>
        <span className="gc-label text-ink/50">{guests.length} guests</span>
      </div>

      <div className="mt-3">
        <Field label="The person" value={chapter.person_name} />
        <Field label="Their email" value={chapter.person_email} />
        <Field label="Chapter type" value={chapter.chapter_type} />
        <Field
          label="From"
          value={[chapter.starter_name, chapter.starter_email].filter(Boolean).join(" · ")}
        />
        <Field label="Always wears" value={chapter.always_wears} />
        <Field label="Rewatches" value={chapter.rewatches} />
        <Field label="Would never buy themselves" value={chapter.never_buys} />
        <Field
          label="Guests they named"
          value={
            guests.length
              ? guests.map((guest) => `${guest.name} · ${guest.email}`).join("\n")
              : ""
          }
        />
      </div>

      <p className="gc-label mt-4 text-ink/50">State: {CHAPTER_STATE_LABELS[chapter.state]}</p>

      {reasons.length ? (
        <div className="mt-6">
          <h3 className="gc-label text-ink/50">Changes made here</h3>
          <ul className="mt-2 space-y-2">
            {reasons.map((reason) => (
              <li key={reason.id} className="text-[17px] leading-[1.35] text-ink/85">
                <span className="gc-spec uppercase">{reason.reason_code.replace("_", " ")}</span>
                {reason.note ? ` · ${reason.note}` : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}