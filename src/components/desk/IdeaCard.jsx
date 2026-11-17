/**
 * A product concept the shop does not carry. Always labeled as an idea, never
 * dressed up as something in stock.
 */
export default function IdeaCard({ idea, onSave, saved = false, saving = false }) {
  const phrases = idea.phrases || [];

  return (
    <div className="border border-ink bg-paper">
      <div className="flex items-center justify-between gap-3 border-b border-ink/25 px-4 py-2">
        <span className="gc-label text-clay">Not in the shop</span>
        {idea.category ? <span className="gc-spec text-ink/40">{idea.category}</span> : null}
      </div>

      <div className="px-4 py-3">
        <h3 className="font-heading text-[20px] leading-tight">{idea.concept}</h3>
        {idea.detail ? (
          <p className="mt-1 text-[17px] leading-[1.35] text-ink/80">{idea.detail}</p>
        ) : null}
        {idea.reason ? <p className="mt-2 text-[17px] leading-[1.35]">{idea.reason}</p> : null}

        {phrases.length ? (
          <div className="mt-3">
            <span className="gc-label text-ink/50">Search for</span>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {phrases.map((phrase) => (
                <li
                  key={phrase}
                  className="border border-ink/35 px-2 py-1 text-[15px] leading-none text-ink/80"
                >
                  {phrase}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {onSave ? (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-2">
            <span className="gc-label text-ink/45">
              {saved ? "Kept with the chapter" : "An idea only. Nothing to add yet."}
            </span>
            {saved ? null : (
              <button
                type="button"
                onClick={onSave}
                disabled={saving}
                className="gc-label gc-link pb-0.5 disabled:border-b-0 disabled:text-ink/30"
              >
                {saving ? "Keeping" : "Keep this with the chapter"}
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}