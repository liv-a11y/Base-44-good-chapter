import { Body, Label, Slide, So, Spec, Title } from "@/components/deck/DeckParts";

const SEGMENTS = [
  {
    name: "Home",
    size: "$160M",
    events: "2.4M events a year",
    line: "First place bought alone, the move after a divorce, the first apartment at 50. The cleanest test of the mechanic, and where the pilot starts.",
  },
  {
    name: "Health and recovery",
    size: "$135M",
    events: "2.0M events a year",
    line: "No diagnosis or health details collected. Peer initiated, privacy first.",
  },
  {
    name: "Family and work",
    size: "$155M",
    events: "2.3M events a year",
    line: "Adoption, a solo baby, a degree at 40, a new practice. Institutions mark these. Nobody gives the friends a way in.",
  },
];

const MATH = [
  ["Events per year", "2.0M", "6.7M", "More of them, with no convention yet."],
  ["Registry adoption", "Near universal", "5%", "A century of convention. The whole company."],
  ["Guests", "115", "12", "Structural. There is no reception."],
  ["Gift rate", "75%", "40%", "Obligation against affection. Closes as the norm sets."],
  ["Average gift", "$125", "$70", "Closes with co-branded editions."],
  ["Gift volume", "~$21B", "$113M", "The bet is the adoption row, not this one."],
];

const CHANNELS = [
  {
    name: "Realtors",
    note: "First channel",
    line: "The agent opts in and pays for a bundle of practical basics. The buyer names one friend, and the friend starts the chapter.",
  },
  {
    name: "Employers",
    note: "People teams",
    line: "A teammate starts one for good news. The employee approves it privately.",
  },
  {
    name: "Benefits platforms",
    note: "Associations",
    line: "A member perk. A friend starts it, colleagues give, the member approves.",
  },
  {
    name: "Brand collaborations",
    note: "Editions",
    line: "An exclusive edition is the promotion. Their audience becomes starters.",
  },
];

const REALTOR_POINTS = [
  ["01", "Their name travels", "The friend sends the invitation, and it names the agent who made it happen."],
  ["02", "Useful", "Not a mug with a logo. A settle-in bundle of practical basics for the first week, plus one gift chosen for the person."],
  ["03", "Low lift", "The agent adds a client. The client names one friend, who starts it. We do the thinking, the invite and the follow-up."],
  ["04", "Already budgeted", "Agents opt in and pay for the bundle from a closing-gift line they already spend."],
];

export function Market() {
  return (
    <Slide>
      <Label>13 · Serviceable market</Label>
      <Title className="max-w-[70%]">Three segments. One mechanic.</Title>
      <div className="grid grid-cols-3 gap-[2.6cqi]">
        {SEGMENTS.map((row) => (
          <div key={row.name} className="border-t border-ink pt-[1.1cqi]">
            <Spec>{row.name}</Spec>
            <p className="deck-big font-heading text-clay">{row.size}</p>
            <Spec className="mt-[0.5cqi] opacity-60">{row.events}</Spec>
            <Body className="mt-[0.9cqi] text-[1.25cqi] opacity-80">{row.line}</Body>
          </div>
        ))}
      </div>
      <So>Home is the cleanest test. The rest uses the same mechanic.</So>
    </Slide>
  );
}

export function Math() {
  return (
    <Slide>
      <Label>14 · The math</Label>
      <Title className="max-w-[70%]">The gap between the columns is the company.</Title>
      <div>
        <div className="grid grid-cols-[1fr_0.7fr_0.7fr_1.15fr] gap-[1.4cqi] border-t border-ink py-[0.65cqi]">
          <Spec className="opacity-55">Same formula</Spec>
          <Spec className="opacity-55">Weddings</Spec>
          <Spec className="opacity-55">Chapters</Spec>
          <Spec className="opacity-55">The gap</Spec>
        </div>
        {MATH.map(([label, weddings, chapters, gap]) => (
          <div
            key={label}
            className="grid grid-cols-[1fr_0.7fr_0.7fr_1.15fr] items-baseline gap-[1.4cqi] border-t border-ink/20 py-[0.65cqi]"
          >
            <Body className="text-[1.28cqi] font-semibold">{label}</Body>
            <Spec className="opacity-60">{weddings}</Spec>
            <Spec className="text-cobalt">{chapters}</Spec>
            <Body className="text-[1.18cqi] opacity-75">{gap}</Body>
          </div>
        ))}
      </div>
      <So>Each point of adoption is about $22M in gift volume.</So>
    </Slide>
  );
}

export function Distribution() {
  return (
    <Slide>
      <Label>16 · How it reaches people</Label>
      <Title className="max-w-[78%]">
        Partners find the first friend. The person never has to ask.
      </Title>
      <div className="grid grid-cols-4 gap-[2cqi]">
        {CHANNELS.map((row) => (
          <div key={row.name} className="border-t border-ink pt-[1cqi]">
            <Body className="text-[1.35cqi] font-semibold">{row.name}</Body>
            <Spec className="mt-[0.35cqi] text-clay">{row.note}</Spec>
            <Body className="mt-[0.7cqi] text-[1.2cqi] opacity-80">{row.line}</Body>
          </div>
        ))}
      </div>
      <So>Partners find the first friend. Guests start the next one.</So>
    </Slide>
  );
}

export function Realtors() {
  return (
    <Slide>
      <Label>17 · Why realtors say yes</Label>
      <Title className="max-w-[64%]">Their name travels. The lift is low.</Title>
      <div className="grid grid-cols-2 gap-x-[3cqi]">
        {REALTOR_POINTS.map(([n, head, line]) => (
          <div key={n} className="flex gap-[1.2cqi] border-t border-ink/25 py-[1cqi]">
            <Spec className="text-cobalt">{n}</Spec>
            <div>
              <Body className="text-[1.35cqi] font-semibold">{head}</Body>
              <Body className="mt-[0.35cqi] text-[1.22cqi] opacity-80">{line}</Body>
            </div>
          </div>
        ))}
      </div>
      <So>The agent brings a name. We do the work.</So>
    </Slide>
  );
}