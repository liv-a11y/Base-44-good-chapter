import { createFileRoute, Link } from "@tanstack/react-router";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import Hero from "@/components/site/Hero";
import SampleChapter from "@/components/site/SampleChapter";
import { CHAPTER_TYPES } from "@/lib/chapter-types";
import { getSampleChapter } from "@/lib/server-fns";

export const Route = createFileRoute("/")({
  loader: () => getSampleChapter(),
  head: () => ({
    meta: [
      { title: "Good Chapter" },
      {
        name: "description",
        content:
          "A chapter for the things that never got a convention. A friend starts it, a human builds eight things, the person approves first.",
      },
    ],
  }),
  component: HomePage,
});

const STEPS = [
  {
    number: "01",
    title: "A friend starts it",
    body: "Someone close says what chapter this is and answers three small questions about the person.",
  },
  {
    number: "02",
    title: "A person builds eight things",
    body: "One curator, not software, chooses the list. Eight items. No catalog, no browsing, no search.",
  },
  {
    number: "03",
    title: "The person decides first",
    body: "They open a private link. They approve the items, then the guest list. Nothing moves without them.",
  },
];

function HomePage() {
  const sample = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-plaster">
      <SiteHeader />
      <main>
        <Hero />

        <section className="border-y-2 border-ink bg-plaster">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="max-w-xl text-[clamp(26px,3vw,40px)] leading-[1.15] text-ink">
                The list is built by a person who read every word.
              </h2>
              <span className="gc-label hidden shrink-0 text-ink/60 sm:block">Three steps</span>
            </div>

            <div className="mt-12 grid gap-px bg-ink md:grid-cols-3">
              {STEPS.map((step) => (
                <div key={step.number} className="bg-paper p-7">
                  <span className="gc-label text-ochre">{step.number}</span>
                  <h3 className="mt-4 text-[22px] leading-snug text-ink">{step.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink/80">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-plaster">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="rounded border-2 border-ink bg-clay p-8 text-plaster sm:p-12">
              <span className="gc-label text-plaster/80">The rule</span>
              <p className="mt-5 max-w-2xl font-heading text-[clamp(26px,3.2vw,42px)] leading-[1.2]">
                Nobody asks for anything. Not the person, not the friend, not us.
              </p>
              <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-plaster/85">
                No cash funds. No gift cards. No money requests. Eight things a person can hold, chosen
                with a reason for each one.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t-2 border-ink bg-plaster">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="gc-label text-ink/60">Chapters</span>
                <h2 className="mt-4 text-[clamp(26px,3vw,38px)] leading-[1.15] text-ink">
                  The chapters that never got a convention.
                </h2>
                <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-ink/80">
                  A first home bought alone. A divorce. Coming out. The year after a health scare. A new
                  city, a new job. These are not sad chapters. They are just unwritten ones.
                </p>
                <div className="mt-8">
                  <Link to="/start" className="gc-btn">
                    <span className="gc-btn-label">Start a chapter</span>
                    <span className="gc-btn-arrow" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>

              <ol className="border-t-2 border-ink">
                {CHAPTER_TYPES.map((type, i) => (
                  <li
                    key={type}
                    className="flex items-baseline gap-5 border-b-2 border-ink py-3.5"
                  >
                    <span className="gc-label w-6 shrink-0 text-ink/45">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[17px] text-ink">{type}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <SampleChapter chapter={sample} />

        <section className="border-t-2 border-ink bg-ink text-plaster">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="gc-label text-plaster/60">Email only</span>
              <h2 className="mt-4 max-w-xl text-[clamp(26px,3vw,38px)] leading-[1.15] text-plaster">
                One email goes to the guests. It comes from your friend, not from a store.
              </h2>
            </div>
            <Link
              to="/start"
              className="gc-label shrink-0 border-2 border-plaster px-5 py-3 text-plaster transition-colors hover:bg-plaster hover:text-ink"
            >
              Start a chapter
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}