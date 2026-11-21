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
  const folio = `${String(index + 1).padStart(2, "0")} / ${total}`;

  return (
    <div className="dk-page flex min-h-screen flex-col">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-graphite/15 px-5 py-3 md:px-9">
        <div className="flex items-baseline gap-4">
          <span className="font-heading text-[18px] leading-none">Good Chapter Co.</span>
          <span className="dk-kicker opacity-55">Investor deck</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="dk-index opacity-60">{folio}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={index === 0}
              aria-label="Previous slide"
              className="dk-btn"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={index === total - 1}
              aria-label="Next slide"
              className="dk-btn"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <Link to="/" className="dk-leave">
            Leave
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center px-3 py-4 md:px-9">
        <div className="dk-frame">
          <Current />
        </div>
      </main>

      <footer className="px-5 pb-5 md:px-9">
        <div className="h-px w-full bg-graphite/15">
          <div className="h-px bg-terracotta transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="dk-index mt-2 opacity-45">{slides[index].name}</p>
      </footer>
    </div>
  );
}