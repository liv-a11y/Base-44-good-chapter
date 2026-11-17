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
      onKeyDown={(event) => {
        if (event.key !== "Enter" || event.shiftKey) return;
        const tag = event.target.tagName;
        if (tag === "TEXTAREA" || tag === "BUTTON") return;
        if (!canContinue || submitting) return;
        event.preventDefault();
        onSubmit?.();
      }}
    >
      <div className="flex items-center gap-4">
        <span className="gc-label text-ink/50">{label}</span>
        <span className="h-[1.5px] flex-1 bg-ink/15" aria-hidden="true" />
      </div>

      <h1 className="mt-7 text-[clamp(32px,4.2vw,52px)] leading-[0.98]">{question}</h1>

      {hint ? (
        <p className="mt-5 max-w-[42ch] text-[18px] leading-[1.46] text-ink/70">{hint}</p>
      ) : null}

      <div className="mt-10">{children}</div>

      {error ? (
        <p className="mt-5 border-l border-clay pl-3 text-[17px] leading-[1.38] text-clay">{error}</p>
      ) : null}

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-ink/20 pt-6">
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