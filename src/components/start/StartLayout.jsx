import { Link } from "@tanstack/react-router";
import Wordmark from "@/components/site/Wordmark";

export default function StartLayout({ step, total, children }) {
  const filled = Math.round(((step + 1) / total) * 100);

  return (
    <div className="flex min-h-screen flex-col bg-plaster">
      <header className="border-b-2 border-ink">
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between gap-6 px-6 py-5">
          <Wordmark />
          <Link to="/" className="gc-label text-cobalt">
            Leave
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1100px] px-6 pt-6">
        <div className="flex items-center gap-4">
          <span className="gc-label text-ink/60">
            Step {String(step + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
          </span>
          <div className="h-[2px] flex-1 bg-ink/15">
            <div className="h-full bg-ink transition-all duration-500" style={{ width: `${filled}%` }} />
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[560px] flex-1 px-6 pb-24 pt-14 sm:pt-20">{children}</main>
    </div>
  );
}