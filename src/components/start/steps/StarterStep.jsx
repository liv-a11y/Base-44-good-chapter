import StartQuestion from "@/components/start/StartQuestion";

export default function StarterStep({ form, update, onNext, onBack }) {
  const canContinue =
    form.starterName.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.starterEmail.trim());

  return (
    <StartQuestion
      label="From you"
      question="Who should this come from?"
      hint="Guests get one email. It comes from you, not from a store, so they know who thought of this."
      canContinue={canContinue}
      onSubmit={onNext}
      onBack={onBack}
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="starter-name" className="gc-label text-ink/60">
            Your name
          </label>
          <input
            id="starter-name"
            className="gc-input mt-2"
            value={form.starterName}
            onChange={(event) => update({ starterName: event.target.value })}
            placeholder="Jonah Reed"
            autoComplete="name"
            maxLength={80}
          />
        </div>
        <div>
          <label htmlFor="starter-email" className="gc-label text-ink/60">
            Your email
          </label>
          <input
            id="starter-email"
            className="gc-input mt-2"
            value={form.starterEmail}
            onChange={(event) => update({ starterEmail: event.target.value })}
            placeholder="jonah@example.com"
            inputMode="email"
            autoComplete="email"
            maxLength={160}
          />
        </div>
      </div>
    </StartQuestion>
  );
}