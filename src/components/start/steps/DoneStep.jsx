import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const first = (name) => (name || "").trim().split(/\s+/)[0] || "The person";

export default function DoneStep({ result, form, onRestart }) {
  const person = first(form.personName);
  const guestCount = form.guests.filter((row) => row.email.trim()).length;

  return (
    <div className="gc-step">
      <span className="gc-sticker">Nothing has been sent</span>

      <h1 className="gc-loud mt-7 text-[clamp(34px,5vw,52px)]">that is the whole ask.</h1>

      <p className="mt-5 max-w-[42ch] text-[21px] leading-[1.38] text-ink/85">
        The chapter is with the curator now. Eight things get chosen by hand, with a reason written
        next to each one.
      </p>

      <div className="mt-9 border border-ink bg-paper">
        <div className="flex items-baseline justify-between gap-4 border-b border-ink px-5 py-4">
          <span className="gc-label text-ink/60">Reference</span>
          <span className="gc-spec text-[15px]">{result.reference}</span>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-b border-ink px-5 py-4">
          <span className="gc-label text-ink/60">The person</span>
          <span className="text-[19px]">{form.personName}</span>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-b border-ink px-5 py-4">
          <span className="gc-label text-ink/60">Chapter</span>
          <span className="text-[19px]">{form.chapterType}</span>
        </div>
        <div className="flex items-baseline justify-between gap-4 px-5 py-4">
          <span className="gc-label text-ink/60">Guests waiting</span>
          <span className="gc-spec text-[15px]">{guestCount}</span>
        </div>
      </div>

      <p className="mt-6 max-w-[42ch] text-[17px] leading-[1.38] text-ink/70">
        {person} has not been emailed. Not one guest has been emailed. Nothing reaches anyone until
        {" "}
        {person} opens the list first and approves it.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-6 border-t border-ink pt-6">
        <button type="button" className="gc-btn" onClick={onRestart}>
          <span className="gc-btn-label">Start another</span>
          <span className="gc-btn-arrow" aria-hidden="true">
            <ArrowRight size={17} strokeWidth={1.6} />
          </span>
        </button>
        <Link to="/" className="gc-label gc-link pb-0.5">
          Back to the beginning
        </Link>
      </div>
    </div>
  );
}