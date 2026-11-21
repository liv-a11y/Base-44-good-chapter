import { Lede, Mast, Note, Slide, Small, So, Statement } from "@/components/deck/DeckParts";
import DeckPhoto from "@/components/deck/DeckPhoto";

const LAMP =
  "https://media.base44.com/images/public/6af66f925ddaabe6b3b327a8/b2dca5fc3_generated_ac7a45b7.jpg";

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
    <Slide>
      <Mast label="01 · Cover" index="01 / 18" />
      <div className="grid grid-cols-12 items-stretch gap-x-[2.4cqi]">
        <div className="col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="dk-kicker opacity-55">Good Chapter Co.</span>
              <span className="dk-kicker dk-accent">Q1 2027</span>
            </div>
            <h1 className="dk-statement mt-[1.4cqi] text-[5.2cqi]">
              The registry was built for a woman leaving her father's house for her husband's.
            </h1>
            <p className="dk-statement dk-statement--sm mt-[1.3cqi]">
              We built one for <span className="dk-highlight">everything else she does.</span>
            </p>
          </div>
          <Note className="opacity-60">liv@goodchaptercollective.com</Note>
        </div>
        <div className="col-span-4 dk-col">
          <DeckPhoto src={LAMP} alt="A lamp on a side table" className="h-full min-h-[26cqi]" />
        </div>
      </div>
    </Slide>
  );
}

export function History() {
  return (
    <Slide>
      <Mast label="02 · Where the registry started" index="02 / 18" />
      <div className="grid grid-cols-12 gap-x-[2.4cqi]">
        <div className="col-span-5">
          <Statement>For a hundred years, the registry has been how people show up.</Statement>
          <Statement size="xs" className="mt-[1.4cqi] opacity-65">
            It has only ever opened for a wedding or a baby.
          </Statement>
        </div>
        <div className="col-span-7 dk-col">
          <table className="dk-table">
            <tbody>
              {HISTORY.map((row) => (
                <tr key={row.year}>
                  <td className="dk-n dk-accent w-[6cqi]">{row.year}</td>
                  <td>
                    <Small className="font-semibold">{row.who}</Small>
                    <Small className="mt-[0.3cqi] opacity-70">{row.what}</Small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <So>A century of registry innovation, and it still serves one day.</So>
    </Slide>
  );
}

export function Problem() {
  return (
    <Slide>
      <Mast label="03 · The problem" index="03 / 18" />
      <div className="grid grid-cols-12 gap-x-[2.4cqi]">
        <div className="col-span-6">
          <Statement>The offer is always real. The answer never comes.</Statement>
          <Lede className="mt-[1.4cqi] opacity-85">
            Maya Ellison (illustrative), 34, bought a house alone. No shower, no party. Every
            friend offered help and meant it.
          </Lede>
        </div>
        <div className="col-span-3 dk-col">
          <Lede>
            She needed a lamp. Saying so would turn affection into an invoice. The person who
            needs help is the one who has to name it, and naming it is the cost nobody pays.
          </Lede>
        </div>
        <div className="col-span-3 dk-col">
          <div className="border border-graphite/50 p-[1.3cqi]">
            <Note className="opacity-55">Tue 7:42 PM</Note>
            <div className="mt-[1.1cqi] max-w-[92%] border border-graphite/30 px-[1cqi] py-[0.7cqi]">
              <Small>Congrats on the house!! LMK if I can do anything</Small>
            </div>
            <div className="mt-[0.7cqi] ml-auto max-w-[80%] bg-graphite px-[1cqi] py-[0.7cqi] text-bone">
              <Small>Sure, thank you so much</Small>
            </div>
            <Note className="dk-accent mt-[1cqi]">Read 3 weeks later</Note>
          </div>
        </div>
      </div>
      <So>The problem is not wanting help. It is asking for it.</So>
    </Slide>
  );
}