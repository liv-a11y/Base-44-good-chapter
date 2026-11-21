import { Figure, Mast, Note, Slide, Small, So, Statement } from "@/components/deck/DeckParts";
import DeckPhoto from "@/components/deck/DeckPhoto";

const KEY =
  "https://media.base44.com/images/public/6af66f925ddaabe6b3b327a8/7b3708bfa_generated_b5209139.jpg";

const EMAIL = [
  ["From the friend.", "Sent in Jess's name. Replies go straight to her."],
  ["Never from the person.", "Maya approved the list. She never sends it."],
  ["One reminder, then silence.", "Guests who don't open it get one nudge. Nobody gets a second."],
  [
    "And the partner is named.",
    "When a realtor opens the door, the friend's note names them to up to twenty people, the week they move in.",
  ],
];

const BANDS = [
  { count: "3", name: "Easy yes", price: "$25 to $50", line: "Anyone can send one without thinking." },
  { count: "3", name: "Considered", price: "$60 to $120", line: "A close friend or sibling feels good about it." },
  {
    count: "1",
    name: "Group candidate",
    price: "$200 to $400",
    line: "A bigger item friends chip in on. Five people put $50 toward an espresso machine.",
  },
  { count: "1", name: "Practical", price: "$40 to $150", line: "Everyday use over decoration." },
];

const CHAPTERS = [
  "First Place",
  "Moving In",
  "Starting Over",
  "Fresh Start",
  "New Baby, Solo",
  "Adoption and Foster",
  "New Work",
  "Sobriety",
  "Recovery",
  "Healing",
  "Off Script",
];

const ROWS = [
  ["Weddings", "Owned", "The registry is the norm. A century of convention."],
  ["New baby", "Owned", "The shower has a list. The parent authors it."],
  ["Any occasion", "Self-authored", "A catalog you send yourself."],
  ["Meals", "Friend-run", "Casseroles only. No approval."],
  ["First place, starting over, recovery", "No registry", "A card, or a wishlist you send yourself."],
  ["The real default", "A group text and a Venmo pool", "Free, instant, no list, no approval, no follow-up."],
];

const pad = (n) => String(n).padStart(2, "0");

function ChapterRows({ from }) {
  return (
    <table className="dk-table">
      <tbody>
        {CHAPTERS.slice(from).map((name, i) => (
          <tr key={name}>
            <td className="dk-n dk-accent w-[4cqi]">{pad(from + i + 1)}</td>
            <td>{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function GuestEmail() {
  return (
    <Slide>
      <Mast label="09 · What her people receive" index="07 / 18" />
      <div className="grid grid-cols-12 gap-x-[2.4cqi]">
        <div className="col-span-6">
          <Statement>A note from a friend. Never an ask from her.</Statement>
          <Statement size="xs" className="mt-[1.2cqi] opacity-65">
            The invitation is the whole product surface a guest ever sees.
          </Statement>
        </div>
        {[EMAIL.slice(0, 2), EMAIL.slice(2)].map((group) => (
          <div key={group[0][0]} className="col-span-3 dk-col">
            {group.map(([head, line]) => (
              <div key={head} className="dk-row">
                <Small className="font-semibold">{head}</Small>
                <Small className="mt-[0.35cqi] opacity-75">{line}</Small>
              </div>
            ))}
          </div>
        ))}
      </div>
      <So>Up to twenty people see who started it. Nobody hears her ask.</So>
    </Slide>
  );
}

export function Product() {
  return (
    <Slide>
      <Mast label="10 · The product" index="08 / 18" />
      <div>
        <Statement className="max-w-[66%]">Eight items. Four price bands. One reason each.</Statement>
        <div className="mt-[2cqi] grid grid-cols-12 gap-x-[2.4cqi]">
          {BANDS.map((band) => (
            <div key={band.name} className="col-span-3 dk-col">
              <Figure size="lg">{band.count}</Figure>
              <Statement size="xs" className="mt-[0.5cqi]">
                {band.name}
              </Statement>
              <Note className="mt-[0.5cqi]">{band.price}</Note>
              <Small className="mt-[0.6cqi] opacity-80">{band.line}</Small>
            </div>
          ))}
        </div>
      </div>
      <So>A guest can choose in five minutes. The person can remove anything.</So>
    </Slide>
  );
}

export function Chapters() {
  return (
    <Slide>
      <Mast label="11 · Occasions" index="09 / 18" />
      <div className="grid grid-cols-12 gap-x-[2.4cqi]">
        <div className="col-span-5">
          <Statement>Choose your chapter.</Statement>
          <Small className="mt-[1.2cqi] opacity-80">
            Every occasion where love wants to show up, but the person would never ask for
            themselves.
          </Small>
          <div className="mt-[1.4cqi] bg-terracotta px-[1.3cqi] py-[1.1cqi] text-bone">
            <span className="dk-kicker">By design</span>
            <Small className="mt-[0.4cqi]">
              No weddings. Weddings and babies have registries. Everything else got a card.
            </Small>
          </div>
        </div>
        <div className="col-span-4 dk-col">
          <ChapterRows from={0} />
        </div>
        <div className="col-span-3 dk-col">
          <DeckPhoto src={KEY} alt="A house key on an envelope" className="h-[15cqi]" />
          <div className="mt-[1cqi]">
            <ChapterRows from={6} />
          </div>
        </div>
      </div>
      <So>Start with home. Health chapters wait for legal review.</So>
    </Slide>
  );
}

export function Competition() {
  return (
    <Slide>
      <Mast label="12 · Competition" index="10 / 18" />
      <div>
        <Statement className="max-w-[80%]">
          The big registries serve two days. Everything else gets a group text.
        </Statement>
        <table className="dk-table mt-[1.8cqi]">
          <thead>
            <tr>
              <th>Occasion</th>
              <th>Who runs it</th>
              <th>What exists today</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([occasion, who, what]) => (
              <tr key={occasion}>
                <td className="dk-hang">
                  <span className="font-semibold">{occasion}</span>
                </td>
                <td>
                  <span className={who === "No registry" ? "dk-kicker dk-accent" : "dk-kicker opacity-70"}>
                    {who}
                  </span>
                </td>
                <td>{what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <So>Two occasions have a registry. None has an approval step.</So>
    </Slide>
  );
}