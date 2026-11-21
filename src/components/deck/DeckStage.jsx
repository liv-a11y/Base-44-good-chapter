import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { slides } from "@/components/deck/slides/index";

export default function DeckStage() {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const move = (step) =>
    setIndex((current) => Math.min(total - 1, Math.max(0, current + step)));

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        move(1);
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        move(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Current = slides[index].component;
  const progress = ((index + 1) / total) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <header className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-8">
        <div className="flex items-baseline gap-4">
          <span className="font-heading text-[18px] text-plaster">Good Chapter Co.</span>
          <span className="gc-label text-plaster/55">Investor deck</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="gc-spec text-plaster/55">
            {String(index + 1).padStart(2, "0")} / {total}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={index === 0}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center border border-plaster/30 text-plaster transition-colors hover:bg-plaster hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-plaster"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={index === total - 1}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center border border-plaster/30 text-plaster transition-colors hover:bg-plaster hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-plaster"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <Link to="/" className="gc-label text-plaster/55 hover:text-plaster">
            Leave
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-3 pb-4 md:px-8">
        <div className="deck-frame">
          <Current />
        </div>
      </main>

      <footer className="px-5 pb-5 md:px-8">
        <div className="h-px w-full bg-plaster/20">
          <div className="h-px bg-clay transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="gc-spec mt-2 text-plaster/45">{slides[index].name}</p>
      </footer>
    </div>
  );
}