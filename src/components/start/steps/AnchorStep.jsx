import StartQuestion from "@/components/start/StartQuestion";

const first = (name) => (name || "").trim().split(/\s+/)[0] || "them";

export default function AnchorStep({ form, update, onNext, onBack }) {
  const person = first(form.personName);
  const ready = form.anchorIdea.trim().length >= 2;

  const letCurator = () => {
    update({ anchorIdea: "The curator proposes the anchor", anchorNote: "" });
    onNext();
  };

  return (
    <StartQuestion
      label="The anchor"
      question="Is this the one you would give first?"
      hint={`The curator starts here and builds the other seven around it. Nothing is ordered from this page, and ${person} still approves every one.`}
      canContinue={ready}
      onSubmit={onNext}
      onBack={onBack}
    >
      <div className="space-y-5">
        <label className="block">
          <span className="gc-label text-ink/60">The anchor gift</span>
          <input
            className="gc-input mt-2"
            value={form.anchorIdea}
            onChange={(event) => update({ anchorIdea: event.target.value })}
            placeholder="One good enamel coffee pot"
            maxLength={120}
          />
        </label>

        <label className="block">
          <span className="gc-label text-ink/60">Why this one (optional)</span>
          <textarea
            className="gc-input mt-2 min-h-[104px]"
            value={form.anchorNote}
            onChange={(event) => update({ anchorNote: event.target.value })}
            placeholder="She makes one enormous pot every Sunday and would never spend it on herself."
            maxLength={400}
          />
        </label>

        <button type="button" onClick={letCurator} className="gc-label gc-link pb-0.5">
          I would rather the curator propose it
        </button>
      </div>
    </StartQuestion>
  );
}