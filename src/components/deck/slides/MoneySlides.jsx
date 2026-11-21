import { Figure, Lede, Mast, Note, Slide, Small, So, Statement } from "@/components/deck/DeckParts";

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
      <Mast label="18 · Business model" index="15 / 18" />
      <div className="grid grid-cols-12 gap-x-[2.4cqi]">
        <div className="col-span-3">
          <Statement>Four lines. One loop.</Statement>
        </div>
        <div className="col-span-9 dk-col">
          <table className="dk-table">
            <tbody>
              {LINES.map(([n, name, when, line]) => (
                <tr key={n}>
                  <td className="dk-n dk-accent w-[3cqi]">{n}</td>
                  <td className="w-[15cqi]">
                    <span className="font-semibold">{name}</span>
                  </td>
                  <td className="w-[11cqi]">
                    <span className="dk-kicker opacity-60">{when}</span>
                  </td>
                  <td>{line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <So>Commission proves demand. Wholesale margin and editions pay for it.</So>
    </Slide>
  );
}

export function MarginLadder() {
  return (
    <Slide>
      <Mast label="19 · Margin ladder" index="16 / 18" />
      <div className="grid grid-cols-12 gap-x-[2.4cqi]">
        <div className="col-span-3">
          <Statement>The margin climbs. The inventory risk stays low.</Statement>
        </div>
        {TIERS.map((row) => (
          <div key={row.tier} className="col-span-3 dk-col">
            <span className="dk-kicker dk-accent">{row.tier}</span>
            <Statement size="xs" className="mt-[0.5cqi]">
              {row.name}
            </Statement>
            <Figure size="sm" className="mt-[0.7cqi]">
              {row.take}
            </Figure>
            <Note className="mt-[0.4cqi] opacity-60">per chapter</Note>
            <div className="dk-row mt-[0.7cqi]">
              <Note>Margin {row.margin}</Note>
              <Note className="mt-[0.3cqi] opacity-70">With anchor gift {row.anchor}</Note>
              <Note className="mt-[0.3cqi] opacity-70">Risk {row.risk}</Note>
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
      <Mast label="The ask" index="17 / 18" />
      <div className="grid grid-cols-12 gap-x-[2.4cqi]">
        <div className="col-span-6">
          <Figure size="huge">$100K</Figure>
          <Statement size="sm" className="mt-[0.9cqi]">
            Released as the proof comes in.
          </Statement>
          <Lede className="mt-[1.1cqi] opacity-85">
            A proposed $100K Angel SAFE, released in stages. Terms, cap and stage sizes are set
            with counsel.
          </Lede>
          <Note className="mt-[1.2cqi] opacity-65">
            Q1 2027 · Released in stages
            <br />
            liv@goodchaptercollective.com
          </Note>
        </div>
        <div className="col-span-3 dk-col">
          <span className="dk-kicker dk-accent">Where we are</span>
          {WHERE.map((line) => (
            <div key={line} className="dk-row">
              <Small className="opacity-85">{line}</Small>
            </div>
          ))}
        </div>
        <div className="col-span-3 dk-col">
          <span className="dk-kicker dk-accent">What the money proves</span>
          {PROVES.map((line) => (
            <div key={line} className="dk-row">
              <Small className="opacity-85">{line}</Small>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

export function UseOfFunds() {
  return (
    <Slide>
      <Mast label="Use of funds" index="18 / 18" />
      <div className="grid grid-cols-12 gap-x-[2.4cqi]">
        <div className="col-span-6">
          <Statement size="sm">Four jobs.</Statement>
          <table className="dk-table mt-[1.2cqi]">
            <tbody>
              {USES.map(([name, amount, line]) => (
                <tr key={name}>
                  <td className="dk-hang">
                    <span className="font-semibold">{name}</span>
                    <Small className="mt-[0.25cqi] opacity-75">{line}</Small>
                  </td>
                  <td className="dk-n dk-accent">
                    <span className="font-semibold">{amount}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-span-6 dk-col">
          <Statement size="sm">Three targets.</Statement>
          <table className="dk-table mt-[1.2cqi]">
            <tbody>
              {STAGES.map(([stage, when, line]) => (
                <tr key={stage}>
                  <td className="dk-hang">
                    <span className="font-semibold">{stage}</span>{" "}
                    <span className="dk-kicker dk-accent">{when}</span>
                    <Small className="mt-[0.25cqi] opacity-75">{line}</Small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Note className="mt-[1cqi] opacity-55">
            The three stages sum to $100K and split the four lines on the left.
          </Note>
        </div>
      </div>
      <So>Money follows proof. Each target unlocks the next stage.</So>
    </Slide>
  );
}