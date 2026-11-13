import { Plus, X } from "lucide-react";
import StartQuestion from "@/components/start/StartQuestion";

const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function GuestsStep({ form, update, onNext, onBack, error }) {
  const rows = form.guests;
  const filled = rows.filter((row) => row.name.trim() || row.email.trim());
  const allValid = filled.every((row) => row.name.trim() && emailOk(row.email));

  const setRow = (index, patch) =>
    update({ guests: rows.map((row, i) => (i === index ? { ...row, ...patch } : row)) });

  return (
    <StartQuestion
      label="The guest list"
      question="Who would want to give something?"
      hint="Names and emails only. The person sees this list before anyone else and can take names off it."
      canContinue={allValid && filled.length > 0}
      onSubmit={onNext}
      onBack={onBack}
      nextLabel="Finish"
      error={error}
    >
      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={index} className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              className="gc-input sm:flex-1"
              value={row.name}
              onChange={(event) => setRow(index, { name: event.target.value })}
              placeholder="Name"
              aria-label={`Guest ${index + 1} name`}
              maxLength={80}
            />
            <div className="flex items-center gap-2 sm:flex-1">
              <input
                className="gc-input min-w-0 flex-1"
                value={row.email}
                onChange={(event) => setRow(index, { email: event.target.value })}
                placeholder="Email"
                aria-label={`Guest ${index + 1} email`}
                inputMode="email"
                maxLength={160}
              />
              <button
                type="button"
                aria-label={`Remove guest ${index + 1}`}
                onClick={() => update({ guests: rows.filter((_, i) => i !== index) })}
                className="gc-label flex h-[54px] w-[54px] shrink-0 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-plaster"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => update({ guests: [...rows, { name: "", email: "" }] })}
        className="gc-label mt-4 inline-flex items-center gap-2 text-cobalt"
      >
        <Plus size={14} strokeWidth={2} /> Add another guest
      </button>

      <p className="mt-6 max-w-[44ch] text-[17px] leading-[1.38] text-ink/65">
        No phone numbers, no messaging. Guests hear from you once, by email, and only after the person
        says yes.
      </p>
    </StartQuestion>
  );
}