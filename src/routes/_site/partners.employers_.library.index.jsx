import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import InviteSection from "@/components/site/InviteSection";
import { COMING_NEXT, LIBRARY_NAME, MOMENTS, RESOURCES } from "@/lib/library";

const title = `${LIBRARY_NAME}. A free library for employers. Good Chapter, Co.`;
const description =
  "Short, free resources for managers, teammates, and HR. What to do when a teammate's life changes, starting with asking first.";

export const Route = createFileRoute("/_site/partners/employers_/library/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LibraryPage,
});

function Meta({ resource }) {
  return (
    <p className="gc-label text-ink/65">
      {resource.audience} · {resource.time} · {resource.format}
    </p>
  );
}

function ResourceCard({ resource }) {
  return (
    <Link
      to="/partners/employers/library/$slug"
      params={{ slug: resource.slug }}
      className="group flex flex-col justify-between rounded-[4px] border-2 border-ink bg-paper p-6 hover:bg-ink hover:text-plaster"
    >
      <div>
        <p className="gc-label text-ink/65 group-hover:text-plaster/70">
          {resource.audience} · {resource.time} · {resource.format}
        </p>
        <h3 className="mt-4 font-heading text-[26px] leading-[1.1]">{resource.title}</h3>
        <p className="mt-3 text-[17px] leading-[1.5]">{resource.line}</p>
      </div>
      <p className="mt-6 text-[16px] underline underline-offset-4">Read it</p>
    </Link>
  );
}

function LibraryPage() {
  const [moment, setMoment] = useState("");
  const featured = RESOURCES[0];
  const shown = moment ? RESOURCES.filter((r) => r.moments.includes(moment)) : RESOURCES;

  return (
    <>
      <section className="border-b border-ink">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <p className="gc-label text-ink/65">For managers, teammates, and HR · Free</p>
          <h1 className="mt-5 max-w-[18ch] font-heading text-[34px] leading-[1.05] sm:text-[56px]">
            What to do when a teammate&rsquo;s life changes.
          </h1>
          <p className="mt-6 max-w-[40rem] text-[19px] leading-[1.55] text-ink/85">
            {LIBRARY_NAME} is a small library of scripts, checklists, and one-pagers for the moments
            that never make the HR calendar. Each one takes five minutes or less. Each one starts
            the same way: ask the person first.
          </p>
          <p className="gc-label mt-6 text-ink/65">No sign-in. No cost. Print what you need.</p>
        </div>
      </section>

      <section className="border-b border-ink bg-cobalt text-plaster">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="gc-label text-plaster/70">Start here</p>
            <h2 className="mt-4 font-heading text-[30px] leading-[1.1] sm:text-[40px]">{featured.title}</h2>
            <p className="mt-3 max-w-[36rem] text-[19px] leading-[1.5] text-[#fff0dc]">{featured.line}</p>
            <p className="gc-label mt-4 text-plaster/70">
              {featured.audience} · {featured.time} · {featured.format}
            </p>
          </div>
          <Link
            to="/partners/employers/library/$slug"
            params={{ slug: featured.slug }}
            className="inline-block w-fit rounded-[4px] border-2 border-plaster px-5 py-3 text-[17px] hover:bg-plaster hover:text-cobalt"
          >
            Read the script
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <p className="gc-label text-clay">Browse by where you are</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" aria-pressed={moment === ""} onClick={() => setMoment("")} className="gc-option !w-auto">
            Everything
          </button>
          {MOMENTS.map((m) => (
            <button
              key={m.key}
              type="button"
              aria-pressed={moment === m.key}
              onClick={() => setMoment(m.key)}
              className="gc-option !w-auto"
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>

        <div className="mt-14 max-w-[46rem] border-t-2 border-ink pt-6">
          <p className="gc-label text-clay">Coming next</p>
          <p className="mt-3 text-[18px] leading-[1.6] text-ink/85">{COMING_NEXT.join(". ")}.</p>
        </div>
      </section>

      <section className="border-t border-ink">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="gc-label text-clay">The house rules</p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              "The person says yes first. Nothing is announced without them.",
              "No guessing out loud about what someone is going through.",
              "Not taking part is silent.",
              "This is not an EAP or legal advice. It sits beside leave and your own policies.",
            ].map((rule) => (
              <li key={rule} className="rounded-[4px] border-2 border-ink p-4 text-[17px] leading-[1.5]">
                {rule}
              </li>
            ))}
          </ul>
          <Link
            to="/partners/employers"
            className="mt-8 inline-flex min-h-11 items-center text-[18px] underline underline-offset-[6px] hover:text-cobalt"
          >
            See how Good Chapter works for employers
          </Link>
        </div>
      </section>

      <InviteSection id="start" defaultInterest="Founding partner: Employer" />
    </>
  );
}
