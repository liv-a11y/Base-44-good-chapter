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
          <Link to="/" className="gc-label pb-0.5 text-plaster">
            Leave
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-10">{children}</main>
    </div>
  );
}