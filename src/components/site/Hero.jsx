import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const TITLE = "a chapter nobody thought to plan for.";

const DRAWINGS = [
  {
    src: "https://goodchaptercollective.com/brand/mugs-burgundy.png",
    alt: "Drawing of two mugs.",
    modifier: "gc-hero-photo--1",
  },
  {
    src: "https://goodchaptercollective.com/brand/toaster-burgundy.png",
    alt: "Drawing of a toaster with two slices of toast.",
    modifier: "gc-hero-photo--2",
  },
  {
    src: "https://goodchaptercollective.com/brand/blanket-burgundy.png",
    alt: "Drawing of a folded blanket.",
    modifier: "gc-hero-photo--3",
  },
];

function RippleTitle() {
  let index = 0;
  return TITLE.split("").map((char, i) => {
    if (char === " ") return " ";
    const step = index++;
    return (
      <span key={i} className="gc-letter" style={{ "--gc-i": step }}>
        {char}
      </span>
    );
  });
}

export default function Hero() {
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section aria-label="Good Chapter Co." className={`gc-hero ${anim ? "gc-hero-anim" : ""}`}>
      <div className="gc-hero-inner">
        <div className="gc-hero-head">
          <h1 className="gc-hero-title">
            <RippleTitle />
          </h1>
          <p className="gc-hero-sub">
            A friend starts it. Eight things are chosen by a person, not a catalog. Nothing reaches
            anyone until the person it is for says yes.
          </p>
          <div className="gc-hero-cta">
            <Link to="/start" className="gc-btn">
              <span className="gc-btn-label">Start a chapter</span>
              <span className="gc-btn-arrow" aria-hidden="true">
                <ArrowRight size={17} strokeWidth={1.6} />
              </span>
            </Link>
          </div>
        </div>

        <div className="gc-hero-gallery">
          {DRAWINGS.map((drawing) => (
            <div key={drawing.src} className={`gc-hero-photo ${drawing.modifier}`}>
              <figure className="gc-hero-frame">
                <Image
                  src={drawing.src}
                  alt={drawing.alt}
                  className="h-full w-full object-contain p-[8%]"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}