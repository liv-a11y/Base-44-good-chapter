import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
      { title: "Good Chapter Co." },
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

        <section className="border-y border-ink bg-plaster">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-wrap items-baseline justify-between gap-6">
              <h2 className="max-w-[20ch] text-[clamp(28px,3.2vw,44px)]">
                The list is built by a person who read every word.
              </h2>
              <span className="gc-label text-ink/50">Three steps</span>
            </div>

            <div className="mt-12 grid gap-[1.5px] bg-ink md:grid-cols-3">
              {STEPS.map((step) => (
                <div key={step.number} className="bg-paper p-7">
                  <span className="gc-spec text-ink/60">{step.number}</span>
                  <h3 className="mt-4 text-[24px]">{step.title}</h3>
                  <p className="mt-3 text-[19px] leading-[1.38] text-ink/85">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The one loud field on this screen. */}
        <section className="bg-clay text-plaster">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <span className="gc-label text-plaster/75">The rule</span>
            <p className="gc-loud mt-6 max-w-[16ch] text-[clamp(44px,7vw,104px)]">
              nobody asks for anything.
            </p>
            <p className="mt-8 max-w-[46ch] text-[21px] leading-[1.38] text-plaster/90">
              No cash funds. No gift cards. No money requests. Eight things a person can hold, chosen
              with a reason for each one.
            </p>
          </div>
        </section>

        <section className="border-t border-ink bg-plaster">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="gc-label text-ink/50">Chapters</span>
                <h2 className="mt-4 max-w-[18ch] text-[clamp(28px,3.2vw,44px)]">
                  The chapters that never got a convention.
                </h2>
                <p className="mt-5 max-w-[34ch] text-[19px] leading-[1.38] text-ink/85">
                  A first home bought alone. A divorce. Coming out. The year after a health scare. A new
                  city, a new job. These are not sad chapters. They are just unwritten ones.
                </p>
                <div className="mt-8">
                  <Link to="/start" className="gc-btn">
                    <span className="gc-btn-label">Start a chapter</span>
                    <span className="gc-btn-arrow" aria-hidden="true">
                      <ArrowRight size={17} strokeWidth={1.6} />
                    </span>
                  </Link>
                </div>
              </div>

              <ol className="border-t border-ink">
                {CHAPTER_TYPES.map((type, i) => (
                  <li key={type} className="flex items-baseline gap-5 border-b border-ink py-3">
                    <span className="gc-spec w-6 shrink-0 text-ink/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[19px] text-ink">{type}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <SampleChapter chapter={sample} />

        <section className="border-t border-ink bg-plaster">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="gc-label text-ink/50">Email only</span>
              <h2 className="mt-4 max-w-[24ch] text-[clamp(28px,3.2vw,44px)]">
                One email goes to the guests. It comes from your friend, not from a store.
              </h2>
            </div>
            <Link to="/start" className="gc-btn shrink-0">
              <span className="gc-btn-label">Start a chapter</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}