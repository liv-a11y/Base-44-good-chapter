import { useId, useState } from "react";
import { Image } from "@/components/ui/image";

const LAMP =
  "https://goodchaptercollective.com/__l5e/assets-v1/0890e952-2b14-48c0-972a-5b879bb9e9de/cobalt-table-lamp-600.webp";
const CARD =
  "https://media.base44.com/images/public/6af66f925ddaabe6b3b327a8/d14855bf1_generated_image.png";
const HANDOFF =
  "https://media.base44.com/images/public/6af66f925ddaabe6b3b327a8/cf0473392_generated_image.png";

const ROWS = [
  {
    title: "you give it, once",
    photo: LAMP,
    alt: "Cobalt table lamp.",
    body: "You start the chapter for the person closing on a first place. You anchor one real object, put your name on it, and write the reason you chose it. That is the whole ask: one chapter, one person.",
    caption: "Example: Dana starts Maya's chapter the week the keys change hands.",
  },
  {
    title: "we do not pass it on",
    photo: CARD,
    alt: "A folded cream card on linen.",
    body: "Good Chapter never forwards a chapter, never posts it, and never adds anyone to it. It opens for one person, the one it was started for. If they say no, it ends there and nothing goes out.",
    caption: "Example: Maya's sister is not on a list. No email, no invite, nothing from us.",
  },
  {
    title: "if they pass it on, your name is still on it",
    photo: HANDOFF,
    alt: "Two hands passing a folded card.",
    body: "A chapter is easy to send along. When the person forwards it to their mother, their new neighbours, the friend who helped them move, everyone who opens it reads whose idea it was. Your name and your brokerage sit next to the reason you chose the lamp.",
    caption:
      "Example: Maya forwards it to her sister in Chicago, who reads: anchored by Dana Whitfield, Willow and Vine Realty.",
  },
];

/** How a realtor's chapter travels, and why the name on it is the value. */
export default function SharingAccordion() {
  const base = useId();
  const [open, setOpen] = useState(0);

  return (
    <section aria-labelledby="sharing-heading" className="border-t border-ink bg-plaster">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <p className="gc-label text-ink/65">Realtors</p>
        <h2
          id="sharing-heading"
          className="mt-5 max-w-[22ch] text-[30px] leading-[1.05] sm:text-[46px]"
        >
          you hand it over. your name stays on it.
        </h2>
        <p className="mt-6 max-w-[46rem] text-[19px] leading-[1.45] text-ink/85">
          A chapter is not a mailing. It goes to one person, from you. What happens after that is
          theirs to choose, and it is the part realtors keep telling us about.
        </p>

        <div className="mt-10 border-t border-ink">
          {ROWS.map((row, index) => {
            const isOpen = open === index;
            return (
              <div key={row.title} className="border-b border-ink">
                <h3>
                  <button
                    type="button"
                    id={`${base}-row-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`${base}-panel-${index}`}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="flex w-full items-center gap-4 px-1 py-5 text-left transition-colors hover:bg-paper"
                  >
                    <span className="relative mt-1 h-4 w-4 shrink-0" aria-hidden="true">
                      <span className="absolute left-0 top-[7px] h-[1.5px] w-4 bg-ink" />
                      <span
                        className={`absolute left-[7px] top-0 h-4 w-[1.5px] bg-ink transition-transform duration-300 ease-out ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                    <span className="font-heading text-[23px] leading-[1.1] sm:text-[27px]">
                      {row.title}
                    </span>
                  </button>
                </h3>

                <div
                  id={`${base}-panel-${index}`}
                  role="region"
                  aria-labelledby={`${base}-row-${index}`}
                  data-open={isOpen}
                  className="gc-acc-panel"
                >
                  <div>
                    <div className="flex flex-wrap gap-4 pb-6 pl-1 md:gap-6">
                      <div className="min-w-[240px] flex-[3_1_0]">
                        <Image
                          src={row.photo}
                          alt={row.alt}
                          className="h-full min-h-[220px] w-full rounded border border-ink/15 object-cover"
                        />
                      </div>
                      <div className="flex min-w-[240px] flex-[4_1_0] flex-col justify-end gap-5 pb-2 pr-2 md:pr-6">
                        <p className="text-[19px] leading-[1.45] text-ink/85">{row.body}</p>
                        <p className="text-[17px] italic leading-[1.4] text-ink/55">
                          {row.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 max-w-[46rem] text-[19px] leading-[1.45] text-ink/85">
          The chapter keeps showing up long after the keys change hands. That is what putting your
          name on it is worth.
        </p>
      </div>
    </section>
  );
}