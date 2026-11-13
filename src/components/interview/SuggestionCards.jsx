import { Check } from "lucide-react";

function IdeaCard({ idea, lead, picked, onPick }) {
  return (
    <div className={`border border-ink ${lead ? "bg-paper px-4 py-4" : "px-4 py-3"}`}>
      {lead ? <p className="gc-label text-clay">The one</p> : null}
      <p
        className={
          lead
            ? "mt-2 font-heading text-[23px] leading-[1.1]"
            : "mt-2 text-[19px] leading-[1.25]"
        }
      >
        {idea.name}
      </p>
      {idea.what ? (
        <p className="mt-1 text-[17px] leading-[1.35] text-ink/85">{idea.what}</p>
      ) : null}
      {idea.why ? (
        <p className="mt-2 border-l border-ink/40 pl-3 text-[17px] leading-[1.35] text-ink/85">
          {idea.why}
        </p>
      ) : null}
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        {idea.band ? <span className="gc-spec text-[11px] text-ink/55">{idea.band}</span> : null}
        {idea.find ? <span className="gc-spec text-[11px] text-ink/55">{idea.find}</span> : null}
      </div>
      <button
        type="button"
        onClick={() => onPick(idea)}
        className={`gc-label mt-3 inline-flex items-center gap-2 ${picked ? "text-clay" : "text-cobalt"}`}
      >
        {picked ? (
          <>
            <Check size={13} strokeWidth={2.2} /> Kept for the curator
          </>
        ) : (
          "Keep this idea"
        )}
      </button>
    </div>
  );
}

export default function SuggestionCards({ ideas, onPick, pickedName }) {
  return (
    <div className="mt-4 space-y-3">
      <IdeaCard idea={ideas.best} lead picked={pickedName === ideas.best.name} onPick={onPick} />
      {ideas.others.length ? (
        <p className="gc-label pt-2 text-ink/45">Also worth a look</p>
      ) : null}
      {ideas.others.map((idea) => (
        <IdeaCard key={idea.name} idea={idea} picked={pickedName === idea.name} onPick={onPick} />
      ))}
    </div>
  );
}