import StartQuestion from "@/components/start/StartQuestion";

const COPY = {
  employer_pool: {
    label: "The pool",
    question: "What did work set aside?",
    hint: "One amount per person, fixed at the start of the benefit term. Nothing is charged here and no money moves through this site. The curator builds inside the number.",
    sourceLabel: "Who set it aside",
    sourcePlaceholder: "The company, or the firm",
    termLabel: "Benefit term",
    termPlaceholder: "2026, or whatever the term is called",
  },
  realtor_budget: {
    label: "Your budget",
    question: "What is your budget per client?",
    hint: "One amount, set before the chapter starts. Nothing is charged here and no money moves through this site. The curator builds the anchor gift and the seven after it inside the number.",
    sourceLabel: "Your name, or the brokerage",
    sourcePlaceholder: "You, or the brokerage",
    termLabel: "What it covers",
    termPlaceholder: "2026, or this quarter",
  },
};

export default function PoolStep({ form, update, onNext, onBack }) {
  const copy = COPY[form.path] ?? COPY.employer_pool;
  const ready =
    form.poolEmployer.trim().length > 0 &&
    Number(form.poolAmount) > 0 &&
    form.poolTerm.trim().length > 0;

  return (
    <StartQuestion
      label={copy.label}
      question={copy.question}
      hint={copy.hint}
      canContinue={ready}
      onSubmit={onNext}
      onBack={onBack}
    >
      <div className="space-y-5">
        <label className="block">
          <span className="gc-label text-ink/60">{copy.sourceLabel}</span>
          <input
            className="gc-input mt-2"
            value={form.poolEmployer}
            onChange={(event) => update({ poolEmployer: event.target.value })}
            placeholder={copy.sourcePlaceholder}
            maxLength={120}
          />
        </label>

        <label className="block">
          <span className="gc-label text-ink/60">
            {form.path === "realtor_budget" ? "Per gift" : "Per person"}
          </span>
          <span className="mt-2 flex items-stretch border border-ink bg-plaster">
            <span className="gc-spec flex items-center border-r border-ink px-3 text-ink/60">$</span>
            <input
              className="w-full bg-transparent px-3 py-3 font-body text-[19px] text-ink outline-none"
              value={form.poolAmount}
              onChange={(event) =>
                update({ poolAmount: event.target.value.replace(/[^0-9.]/g, "").slice(0, 8) })
              }
              inputMode="decimal"
              placeholder="250"
            />
          </span>
        </label>

        <label className="block">
          <span className="gc-label text-ink/60">{copy.termLabel}</span>
          <input
            className="gc-input mt-2"
            value={form.poolTerm}
            onChange={(event) => update({ poolTerm: event.target.value })}
            placeholder={copy.termPlaceholder}
            maxLength={60}
          />
        </label>
      </div>
    </StartQuestion>
  );
}