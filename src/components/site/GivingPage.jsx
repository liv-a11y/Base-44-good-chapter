import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import GIVING_LOGOS from "@/lib/giving-logos";

const PAIRINGS = [
  {
    chapter: "Coming out",
    logo: GIVING_LOGOS.trevor,
    alt: "The Trevor Project logo",
    note: "Crisis support for LGBTQ young people.",
  },
  {
    chapter: "Divorce and starting over",
    logo: GIVING_LOGOS.hotline,
    alt: "National Domestic Violence Hotline logo",
    note: "Safety and support for people leaving.",
  },
  {
    chapter: "First place",
    logo: GIVING_LOGOS.habitat,
    alt: "Habitat for Humanity logo",
    note: "Homes for people who need one.",
  },
  {
    chapter: "A big, lonely change",
    logo: GIVING_LOGOS.shatterproof,
    alt: "Shatterproof logo",
    note: "Treatment and recovery support.",
  },
  {
    chapter: "Adoption and foster",
    logo: GIVING_LOGOS.daveThomas,
    alt: "Dave Thomas Foundation for Adoption logo",
    note: "Homes for children in foster care.",
  },
  {
    chapter: "Grief and healing",
    logo: GIVING_LOGOS.dougy,
    alt: "Dougy Center logo",
    note: "Support for grieving children and families.",
  },
];

const RULES = [
  {
    number: "01 . From our margin",
    body: "Guests buy the gift. We give from what we earn. No tip jars, no round up at checkout.",
  },
  {
    number: "02 . Quiet by default",
    body: "Nobody is told which cause a chapter supports unless the person approves it.",
  },
  {
    number: "03 . Annual impact report",
    body: "Once a year we publish what went where. Dollars, classrooms, causes. Partners get their own line.",
  },
];

export default function GivingPage() {
  return (
    <>
      <section className="border-b border-ink">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="flex flex-wrap items-center gap-3">
            <p className="gc-label text-ink/65">Giving back</p>
            <span className="gc-sticker">Beta</span>
          </div>
          <h1 className="mt-5 max-w-[20ch] text-[34px] leading-[1.05] sm:text-[56px]">
            a share of every chapter goes to a nonprofit that knows it.
          </h1>
          <p className="mt-6 max-w-[46rem] text-[19px] leading-[1.45] text-ink/85">
            Partners can direct giving to a local nonprofit in their community, or one their team cares
            about.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAIRINGS.map((pairing) => (
            <article key={pairing.chapter} className="flex flex-col border border-ink p-5">
              <div className="flex min-h-[120px] items-center justify-center bg-paper p-5">
                <Image
                  src={pairing.logo}
                  alt={pairing.alt}
                  fittingType="fit"
                  className="h-auto max-h-[64px] w-auto max-w-[70%]"
                />
              </div>
              <h2 className="mt-5 text-[21px] leading-[1.15]">{pairing.chapter}</h2>
              <p className="mt-2 text-[17px] leading-[1.4] text-ink/85">{pairing.note}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-[70ch] text-[14px] leading-[1.55] text-ink/55">
          Illustrative pairings only. No agreements signed or endorsements implied. Logos belong to
          their respective organizations. Percentage to be set, from our margin, not the gift.
          Structure set with counsel.
        </p>
      </section>

      <section className="border-y border-ink bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-[auto_1fr] md:gap-14 md:py-20">
          <Image
            src={GIVING_LOGOS.donorsChoose}
            alt="DonorsChoose logo"
            fittingType="fit"
            className="h-auto w-[180px]"
          />
          <div>
            <p className="gc-label text-ink/65">No cause picked</p>
            <h2 className="mt-4 max-w-[26ch] text-[26px] leading-[1.12] sm:text-[36px]">
              every other chapter helps a teacher start a child’s next one.
            </h2>
            <p className="mt-4 max-w-[52ch] text-[19px] leading-[1.45] text-ink/85">
              When no cause is chosen, our margin goes to DonorsChoose. Public school teachers asking
              for what their students need. Books. Pencils. A rug for story time. Helping a kid start
              their next chapter right.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {RULES.map((rule) => (
            <div key={rule.number} className="border-t border-ink pt-5">
              <span className="gc-spec text-ink/60">{rule.number}</span>
              <p className="mt-3 text-[18px] leading-[1.45] text-ink/85">{rule.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-[24ch] text-[26px] leading-[1.1] sm:text-[34px]">
          every chapter gives back to the cause that knows it.
        </p>
        <Link
          to="/"
          hash="invite"
          className="mt-6 inline-flex min-h-11 items-center text-[18px] underline underline-offset-[6px] hover:text-cobalt"
        >
          Request an invitation
        </Link>
      </section>
    </>
  );
}