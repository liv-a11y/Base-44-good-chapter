import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ESSAYS } from "@/lib/essays";

export default function ReadPage() {
  const [open, setOpen] = useState(ESSAYS[0].number);

  return (
    <>
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:py-20">
          {/* The volume cover, cobalt, as the site sets it. Decorative only. */}
          <div
            aria-hidden="true"
            className="mx-auto w-full max-w-[22rem] rounded-[4px] bg-paper p-6 sm:p-8"
          >
            <div className="flex aspect-[3/4] flex-col justify-between rounded-[4px] bg-cobalt p-6 text-plaster">
              <p className="text-[13px] font-medium">Good Chapter, Co. · Vol. 01</p>
              <div>
                <p className="font-heading text-[clamp(30px,6vw,40px)] leading-[1.02]">
                  The rules we are unlearning.
                </p>
                <span className="mt-5 block h-3 w-16 bg-clay" />
              </div>
              <p className="text-[13px] font-medium">Three essays</p>
            </div>
          </div>

          <div>
            <p className="gc-label text-ink/65">Essays · Cultural barriers</p>
            <h1 className="mt-5 max-w-[16ch] text-[34px] leading-[1.05] sm:text-[56px]">
              the rules we are unlearning.
            </h1>
            <p className="mt-6 max-w-[40rem] text-[19px] leading-[1.55] text-ink/85">
              Why it takes an engagement ring to get a toaster, why nobody asks for a skillet, and how we
              start celebrating the rest of life on purpose.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <ol aria-label="Contents" className="max-w-[46rem] space-y-3">
          {ESSAYS.map((essay) => {
            const isOpen = open === essay.number;
            return (
              <li key={essay.number} className={`rounded-[4px] ${isOpen ? "bg-paper" : ""}`}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? "" : essay.number)}
                  aria-expanded={isOpen}
                  className="gc-flip-link flex w-full items-baseline gap-5 rounded-[4px] px-5 py-4 text-left"
                >
                  <span className="gc-label shrink-0 text-clay">{essay.number}</span>
                  <span className="font-heading text-[24px] leading-[1.1]">{essay.title}</span>
                </button>
                {isOpen ? (
                  <div className="px-5 pb-6 pl-[3.6rem]">
                    <p className="text-[18px] leading-[1.65] text-ink/85">{essay.body}</p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>

        <Link
          to="/"
          hash="invite"
          className="mt-10 inline-flex min-h-11 items-center text-[18px] underline underline-offset-[6px] hover:text-cobalt"
        >
          Request an invitation
        </Link>
      </section>
    </>
  );
}