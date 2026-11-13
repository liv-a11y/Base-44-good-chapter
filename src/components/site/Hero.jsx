import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const TITLE = "A chapter nobody thought to plan for.";

const PHOTOS = [
  {
    src: "https://media.base44.com/images/public/6af66f925ddaabe6b3b327a8/6f0d6760c_generated_image.png",
    alt: "A hand thrown stoneware bowl on a plaster surface",
    modifier: "gc-hero-photo--1",
  },
  {
    src: "https://media.base44.com/images/public/6af66f925ddaabe6b3b327a8/daef5a4c4_generated_image.png",
    alt: "A folded linen throw with a green stripe",
    modifier: "gc-hero-photo--2",
  },
  {
    src: "https://media.base44.com/images/public/6af66f925ddaabe6b3b327a8/74f69bf17_generated_image.png",
    alt: "A brass reading lamp beside a clothbound book",
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
    <section aria-label="Good Chapter" className={`gc-hero ${anim ? "gc-hero-anim" : ""}`}>
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
          {PHOTOS.map((photo) => (
            <div key={photo.src} className={`gc-hero-photo ${photo.modifier}`}>
              <figure className="gc-hero-frame">
                <Image src={photo.src} alt={photo.alt} className="h-full w-full" />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}