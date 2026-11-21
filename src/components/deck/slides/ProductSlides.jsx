import { Body, Label, Slide, So, Spec, Title } from "@/components/deck/DeckParts";

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

export function GuestEmail() {
  return (
    <Slide>
      <Label>09 · What her people receive</Label>
      <div className="grid grid-cols-[0.9fr_1.1fr] items-start gap-[3.5cqi]">
        <div>
          <Title>A note from a friend. Never an ask from her.</Title>
          <Body className="mt-[1.6cqi] opacity-80">
            The invitation is the whole product surface a guest ever sees.
          </Body>
        </div>
        <div>
          {EMAIL.map(([head, line]) => (
            <div key={head} className="border-t border-ink/25 py-[1.1cqi]">
              <Body className="text-[1.45cqi] font-semibold">{head}</Body>
              <Body className="mt-[0.35cqi] text-[1.3cqi] opacity-80">{line}</Body>
            </div>
          ))}
        </div>
      </div>
      <So>Up to twenty people see who started it. Nobody hears her ask.</So>
    </Slide>
  );
}

export function Product() {
  return (
    <Slide>
      <Label>10 · The product</Label>
      <Title className="max-w-[70%]">Eight items. Four price bands. One reason each.</Title>
      <div className="grid grid-cols-4 gap-[2.2cqi]">
        {BANDS.map((band) => (
          <div key={band.name} className="border-t border-ink pt-[1.1cqi]">
            <span className="deck-figure font-heading text-clay">{band.count}</span>
            <Body className="mt-[0.6cqi] text-[1.4cqi] font-semibold">{band.name}</Body>
            <Spec className="mt-[0.4cqi]">{band.price}</Spec>
            <Body className="mt-[0.6cqi] text-[1.25cqi] opacity-80">{band.line}</Body>
          </div>
        ))}
      </div>
      <So>A guest can choose in five minutes. The person can remove anything.</So>
    </Slide>
  );
}

export function Chapters() {
  return (
    <Slide>
      <Label>11 · Occasions</Label>
      <div className="grid grid-cols-[1.1fr_0.9fr] items-start gap-[3.5cqi]">
        <div>
          <Title className="deck-title-sm">Choose your chapter.</Title>
          <Body className="mt-[1.2cqi] opacity-80">
            Every occasion where love wants to show up, but the person would never ask for
            themselves.
          </Body>
          <div className="mt-[1.6cqi] border border-ink bg-clay px-[1.5cqi] py-[1.2cqi] text-plaster">
            <Spec>By design</Spec>
            <Body className="mt-[0.4cqi] text-[1.35cqi]">
              No weddings. Weddings and babies have registries. Everything else got a card.
            </Body>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-[1.6cqi]">
          {CHAPTERS.map((name, i) => (
            <div
              key={name}
              className="flex items-baseline gap-[0.8cqi] border-t border-ink/25 py-[0.75cqi]"
            >
              <Spec className="text-cobalt">{String(i + 1).padStart(2, "0")}</Spec>
              <Body className="text-[1.3cqi]">{name}</Body>
            </div>
          ))}
        </div>
      </div>
      <So>Start with home. Health chapters wait for legal review.</So>
    </Slide>
  );
}

export function Competition() {
  return (
    <Slide>
      <Label>12 · Competition</Label>
      <Title className="max-w-[76%]">
        The big registries serve two days. Everything else gets a group text.
      </Title>
      <div>
        <div className="grid grid-cols-[1.05fr_0.75fr_1.2fr] gap-[1.6cqi] border-t border-ink py-[0.7cqi]">
          <Spec className="opacity-55">Occasion</Spec>
          <Spec className="opacity-55">Who runs it</Spec>
          <Spec className="opacity-55">What exists today</Spec>
        </div>
        {ROWS.map(([occasion, who, what]) => (
          <div
            key={occasion}
            className="grid grid-cols-[1.05fr_0.75fr_1.2fr] items-baseline gap-[1.6cqi] border-t border-ink/20 py-[0.8cqi]"
          >
            <Body className="text-[1.3cqi] font-semibold">{occasion}</Body>
            <Spec className={who === "No registry" ? "text-clay" : ""}>{who}</Spec>
            <Body className="text-[1.22cqi] opacity-75">{what}</Body>
          </div>
        ))}
      </div>
      <So>Two occasions have a registry. None has an approval step.</So>
    </Slide>
  );
}