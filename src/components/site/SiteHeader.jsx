import { Link } from "@tanstack/react-router";
import Wordmark from "@/components/site/Wordmark";

export default function SiteHeader() {
  return (
    <header className="border-b border-ink bg-plaster">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <Wordmark />
        <div className="flex items-center gap-6">
          <span className="hidden text-[17px] leading-none text-ink/70 sm:block">
            for what comes next.
          </span>
          <Link to="/start" className="gc-label gc-link pb-0.5">
            Start a chapter
          </Link>
        </div>
      </div>
    </header>
  );
}