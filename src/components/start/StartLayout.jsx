import { Link } from "@tanstack/react-router";
import Wordmark from "@/components/site/Wordmark";

export default function StartLayout({ step, total, children }) {
  const filled = Math.round(((step + 1) / total) * 100);

  return (
    <div className="flex min-h-screen flex-col bg-plaster">
      <header className="bg-ink">
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between gap-6 px-6 py-5">
          <Wordmark tone="reverse" />
          <Link to="/" className="gc-label pb-0.5 text-plaster">
            Leave
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1100px] px-6 pt-6">
        <div className="flex items-center gap-4">
          <span className="gc-label text-ink/55">
            Step {String(step + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
          </span>
          <div className="h-[1.5px] flex-1 bg-ink/20">
            <div
              className="h-full bg-cobalt transition-all duration-500"
              style={{ width: `${filled}%` }}
            />
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[560px] flex-1 px-6 pb-24 pt-14 sm:pt-20">{children}</main>
    </div>
  );
}