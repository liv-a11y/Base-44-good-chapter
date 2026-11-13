import { Link } from "@tanstack/react-router";
import Wordmark from "@/components/site/Wordmark";

export default function DeskShell({ children }) {
  return (
    <div className="min-h-screen bg-plaster">
      <header className="border-b-2 border-ink">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-6 px-6 py-5">
          <div className="flex items-baseline gap-3">
            <Wordmark />
            <span className="gc-label text-ink/55">Curator desk</span>
          </div>
          <Link to="/" className="gc-label text-cobalt">
            Leave
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-10">{children}</main>
    </div>
  );
}