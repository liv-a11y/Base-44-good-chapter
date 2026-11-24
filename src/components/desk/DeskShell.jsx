import { Link } from "@tanstack/react-router";
import Wordmark from "@/components/site/Wordmark";

export default function DeskShell({ children }) {
  return (
    <div className="min-h-screen bg-plaster">
      <header className="bg-ink">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 px-6 py-5">
          <div className="flex items-baseline gap-4">
            <Wordmark tone="reverse" />
            <span className="gc-label text-plaster/65">Curator desk</span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/desk" className="gc-label pb-0.5 text-plaster/65">
              Chapters
            </Link>
            <Link to="/desk/gaps" className="gc-label pb-0.5 text-plaster/65">
              Gaps
            </Link>
            <Link to="/desk/library" className="gc-label pb-0.5 text-plaster/65">
              Library
            </Link>
            <Link to="/desk/requests" className="gc-label pb-0.5 text-plaster/65">
              Requests
            </Link>
            <Link to="/desk/quote" className="gc-label pb-0.5 text-plaster/65">
              Quote
            </Link>
            <Link to="/" className="gc-label pb-0.5 text-plaster">
              Leave
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-10">{children}</main>
    </div>
  );
}