import { cn } from "@/lib/utils";

/** One slide: 16:9, plaster ground, ink hairline frame, type sized in cqi. */
export function Slide({ children, className, tone = "plaster" }) {
  return (
    <section
      className={cn(
        "deck-slide border",
        tone === "clay"
          ? "border-plaster/35 bg-clay text-plaster"
          : "border-ink bg-plaster text-ink",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Label({ children, className }) {
  return <p className={cn("deck-label", className)}>{children}</p>;
}

export function Title({ children, className }) {
  return <h2 className={cn("deck-title font-heading", className)}>{children}</h2>;
}

export function Sub({ children, className }) {
  return <p className={cn("deck-sub font-heading", className)}>{children}</p>;
}

export function Body({ children, className }) {
  return <p className={cn("deck-body", className)}>{children}</p>;
}

export function Spec({ children, className }) {
  return <p className={cn("deck-spec", className)}>{children}</p>;
}

/** The one loud line that closes a slide. */
export function So({ children, className }) {
  return (
    <div className={cn("deck-so", className)}>
      <span className="deck-label text-clay">So</span>
      <p className="deck-so-text font-heading">{children}</p>
    </div>
  );
}

export function Rule({ className }) {
  return <div className={cn("deck-hair", className)} />;
}