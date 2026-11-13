import { Link } from "@tanstack/react-router";
import Wordmark from "@/components/site/Wordmark";

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-plaster">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
            Chapters for the things that never got a convention. Eight things, one person, no cash.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <span className="gc-label text-ink/60">Email only</span>
          <Link to="/start" className="gc-label text-cobalt">
            Start a chapter
          </Link>
        </div>
      </div>
    </footer>
  );
}