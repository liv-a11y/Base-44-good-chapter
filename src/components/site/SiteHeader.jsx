import { Link } from "@tanstack/react-router";
import Wordmark from "@/components/site/Wordmark";

export default function SiteHeader() {
  return (
    <header className="border-b-2 border-ink bg-plaster">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <Wordmark />
        <div className="flex items-center gap-6">
          <span className="gc-label hidden text-ink/70 sm:block">A chapter, not a registry</span>
          <Link
            to="/start"
            className="gc-label border-b-2 border-transparent pb-0.5 text-cobalt transition-colors hover:border-cobalt"
          >
            Start a chapter
          </Link>
        </div>
      </div>
    </header>
  );
}