import { useState } from "react";
import { ArrowRight } from "lucide-react";
import InterviewChat from "@/components/interview/InterviewChat";

const first = (name) => (name || "").trim().split(/\s+/)[0] || "them";

export default function InterviewStep({ form, update, onNext, onBack }) {
  const person = first(form.personName);
  const [picked, setPicked] = useState(form.starterIdeas ? form.starterIdeas.split(":")[0] : "");

  const seedMessage = [
    `I am starting a chapter for ${form.personName || "a friend"}.`,
    `The chapter is ${form.chapterType || "not chosen yet"}.`,
    form.alwaysWears ? `What they always wear: ${form.alwaysWears}` : "",
    form.rewatches ? `What they rewatch: ${form.rewatches}` : "",
    form.neverBuys ? `What they would never buy themselves: ${form.neverBuys}` : "",
    "Ask me what you need, one question at a time, then suggest the three things.",
  ]
    .filter(Boolean)
    .join("\n");

  const keep = (idea) => {
    setPicked(idea.name);
    update({
      starterIdeas: `${idea.name}: ${idea.why || idea.what || ""}`.trim(),
      anchorIdea: idea.name,
      anchorNote: [idea.what, idea.why].filter(Boolean).join(" "),
    });
  };

  return (
    <div className="gc-step">
      <span className="gc-label text-ink/55">The interview</span>
      <h1 className="mt-4 text-[clamp(30px,4.4vw,48px)]">Anything else only you would know?</h1>
      <p className="mt-4 max-w-[44ch] text-[21px] leading-[1.38] text-ink/85">
        A few questions about {person}. What comes back is an idea, not the chapter. A curator still
        builds all eight, and {person} approves every one.
      </p>

      <div className="mt-8 border border-ink bg-linen/40 p-4 sm:p-5">
        <InterviewChat
          agentName="item_interviewer"
          seedMessage={seedMessage}
          onPick={keep}
          pickedName={picked}
        />
      </div>

      {picked ? (
        <p className="gc-label mt-4 text-clay">Kept: {picked}. The curator sees it with the chapter.</p>
      ) : (
        <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.4] text-ink/55">
          Optional. Say as little as you like. Nothing from this conversation is shared with{" "}
          {person}.
        </p>
      )}

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-ink pt-6">
        <button type="button" onClick={onBack} className="gc-label gc-link pb-0.5">
          Back
        </button>
        <button type="button" onClick={onNext} className="gc-btn">
          <span className="gc-btn-label">Continue</span>
          <span className="gc-btn-arrow" aria-hidden="true">
            <ArrowRight size={17} strokeWidth={1.6} />
          </span>
        </button>
      </div>
    </div>
  );
}