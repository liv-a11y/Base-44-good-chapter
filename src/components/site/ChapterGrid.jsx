import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { CHAPTER_SYMBOLS } from "@/lib/brand-assets";

/** First Place is the only chapter open today. The rest are shown, not linked. */
const CHAPTERS = [
  { key: "firstPlace", name: "First Place", open: true },
  { key: "movingIn", name: "Moving In" },
  { key: "startingOver", name: "Starting Over" },
  { key: "freshStart", name: "Fresh Start" },
  { key: "newWork", name: "New Work" },
  { key: "newBabySolo", name: "New Baby, Solo" },
];

function Tile({ chapter }) {
  return (
    <>
      <Image
        src={CHAPTER_SYMBOLS[chapter.key].ink}
        alt=""
        aria-hidden="true"
        fittingType="fit"
        className="h-[120px] w-[120px]"
      />
      <span className="mt-5 font-heading text-[23px] leading-[1.15]">{chapter.name}</span>
      <span className={`gc-label mt-2 ${chapter.open ? "text-cobalt" : "text-ink/65"}`}>
        {chapter.open ? "Open now" : "On the way"}
      </span>
    </>
  );
}

export default function ChapterGrid() {
  return (
    <section aria-labelledby="chapters" className="mx-auto max-w-6xl px-6 py-14 md:py-24">
      <p className="gc-label text-ink/65">The chapters</p>
      <h2 id="chapters" className="mt-5 max-w-3xl text-[34px] leading-[1.04] sm:text-[52px]">
        start with home.
      </h2>

      <ul className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3">
        {CHAPTERS.map((chapter) => (
          <li key={chapter.key}>
            {chapter.open ? (
              <Link
                to="/first-place"
                className="flex h-full flex-col items-start border border-ink bg-paper p-6 hover:bg-plaster"
              >
                <Tile chapter={chapter} />
              </Link>
            ) : (
              <div className="flex h-full flex-col items-start bg-paper p-6">
                <Tile chapter={chapter} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
