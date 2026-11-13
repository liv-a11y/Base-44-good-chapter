import { ArrowRight } from "lucide-react";

export default function StartQuestion({
  label,
  question,
  hint,
  onBack,
  onSubmit,
  nextLabel = "Continue",
  canContinue = true,
  submitting = false,
  error = "",
  children,
}) {
  return (
    <form
      className="gc-step"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
    >
      <span className="gc-label text-ink/55">{label}</span>
      <h1 className="mt-4 text-[clamp(30px,4.4vw,48px)]">{question}</h1>
      {hint ? (
        <p className="mt-4 max-w-[44ch] text-[21px] leading-[1.38] text-ink/85">{hint}</p>
      ) : null}

      <div className="mt-9">{children}</div>

      {error ? (
        <p className="mt-5 border-l border-clay pl-3 text-[17px] leading-[1.38] text-clay">{error}</p>
      ) : null}

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-ink pt-6">
        {onBack ? (
          <button type="button" onClick={onBack} className="gc-label gc-link pb-0.5">
            Back
          </button>
        ) : (
          <span className="gc-label text-ink/35">Beginning</span>
        )}
        <button type="submit" className="gc-btn" disabled={!canContinue || submitting}>
          <span className="gc-btn-label">{submitting ? "Saving" : nextLabel}</span>
          <span className="gc-btn-arrow" aria-hidden="true">
            <ArrowRight size={17} strokeWidth={1.6} />
          </span>
        </button>
      </div>
    </form>
  );
}