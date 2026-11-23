import { SAMPLE } from "@/components/type/treatments";

/** One treatment: the same page, set in one face combination. */
export default function SpecimenSheet({ index, treatment }) {
  const n = String(index + 1).padStart(2, "0");

  return (
    <article className="spec-sheet" style={treatment.vars}>
      <header className="spec-sheet-head">
        <span className="spec-mono">
          {n} · {treatment.name}
        </span>
        <span className="spec-mono opacity-55">{treatment.note}</span>
      </header>

      <div className="mt-8 grid gap-9 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-10">
        <div>
          <p className="spec-kicker opacity-65">{SAMPLE.kicker}</p>
          <h2 className="spec-head mt-5">{SAMPLE.head}</h2>
          <p className="spec-lede mt-6 max-w-[34rem]">{SAMPLE.lede}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <span className="gc-btn spec-btn">
              <span className="gc-btn-label">{SAMPLE.cta}</span>
            </span>
            <span className="spec-lede underline underline-offset-[6px]">{SAMPLE.ctaAlt}</span>
          </div>
        </div>

        <div className="border-t border-ink pt-6 md:border-l md:border-t-0 md:pl-9 md:pt-0">
          <blockquote className="spec-quote">{SAMPLE.quote}</blockquote>
          <div className="mt-7 border-t border-ink pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="spec-item-name">{SAMPLE.itemName}</span>
              <span className="spec-mono">{SAMPLE.itemPrice}</span>
            </div>
            <p className="spec-item-why mt-2 opacity-80">{SAMPLE.itemWhy}</p>
            <p className="spec-mono mt-3 opacity-45">{SAMPLE.itemSource}</p>
          </div>
        </div>
      </div>
    </article>
  );
}