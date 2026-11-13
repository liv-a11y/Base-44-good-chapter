import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import Wordmark from "@/components/site/Wordmark";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-plaster">
      <div className="mx-auto flex min-h-20 max-w-6xl items-center gap-4 px-6 py-3">
        <Wordmark />
        <span className="gc-label ml-auto hidden text-ink/60 sm:inline">Private pilot</span>
        <Link to="/start" className="gc-label gc-link hidden shrink-0 pb-0.5 sm:inline">
          Start a chapter
        </Link>
        <Link to="/" hash="invite" className="gc-btn ml-auto shrink-0 sm:ml-0">
          <span className="gc-btn-label">Request an invitation</span>
          <span className="gc-btn-arrow" aria-hidden="true">
            <ArrowRight size={15} strokeWidth={1.6} />
          </span>
        </Link>
      </div>
    </header>
  );
}