import { Body, Label, Slide, So, Spec, Sub, Title } from "@/components/deck/DeckParts";

const HISTORY = [
  {
    year: "1924",
    who: "Marshall Field's, Chicago",
    what: "Couples list china, silver and crystal so their people can help set up a household.",
  },
  {
    year: "1993",
    who: "Target",
    what: "The first electronic self-service registry. The list moves to a scanner gun.",
  },
  {
    year: "2000s",
    who: "The web",
    what: "Registries go online and add babies and honeymoons. Each one still waits for a sanctioned milestone.",
  },
  {
    year: "Today",
    who: "Zola · The Knot · Amazon",
    what: "Up to $21B a year in wedding gifts. A hundred years in, still for one day.",
  },
];

export function Cover() {
  return (
    <Slide className="justify-between">
      <div className="flex items-start justify-between">
        <Label>Good Chapter Co. · Investor deck</Label>
        <Label className="text-clay">Q1 2027</Label>
      </div>
      <div className="max-w-[78%]">
        <h1 className="deck-cover font-heading">
          The registry was built for a woman leaving her father's house for her husband's.
        </h1>
        <p className="deck-cover-2 font-heading">
          We built one for <span className="deck-mark">everything else she does.</span>
        </p>
      </div>
      <Spec className="opacity-70">liv@goodchaptercollective.com</Spec>
    </Slide>
  );
}

export function History() {
  return (
    <Slide>
      <Label>02 · Where the registry started</Label>
      <div className="grid grid-cols-[1fr_1.05fr] items-start gap-[4.5cqi]">
        <div>
          <Title>For a hundred years, the registry has been how people show up.</Title>
          <Sub className="mt-[1.8cqi]">It has only ever opened for a wedding or a baby.</Sub>
        </div>
        <div>
          {HISTORY.map((row) => (
            <div
              key={row.year}
              className="grid grid-cols-[8.5cqi_1fr] gap-[1.6cqi] border-t border-ink/25 py-[1.25cqi]"
            >
              <Spec className="text-cobalt">{row.year}</Spec>
              <div>
                <Body className="text-[1.4cqi] font-semibold">{row.who}</Body>
                <Body className="mt-[0.35cqi] text-[1.35cqi] opacity-80">{row.what}</Body>
              </div>
            </div>
          ))}
        </div>
      </div>
      <So>A century of registry innovation, and it still serves one day.</So>
    </Slide>
  );
}

export function Problem() {
  return (
    <Slide>
      <Label>03 · The problem</Label>
      <div className="grid grid-cols-[1.05fr_0.95fr] items-start gap-[3.5cqi]">
        <div>
          <Title>The offer is always real. The answer never comes.</Title>
          <Body className="mt-[1.8cqi]">
            Maya Ellison (illustrative), 34, bought a house alone. No shower, no party. Every
            friend offered help and meant it.
          </Body>
          <Body className="mt-[1cqi] opacity-80">
            She needed a lamp. Saying so would turn affection into an invoice. The person who
            needs help is the one who has to name it, and naming it is the cost nobody pays.
          </Body>
        </div>
        <div className="border border-ink/60 bg-paper px-[1.9cqi] py-[1.7cqi]">
          <Spec className="opacity-60">Tue 7:42 PM</Spec>
          <div className="mt-[1.5cqi] max-w-[85%] border border-ink/30 bg-plaster px-[1.2cqi] py-[0.9cqi]">
            <Body className="text-[1.32cqi]">Congrats on the house!! LMK if I can do anything</Body>
          </div>
          <div className="mt-[0.9cqi] ml-auto max-w-[70%] bg-ink px-[1.2cqi] py-[0.9cqi] text-plaster">
            <Body className="text-[1.32cqi]">Sure, thank you so much</Body>
          </div>
          <Spec className="mt-[1.2cqi] text-clay">Read 3 weeks later</Spec>
        </div>
      </div>
      <So>The problem is not wanting help. It is asking for it.</So>
    </Slide>
  );
}