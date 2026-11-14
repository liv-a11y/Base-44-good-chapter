import { CHAPTER_STATE_LABELS, PATH_LABELS } from "@/lib/chapter-types";

const MONEY = (value) => `$${Number(value || 0).toLocaleString("en-US")}`;

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
        <Field label="Idea kept from the interview" value={chapter.starter_ideas} />
        <Field label="How it starts" value={PATH_LABELS[chapter.path] || "An anchor gift"} />
        {chapter.path !== "anchor_gift" ? (
          <Field
            label={chapter.path === "realtor_budget" ? "The realtor's budget" : "The pool"}
            value={[
              `${MONEY(chapter.pool_amount)} ${
                chapter.path === "realtor_budget" ? "per gift" : "per person"
              }`,
              chapter.pool_term
                ? `${chapter.path === "realtor_budget" ? "" : "term "}${chapter.pool_term}`
                : "",
              chapter.pool_employer || "",
            ]
              .filter(Boolean)
              .join(" · ")}
          />
        ) : (
          <Field
            label="The anchor gift"
            value={[chapter.anchor_idea, chapter.anchor_note].filter(Boolean).join("\n")}
          />
        )}
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

      {guests.some((guest) => guest.shared_idea) ? (
        <div className="mt-6">
          <h3 className="gc-label text-ink/50">Ideas the guests sent</h3>
          <ul className="mt-2 space-y-2">
            {guests
              .filter((guest) => guest.shared_idea)
              .map((guest) => (
                <li key={guest.id} className="text-[17px] leading-[1.35] text-ink/85">
                  <span className="gc-spec uppercase">{guest.name}</span> · {guest.shared_idea}
                  {guest.shared_idea_note ? ` · ${guest.shared_idea_note}` : ""}
                </li>
              ))}
          </ul>
          <p className="mt-2 text-[15px] leading-[1.4] text-ink/50">
            An idea, not an item. Nothing here is on the list until you add it and the person
            approves it.
          </p>
        </div>
      ) : null}

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