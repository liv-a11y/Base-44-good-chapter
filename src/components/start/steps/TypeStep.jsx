import { Check } from "lucide-react";
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
      <div className="grid gap-2 sm:grid-cols-2">
        {CHAPTER_TYPES.map((type) => {
          const active = form.chapterType === type;
          return (
            <button
              key={type}
              type="button"
              className="gc-option gap-3 px-4 py-3 text-[17px] leading-[1.25]"
              aria-pressed={active}
              onClick={() => update({ chapterType: type })}
            >
              <span className="flex-1 text-left">{type}</span>
              <Check
                size={15}
                strokeWidth={2}
                aria-hidden="true"
                className={active ? "shrink-0 opacity-100" : "shrink-0 opacity-0"}
              />
            </button>
          );
        })}
      </div>
    </StartQuestion>
  );
}