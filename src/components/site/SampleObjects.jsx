import { Image } from "@/components/ui/image";
import { DRAWINGS } from "@/lib/brand-assets";

const SMALL_OBJECTS = [
  {
    drawing: DRAWINGS.toaster,
    name: "Checked toaster",
    note: "Yes, the toaster. No wedding required.",
  },
  {
    drawing: DRAWINGS.blanket,
    name: "Checked wool throw",
    note: "For the chair that is still the only chair.",
  },
];

export default function SampleObjects() {
  return (
    <section aria-label="Sample objects" className="mx-auto max-w-6xl px-6 py-14 md:py-24">
      <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
        <figure className="flex flex-col bg-paper p-5 sm:p-6">
          <div className="flex min-h-[240px] flex-1 items-center justify-center p-6 sm:min-h-[320px]">
            <Image
              src={DRAWINGS.mugs}
              alt="Drawing of two mugs."
              fittingType="fit"
              className="h-auto max-h-[280px] w-auto max-w-[70%]"
            />
          </div>
          <figcaption className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 border-t border-ink pt-4">
            <span className="font-heading text-[28px] leading-[1.1]">Maya’s first place</span>
            <span className="gc-label text-ink/65">Started by a friend. Approved by Maya.</span>
          </figcaption>
        </figure>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1">
          {SMALL_OBJECTS.map((object) => (
            <figure key={object.name} className="flex flex-col gap-4 border border-ink p-5">
              <div className="flex min-h-[150px] flex-1 items-center justify-center bg-paper p-4">
                <Image
                  src={object.drawing}
                  alt={`Drawing for ${object.name}.`}
                  fittingType="fit"
                  className="h-auto max-h-[130px] w-auto max-w-[70%]"
                />
              </div>
              <figcaption>
                <p className="font-heading text-[23px] leading-[1.15]">{object.name}</p>
                <p className="mt-1 text-[17px] leading-[1.4] text-ink/85">{object.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}