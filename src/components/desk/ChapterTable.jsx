import { Link } from "@tanstack/react-router";
import { CHAPTER_STATE_LABELS } from "@/lib/chapter-types";

const COLUMNS = ["Person", "Chapter type", "Starter", "State", "Days in state"];

const days = (value) => (value === 0 ? "Today" : `${value}`);

export default function ChapterTable({ chapters }) {
  if (!chapters.length) {
    return (
      <p className="py-10 text-ink/70">
        No chapters yet. One appears here as soon as a starter finishes the questions.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="border-y-2 border-ink">
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
              className="border-b-2 border-ink/15 transition-colors hover:bg-ink hover:text-plaster"
            >
              <td className="py-4 pr-4 align-top">
                <Link
                  to="/desk/$chapterId"
                  params={{ chapterId: chapter.id }}
                  className="font-heading text-[19px] leading-tight"
                >
                  {chapter.person_name}
                </Link>
                {chapter.is_sample ? (
                  <span className="gc-label ml-2 text-ink/50">Sample</span>
                ) : null}
                {chapter.reference ? (
                  <p className="gc-label mt-1 text-ink/45">{chapter.reference}</p>
                ) : null}
              </td>
              <td className="py-4 pr-4 align-top text-[15px]">{chapter.chapter_type}</td>
              <td className="py-4 pr-4 align-top text-[15px]">{chapter.starter_name || "—"}</td>
              <td className="py-4 pr-4 align-top text-[15px]">
                {CHAPTER_STATE_LABELS[chapter.state] || chapter.state}
              </td>
              <td className="py-4 pr-4 align-top font-mono text-[13px]">
                {days(chapter.days_in_state)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}