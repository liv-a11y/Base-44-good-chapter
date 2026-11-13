import { Link } from "@tanstack/react-router";
import Wordmark from "@/components/site/Wordmark";

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink bg-plaster">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[36ch]">
          <Wordmark />
          <p className="mt-3 text-[19px] leading-[1.35] text-ink/80">for what comes next.</p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <span className="gc-label text-ink/50">Email only</span>
          <Link to="/start" className="gc-label gc-link pb-0.5">
            Start a chapter
          </Link>
        </div>
      </div>
    </footer>
  );
}