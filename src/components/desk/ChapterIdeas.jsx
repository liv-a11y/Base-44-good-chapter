import IdeaCard from "@/components/desk/IdeaCard";

/** Gaps kept from this chapter's shop searches, reviewed beside it. */
export default function ChapterIdeas({ ideas }) {
  if (!ideas?.length) return null;

  return (
    <section aria-labelledby="chapter-ideas" className="mt-9 border-t border-ink/25 pt-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="chapter-ideas" className="text-[22px]">
          Gaps worth stocking
        </h2>
        <span className="gc-label text-ink/45">{ideas.length} kept</span>
      </div>
      <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.4] text-ink/55">
        What this chapter needed and the shop did not carry. Ideas only. None of them are in the
        eight.
      </p>
      <div className="mt-3 space-y-3">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </section>
  );
}