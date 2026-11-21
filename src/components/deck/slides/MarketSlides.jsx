import { Figure, Mast, Note, Slide, Small, So, Statement } from "@/components/deck/DeckParts";

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
      <Mast label="13 · Serviceable market" index="11 / 18" />
      <div className="grid grid-cols-12 gap-x-[2.4cqi]">
        <div className="col-span-3">
          <Statement>Three segments. One mechanic.</Statement>
        </div>
        {SEGMENTS.map((row) => (
          <div key={row.name} className="col-span-3 dk-col">
            <span className="dk-kicker dk-accent">{row.name}</span>
            <Figure size="lg" className="mt-[0.7cqi]">
              {row.size}
            </Figure>
            <Note className="mt-[0.5cqi] opacity-60">{row.events}</Note>
            <Small className="mt-[0.8cqi] opacity-80">{row.line}</Small>
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
      <Mast label="14 · The math" index="12 / 18" />
      <div>
        <Statement className="max-w-[74%]">The gap between the columns is the company.</Statement>
        <table className="dk-table mt-[1.8cqi]">
          <thead>
            <tr>
              <th>Same formula</th>
              <th className="text-right">Weddings</th>
              <th className="text-right">Chapters</th>
              <th>The gap</th>
            </tr>
          </thead>
          <tbody>
            {MATH.map(([label, weddings, chapters, gap]) => (
              <tr key={label}>
                <td className="dk-hang">
                  <span className="font-semibold">{label}</span>
                </td>
                <td className="dk-n opacity-60">{weddings}</td>
                <td className="dk-n dk-accent">{chapters}</td>
                <td>{gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <So>Each point of adoption is about $22M in gift volume.</So>
    </Slide>
  );
}

export function Distribution() {
  return (
    <Slide>
      <Mast label="16 · How it reaches people" index="13 / 18" />
      <div>
        <Statement className="max-w-[80%]">
          Partners find the first friend. The person never has to ask.
        </Statement>
        <div className="mt-[2cqi] grid grid-cols-12 gap-x-[2.4cqi]">
          {CHANNELS.map((row) => (
            <div key={row.name} className="col-span-3 dk-col">
              <Statement size="xs">{row.name}</Statement>
              <span className="dk-kicker dk-accent mt-[0.5cqi] inline-block">{row.note}</span>
              <Small className="mt-[0.7cqi] opacity-80">{row.line}</Small>
            </div>
          ))}
        </div>
      </div>
      <So>Partners find the first friend. Guests start the next one.</So>
    </Slide>
  );
}

export function Realtors() {
  return (
    <Slide>
      <Mast label="17 · Why realtors say yes" index="14 / 18" />
      <div>
        <Statement className="max-w-[70%]">Their name travels. The lift is low.</Statement>
        <div className="mt-[2cqi] grid grid-cols-12 gap-x-[2.4cqi]">
          {REALTOR_POINTS.map(([n, head, line]) => (
            <div key={n} className="col-span-3 dk-col">
              <Note className="dk-accent">{n}</Note>
              <Statement size="xs" className="mt-[0.4cqi]">
                {head}
              </Statement>
              <Small className="mt-[0.6cqi] opacity-80">{line}</Small>
            </div>
          ))}
        </div>
      </div>
      <So>The agent brings a name. We do the work.</So>
    </Slide>
  );
}