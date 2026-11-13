import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const first = (name) => (name || "").trim().split(/\s+/)[0] || "The person";

export default function DoneStep({ result, form, onRestart }) {
  const person = first(form.personName);
  const guestCount = form.guests.filter((row) => row.email.trim()).length;

  return (
    <div className="gc-step">
      <span className="gc-sticker text-ink">Nothing has been sent</span>

      <h1 className="mt-7 text-[clamp(30px,4.6vw,44px)] leading-[1.1] text-ink">
        That is the whole ask.
      </h1>

      <p className="mt-5 max-w-[440px] text-[17px] leading-relaxed text-ink/80">
        The chapter is with the curator now. Eight things get chosen by hand, with a reason written
        next to each one.
      </p>

      <div className="mt-9 border-2 border-ink bg-paper">
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink px-5 py-4">
          <span className="gc-label text-ink/60">Reference</span>
          <span className="font-mono text-[15px] tracking-[0.08em] text-ink">{result.reference}</span>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink px-5 py-4">
          <span className="gc-label text-ink/60">The person</span>
          <span className="text-[16px] text-ink">{form.personName}</span>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink px-5 py-4">
          <span className="gc-label text-ink/60">Chapter</span>
          <span className="text-[16px] text-ink">{form.chapterType}</span>
        </div>
        <div className="flex items-baseline justify-between gap-4 px-5 py-4">
          <span className="gc-label text-ink/60">Guests waiting</span>
          <span className="text-[16px] text-ink">{guestCount}</span>
        </div>
      </div>

      <p className="mt-6 text-[15px] leading-relaxed text-ink/70">
        {person} has not been emailed. Not one guest has been emailed. Nothing reaches anyone until
        {" "}
        {person} opens the list first and approves it.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-6 border-t-2 border-ink pt-6">
        <button type="button" className="gc-btn" onClick={onRestart}>
          <span className="gc-btn-label">Start another</span>
          <span className="gc-btn-arrow" aria-hidden="true">
            <ArrowRight size={17} strokeWidth={1.6} />
          </span>
        </button>
        <Link to="/" className="gc-label text-cobalt">
          Back to the beginning
        </Link>
      </div>
    </div>
  );
}