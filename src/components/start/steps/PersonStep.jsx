import StartQuestion from "@/components/start/StartQuestion";

export default function PersonStep({ form, update, onNext }) {
  const canContinue =
    form.personName.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.personEmail.trim());

  return (
    <StartQuestion
      label="The person"
      question="Who is this chapter for?"
      hint="One person. They will get a private link before anyone else does, and they decide what happens next."
      canContinue={canContinue}
      onSubmit={onNext}
      nextLabel="Continue"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="person-name" className="gc-label text-ink/60">
            Their name
          </label>
          <input
            id="person-name"
            className="gc-input mt-2"
            value={form.personName}
            onChange={(event) => update({ personName: event.target.value })}
            placeholder="Maya Ellison"
            autoComplete="off"
            maxLength={80}
          />
        </div>
        <div>
          <label htmlFor="person-email" className="gc-label text-ink/60">
            Their email
          </label>
          <input
            id="person-email"
            className="gc-input mt-2"
            value={form.personEmail}
            onChange={(event) => update({ personEmail: event.target.value })}
            placeholder="maya@example.com"
            inputMode="email"
            autoComplete="off"
            maxLength={160}
          />
        </div>
      </div>
    </StartQuestion>
  );
}