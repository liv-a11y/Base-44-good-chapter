const STEPS = [
  {
    number: "No. 01",
    title: "A friend starts it.",
    body: "They notice the chapter. The first apartment, the fresh start, the move nobody threw a party for.",
  },
  {
    number: "No. 02",
    title: "The person approves it.",
    body: "In private. Keep what fits, swap what does not. Nothing goes out until they say so.",
  },
  {
    number: "No. 03",
    title: "Their people show up.",
    body: "Each guest picks one real object. Nobody doubles up. Nobody sees who gave what.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-ink">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-28">
        <p className="gc-label text-ink/65">How a chapter works</p>
        <h2 className="mt-5 max-w-3xl text-[34px] leading-[1.04] sm:text-[52px]">
          no list to write. no asking for yourself.
        </h2>

        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.number} className="border-t border-ink pt-5">
              <span className="gc-spec uppercase text-ink/60">{step.number}</span>
              <h3 className="mt-3 text-[28px] leading-[1.1]">{step.title}</h3>
              <p className="mt-3 text-[18px] leading-[1.45] text-ink/85">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}