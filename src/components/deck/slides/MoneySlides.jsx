import { Body, Label, Slide, So, Spec, Title } from "@/components/deck/DeckParts";

const LINES = [
  ["01", "Curated commission", "At launch", "8 to 12% on curated retail. Checkout on our site. Disclosed."],
  ["02", "Wholesale", "Months 6 to 18", "Target 35 to 45%. Led by the $200 anchor gift. Brands drop-ship."],
  ["03", "Good Chapter Editions", "At scale", "Target 50 to 65% on pieces we curate. Fast-turning stock only."],
  ["04", "Partner insights", "At 50 chapters", "Aggregate behavior. No names."],
];

const TIERS = [
  {
    tier: "Tier 1 · Now",
    name: "Curated commission",
    take: "$34",
    margin: "8 to 12%",
    anchor: "$54",
    risk: "None. No stock.",
  },
  {
    tier: "Tier 2 · Months 6 to 18",
    name: "Wholesale and drop-ship",
    take: "$118 to $151",
    margin: "35 to 45% (target)",
    anchor: "$188 to $241",
    risk: "None. Brands hold stock.",
  },
  {
    tier: "Tier 3 · At scale",
    name: "Good Chapter Editions",
    take: "$168 to $218",
    margin: "50 to 65% (target)",
    anchor: "$268 to $348",
    risk: "Low to medium. Fast-turning SKUs only.",
  },
];

const WHERE = [
  "Incorporated as a C corp.",
  "The Good Chapter trademark is in process.",
  "The site is live with a private pilot list.",
  "V1 sells on curated commission. Shopify Collective drop-ship and Merit Goods come next.",
  "No concierge chapter has run yet.",
];

const PROVES = [
  "A person says yes to a chapter.",
  "Guests actually give.",
  "An agent opens another one without being asked.",
];

const USES = [
  ["Product build", "$35K", "Automated curation, so a chapter does not need the founder."],
  ["Inventory and fulfillment", "$20K", "Drop-ship first. Small stock, concierge chapters only, fast-turning pieces."],
  ["Partners and pilot operations", "$25K", "Agent outreach, concierge fulfillment, closing-table collateral."],
  ["Legal and working capital", "$20K", "Trademark, SAFE and brand agreements, charitable and health-related review."],
];

const STAGES = [
  ["Stage 1 · $[X]", "At close", "Funds product build, legal and pilot operations. The pilot starts."],
  ["Stage 2 · $[Y]", "On target 1", "25 chapters run end to end."],
  ["Stage 3 · $[Z]", "On targets 2 and 3", "40% or more of invited guests give, and 3 agent teams open a second chapter without being asked."],
];

export function BusinessModel() {
  return (
    <Slide>
      <Label>18 · Business model</Label>
      <Title className="max-w-[62%]">Four lines. One loop.</Title>
      <div className="grid grid-cols-4 gap-[2.2cqi]">
        {LINES.map(([n, name, when, line]) => (
          <div key={n} className="border-t border-ink pt-[1cqi]">
            <Spec className="text-cobalt">{n}</Spec>
            <Body className="mt-[0.5cqi] text-[1.35cqi] font-semibold">{name}</Body>
            <Spec className="mt-[0.35cqi] opacity-55">{when}</Spec>
            <Body className="mt-[0.7cqi] text-[1.2cqi] opacity-80">{line}</Body>
          </div>
        ))}
      </div>
      <So>Commission proves demand. Wholesale margin and editions pay for it.</So>
    </Slide>
  );
}

export function MarginLadder() {
  return (
    <Slide>
      <Label>19 · Margin ladder</Label>
      <Title className="max-w-[66%]">The margin climbs. The inventory risk stays low.</Title>
      <div className="grid grid-cols-3 gap-[2.6cqi]">
        {TIERS.map((row) => (
          <div key={row.tier} className="border-t border-ink pt-[1cqi]">
            <Spec className="opacity-55">{row.tier}</Spec>
            <Body className="mt-[0.5cqi] text-[1.35cqi] font-semibold">{row.name}</Body>
            <p className="deck-big font-heading text-clay">{row.take}</p>
            <Spec className="opacity-60">per chapter</Spec>
            <div className="mt-[0.8cqi] border-t border-ink/20 pt-[0.6cqi]">
              <Spec>Margin {row.margin}</Spec>
              <Spec className="mt-[0.3cqi] opacity-70">With anchor gift {row.anchor}</Spec>
              <Spec className="mt-[0.3cqi] opacity-70">Risk {row.risk}</Spec>
            </div>
          </div>
        ))}
      </div>
      <So>Commission now. Wholesale margin next. Stock only where it turns fast.</So>
    </Slide>
  );
}

export function Ask() {
  return (
    <Slide>
      <Label>The ask</Label>
      <div className="grid grid-cols-[0.95fr_1.05fr] items-start gap-[3.5cqi]">
        <div>
          <p className="deck-huge font-heading text-clay">$100K</p>
          <Title className="deck-title-sm mt-[0.8cqi]">Released as the proof comes in.</Title>
          <Body className="mt-[1.2cqi] text-[1.25cqi] opacity-80">
            A proposed $100K Angel SAFE, released in stages. Terms, cap and stage sizes are set
            with counsel.
          </Body>
        </div>
        <div>
          <Spec className="opacity-55">Where we are</Spec>
          <div className="mt-[0.6cqi]">
            {WHERE.map((line) => (
              <div key={line} className="border-t border-ink/20 py-[0.55cqi]">
                <Body className="text-[1.22cqi] opacity-85">{line}</Body>
              </div>
            ))}
          </div>
          <Spec className="mt-[1.2cqi] opacity-55">What the money proves</Spec>
          <div className="mt-[0.6cqi]">
            {PROVES.map((line) => (
              <div key={line} className="flex items-baseline gap-[0.9cqi] border-t border-ink/20 py-[0.55cqi]">
                <Spec className="text-cobalt">·</Spec>
                <Body className="text-[1.22cqi]">{line}</Body>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between gap-[2cqi] border-t border-ink pt-[1cqi]">
        <Spec>Q1 2027 · Released in stages</Spec>
        <Spec>liv@goodchaptercollective.com</Spec>
      </div>
    </Slide>
  );
}

export function UseOfFunds() {
  return (
    <Slide>
      <Label>Use of funds</Label>
      <div className="grid grid-cols-[1.05fr_0.95fr] items-start gap-[3.5cqi]">
        <div>
          <Title className="deck-title-sm">Four jobs.</Title>
          <div className="mt-[1cqi]">
            {USES.map(([name, amount, line]) => (
              <div key={name} className="flex items-baseline gap-[1.2cqi] border-t border-ink/25 py-[0.8cqi]">
                <Spec className="w-[5cqi] shrink-0 text-clay">{amount}</Spec>
                <div>
                  <Body className="text-[1.3cqi] font-semibold">{name}</Body>
                  <Body className="mt-[0.25cqi] text-[1.15cqi] opacity-75">{line}</Body>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Title className="deck-title-sm">Three targets.</Title>
          <div className="mt-[1cqi]">
            {STAGES.map(([stage, when, line]) => (
              <div key={stage} className="border-t border-ink/25 py-[0.8cqi]">
                <div className="flex items-baseline justify-between gap-[1cqi]">
                  <Body className="text-[1.3cqi] font-semibold">{stage}</Body>
                  <Spec className="text-cobalt">{when}</Spec>
                </div>
                <Body className="mt-[0.3cqi] text-[1.15cqi] opacity-75">{line}</Body>
              </div>
            ))}
          </div>
          <Spec className="mt-[1cqi] opacity-55">
            The three stages sum to $100K and split the four lines on the left.
          </Spec>
        </div>
      </div>
      <So>Money follows proof. Each target unlocks the next stage.</So>
    </Slide>
  );
}