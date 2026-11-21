import { Body, Label, Slide, So, Spec, Title } from "@/components/deck/DeckParts";

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
      <Label>04 · Why it works</Label>
      <Title className="max-w-[72%]">The people who love you are waiting for a way in.</Title>
      <div className="grid grid-cols-2 gap-x-[3.5cqi]">
        {REASONS.map((row) => (
          <div key={row.n} className="border-t border-ink/25 py-[1.3cqi]">
            <div className="flex items-baseline gap-[1.2cqi]">
              <Spec className="text-clay">{row.n}</Spec>
              <Spec>{row.head}</Spec>
              <span className="deck-figure ml-auto font-heading">{row.figure}</span>
            </div>
            <Body className="mt-[0.7cqi] text-[1.35cqi] opacity-85">{row.line}</Body>
            <Spec className="mt-[0.5cqi] opacity-45">{row.source}</Spec>
          </div>
        ))}
      </div>
      <So>A friend brings the surprise. The person keeps the say.</So>
    </Slide>
  );
}

export function WhatWeHeard() {
  return (
    <Slide tone="clay">
      <div className="flex items-start justify-between">
        <Label>05 · What we heard</Label>
        <Label className="opacity-70">Early conversations, not a survey</Label>
      </div>
      <div className="max-w-[84%]">
        <p className="deck-quote font-heading">
          I feel like it's a real need. In our work, we see how powerful it can be when a
          community comes together to support someone in a personal, meaningful way. There are
          people who may never get married and don't otherwise get that level of support or
          opportunity, so I think that need totally exists.
        </p>
        <Spec className="mt-[1.4cqi]">Nonprofit executive</Spec>
      </div>
      <div className="grid grid-cols-4 gap-[2cqi] border-t border-plaster/35 pt-[1.4cqi]">
        {ASKED.map(([who, why]) => (
          <div key={who}>
            <Spec className="opacity-95">{who}</Spec>
            <Body className="mt-[0.4cqi] text-[1.2cqi] opacity-70">{why}</Body>
          </div>
        ))}
      </div>
    </Slide>
  );
}

export function Mechanic() {
  return (
    <Slide>
      <Label>07 · The mechanic</Label>
      <Title className="max-w-[76%]">A friend starts it. The person approves it. Nobody asks.</Title>
      <div className="grid grid-cols-3 gap-[2.6cqi]">
        {STEPS.map((row) => (
          <div key={row.n} className="border-t border-ink pt-[1.2cqi]">
            <span className="deck-figure font-heading text-cobalt">{row.n}</span>
            <Body className="mt-[0.8cqi] text-[1.55cqi] font-semibold">{row.head}</Body>
            <Body className="mt-[0.6cqi] text-[1.32cqi] opacity-80">{row.line}</Body>
          </div>
        ))}
      </div>
      <So>Two approvals. Zero messages from the person.</So>
    </Slide>
  );
}