import { Link } from "@tanstack/react-router";
import { CHAPTER_STATE_LABELS } from "@/lib/chapter-types";

const COLUMNS = ["Person", "Chapter type", "Starter", "State", "Days in state"];

const days = (value) => (value === 0 ? "Today" : `${value}`);

export default function ChapterTable({ chapters }) {
  if (!chapters.length) {
    return (
      <p className="py-10 max-w-[52ch] text-[19px] leading-[1.38] text-ink/75">
        No chapters yet. One appears here as soon as a starter finishes the questions.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="border-y border-ink">
            {COLUMNS.map((column) => (
              <th key={column} className="gc-label py-3 pr-4 font-normal text-ink/60">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter) => (
            <tr
              key={chapter.id}
              className="border-b border-ink/25 transition-colors hover:bg-ink hover:text-plaster"
            >
              <td className="py-4 pr-4 align-top">
                <Link
                  to="/desk/$chapterId"
                  params={{ chapterId: chapter.id }}
                  className="font-heading text-[22px] leading-tight"
                >
                  {chapter.person_name}
                </Link>
                {chapter.is_sample ? (
                  <span className="gc-label ml-2 text-ink/50">Sample</span>
                ) : null}
                {chapter.reference ? (
                  <p className="gc-spec mt-1 text-ink/50">{chapter.reference}</p>
                ) : null}
              </td>
              <td className="py-4 pr-4 align-top text-[17px]">{chapter.chapter_type}</td>
              <td className="py-4 pr-4 align-top text-[17px]">
                {chapter.starter_name || "None given"}
              </td>
              <td className="py-4 pr-4 align-top text-[17px]">
                {CHAPTER_STATE_LABELS[chapter.state] || chapter.state}
              </td>
              <td className="py-4 pr-4 align-top">
                <span className="gc-spec">{days(chapter.days_in_state)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}