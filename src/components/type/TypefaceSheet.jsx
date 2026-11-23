const LINES = [
  ["Upper", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
  ["Lower", "abcdefghijklmnopqrstuvwxyz"],
  ["Figures", "0123456789 $£€ %&@"],
  ["Marks", ".,:;!? ' \" ( ) [ ] / & §"],
];

const SIZES = [
  ["54", "The chapter is the thing."],
  ["32", "A friend starts it. The person approves it."],
  ["19", "Because she reads until midnight and never bought herself a light."],
  ["13", "Four faces: regular, italic, bold, bold italic."],
];

/** The face on its own, before it is asked to carry a page. */
export default function TypefaceSheet() {
  return (
    <section className="spec-type mt-7">
      <header className="spec-sheet-head">
        <span className="spec-mono">The face · Raw Serif</span>
        <span className="spec-mono opacity-55">Regular · Italic · Bold · Bold italic</span>
      </header>

      <p className="spec-glyphs mt-8 text-[clamp(46px,9vw,104px)] leading-[0.95]">
        Aa Bb Cc
      </p>

      <div className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
        {LINES.map(([label, glyphs]) => (
          <div key={label} className="flex gap-4 border-t border-ink/25 pt-2">
            <span className="spec-mono w-[64px] shrink-0 opacity-50">{label}</span>
            <span className="spec-glyphs text-[19px] leading-[1.4]">{glyphs}</span>
          </div>
        ))}
      </div>

      <div className="mt-9 space-y-3">
        {SIZES.map(([size, line]) => (
          <div key={size} className="flex items-baseline gap-4">
            <span className="spec-mono w-[36px] shrink-0 opacity-45">{size}</span>
            <p
              className="spec-glyphs"
              style={{ fontSize: `${size}px`, lineHeight: size === "13" ? 1.5 : 1.15 }}
            >
              {line}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-9 grid gap-4 border-t border-ink pt-5 sm:grid-cols-3">
        <p className="spec-glyphs text-[22px] italic">Italic, for the aside.</p>
        <p className="spec-glyphs text-[22px] font-bold">Bold, for the name.</p>
        <p className="spec-glyphs text-[22px] font-bold italic">Bold italic, for both.</p>
      </div>
    </section>
  );
}