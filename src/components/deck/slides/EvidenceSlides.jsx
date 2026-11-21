import { Figure, Mast, Note, Slide, Small, So, Square, Statement } from "@/components/deck/DeckParts";

const REASONS = [
  {
    n: "01",
    head: "The ask",
    figure: "2×",
    line: "the asks people expected to need. Helpers were happier than anyone guessed.",
    source: "Flynn & Bohns 2008 · Zhao & Epley 2022",
  },
  {
    n: "02",
    head: "The container",
    figure: "0",
    line: "A text has nowhere to go. No list, no approval, no record. Let me know dies in the group chat.",
    source: "Today's default: a group text and a Venmo pool",
  },
  {
    n: "03",
    head: "The moment",
    figure: "+3.5",
    line: "Being remembered landed at 3.5 for recipients, against 2.7 guessed by givers.",
    source: "Kumar & Epley 2022",
  },
  {
    n: "04",
    head: "The gift",
    figure: "~50%",
    line: "Close friends skip the housewarming registry about half the time. A list she writes misses the people who know her best.",
    source: "Ward & Broniarczyk 2016 · Gino & Flynn 2011",
  },
];

const ASKED = [
  ["Nonprofit executive", "Watches a crowd give every day, because someone else did the asking."],
  ["Realtor and broker", "Is in the room the day the keys change hands, before anyone else knows."],
  ["Friends and family", "The people who would actually start one, and the ones who'd be on the list."],
  ["BD, nonprofit funding platform", "Knows how giving travels between people without ever feeling like a pitch."],
];

const STEPS = [
  {
    n: "01",
    head: "A friend starts",
    line: "Picks the chapter, answers five quick questions about the person, names who should hear. Names and emails stay private.",
  },
  {
    n: "02",
    head: "The person decides",
    line: "Keeps, cuts, adds. Two approvals. The friend never sees the edits.",
  },
  {
    n: "03",
    head: "Guests give",
    line: "Sent from the friend. Never the person. One reminder, then silence.",
  },
];

export function WhyItWorks() {
  return (
    <Slide>
      <Mast label="04 · Why it works" index="04 / 18" />
      <div>
        <Statement className="max-w-[84%]">
          The people who love you are waiting for a way in.
        </Statement>
        <div className="mt-[2cqi] grid grid-cols-12 gap-x-[2.4cqi]">
          {REASONS.map((row) => (
            <div key={row.n} className="col-span-3 dk-col">
              <div className="flex items-center gap-[0.7cqi]">
                <Square />
                <Note>
                  <span className="dk-accent">{row.n}</span> {row.head}
                </Note>
              </div>
              <Figure className="mt-[0.8cqi]">{row.figure}</Figure>
              <Small className="mt-[0.7cqi] opacity-80">{row.line}</Small>
              <Note className="mt-[0.6cqi] opacity-45">{row.source}</Note>
            </div>
          ))}
        </div>
      </div>
      <So>A friend brings the surprise. The person keeps the say.</So>
    </Slide>
  );
}

export function WhatWeHeard() {
  return (
    <Slide tone="flip">
      <Mast label="05 · What we heard" index="05 / 18" />
      <div className="grid grid-cols-12 gap-x-[2.4cqi]">
        <div className="col-span-8">
          <Note className="opacity-65">Early conversations, not a survey</Note>
          <p className="dk-quote mt-[1.2cqi]">
            I feel like it's a real need. In our work, we see how powerful it can be when a
            community comes together to support someone in a personal, meaningful way. There are
            people who may never get married and don't otherwise get that level of support or
            opportunity, so I think that need totally exists.
          </p>
          <Note className="mt-[1.2cqi]">Nonprofit executive</Note>
        </div>
        <div className="col-span-4 dk-col">
          {ASKED.map(([who, why]) => (
            <div key={who} className="dk-row">
              <span className="dk-kicker dk-accent">{who}</span>
              <Small className="mt-[0.4cqi] opacity-75">{why}</Small>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

export function Mechanic() {
  return (
    <Slide>
      <Mast label="07 · The mechanic" index="06 / 18" />
      <div className="grid grid-cols-12 gap-x-[2.4cqi]">
        <div className="col-span-3">
          <Statement>A friend starts it. The person approves it. Nobody asks.</Statement>
        </div>
        {STEPS.map((row) => (
          <div key={row.n} className="col-span-3 dk-col">
            <Figure size="lg">{row.n}</Figure>
            <Statement size="xs" className="mt-[0.7cqi]">
              {row.head}
            </Statement>
            <Small className="mt-[0.6cqi] opacity-80">{row.line}</Small>
          </div>
        ))}
      </div>
      <So>Two approvals. Zero messages from the person.</So>
    </Slide>
  );
}