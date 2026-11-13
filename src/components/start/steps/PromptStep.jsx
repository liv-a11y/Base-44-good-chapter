import StartQuestion from "@/components/start/StartQuestion";

export default function PromptStep({
  label,
  question,
  hint,
  placeholder,
  value,
  onChange,
  onNext,
  onBack,
  error,
}) {
  return (
    <StartQuestion
      label={label}
      question={question}
      hint={hint}
      canContinue={value.trim().length > 0}
      onSubmit={onNext}
      onBack={onBack}
      error={error}
    >
      <textarea
        className="gc-input"
        value={value}
        onChange={(event) => onChange(event.target.value.slice(0, 300))}
        placeholder={placeholder}
        rows={4}
      />
      <p className="gc-label mt-2 text-right text-ink/40">{value.length} / 300</p>
    </StartQuestion>
  );
}