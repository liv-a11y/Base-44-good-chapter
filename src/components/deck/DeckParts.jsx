import { cn } from "@/lib/utils";

/** One sheet: bone ground, generous margin, content on a twelve column grid. */
export function Slide({ children, className, tone = "bone" }) {
  return (
    <section className={cn("dk-slide", tone === "flip" && "dk-slide--flip", className)}>
      <div className="dk-inner">{children}</div>
    </section>
  );
}

/** Small caps kicker, mono folio, and the rule that draws across between them. */
export function Mast({ label, index }) {
  return (
    <div className="dk-mast">
      <span className="dk-kicker">{label}</span>
      <span className="dk-index">{index}</span>
    </div>
  );
}

export function Statement({ children, className, size = "lg" }) {
  return (
    <h2
      className={cn(
        "dk-statement",
        size === "sm" && "dk-statement--sm",
        size === "xs" && "dk-statement--xs",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Lede({ children, className }) {
  return <p className={cn("dk-lede", className)}>{children}</p>;
}

export function Small({ children, className }) {
  return <p className={cn("dk-small", className)}>{children}</p>;
}

export function Note({ children, className }) {
  return <p className={cn("dk-note", className)}>{children}</p>;
}

/** The one number a slide turns on. */
export function Figure({ children, className, size = "md" }) {
  const sizes = {
    sm: "dk-figure--sm",
    md: "dk-figure--md",
    lg: "dk-figure--lg",
    huge: "dk-figure--huge",
  };
  return <p className={cn("dk-figure", sizes[size], className)}>{children}</p>;
}

/** The single terracotta square: it marks the figure the slide turns on. */
export function Square({ className }) {
  return <span aria-hidden="true" className={cn("dk-square", className)} />;
}

export function So({ children }) {
  return (
    <div className="dk-so">
      <span className="dk-kicker dk-accent">So</span>
      <span className="dk-so-text">{children}</span>
    </div>
  );
}