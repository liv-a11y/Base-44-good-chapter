import StartQuestion from "@/components/start/StartQuestion";
import { CHAPTER_TYPES } from "@/lib/chapter-types";

export default function TypeStep({ form, update, onNext, onBack }) {
  return (
    <StartQuestion
      label="The chapter"
      question="Which chapter is this?"
      hint="Pick the closest one. It only shapes the list. It does not label the person."
      canContinue={Boolean(form.chapterType)}
      onSubmit={onNext}
      onBack={onBack}
    >
      <div className="space-y-2">
        {CHAPTER_TYPES.map((type, index) => (
          <button
            key={type}
            type="button"
            className="gc-option"
            aria-pressed={form.chapterType === type}
            onClick={() => update({ chapterType: type })}
          >
            <span className="gc-spec w-6 shrink-0 opacity-70">{String(index + 1).padStart(2, "0")}</span>
            <span>{type}</span>
          </button>
        ))}
      </div>
    </StartQuestion>
  );
}