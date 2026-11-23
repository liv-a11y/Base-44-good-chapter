import { createFileRoute, Link } from "@tanstack/react-router";
import SpecimenSheet from "@/components/type/SpecimenSheet";
import TypefaceSheet from "@/components/type/TypefaceSheet";
import { TREATMENTS } from "@/components/type/treatments";

export const Route = createFileRoute("/type")({
  head: () => ({
    meta: [
      { title: "Type specimen · Good Chapter Co." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TypeSpecimen,
});

function TypeSpecimen() {
  return (
    <div className="spec-page">
      <div className="spec-bar">
        <div className="spec-shell spec-bar-inner">
          <div className="flex items-baseline gap-4">
            <span className="font-heading text-[18px] leading-none">Good Chapter Co.</span>
            <span className="spec-mono opacity-55">Type specimen</span>
          </div>
          <div className="flex items-baseline gap-5">
            <span className="spec-mono opacity-45">Nothing here is applied to the site</span>
            <Link to="/" className="spec-mono gc-link">
              Back to the site
            </Link>
          </div>
        </div>
      </div>

      <div className="spec-shell pt-8 pb-24">
        <p className="spec-mono opacity-55">Five treatments · one palette · one layout</p>
        <h1 className="font-heading mt-3 max-w-[22ch] text-[clamp(30px,4vw,46px)] leading-[1.05]">
          The same page, set five ways.
        </h1>

        <TypefaceSheet />

        {TREATMENTS.map((treatment, index) => (
          <SpecimenSheet key={treatment.id} index={index} treatment={treatment} />
        ))}

        <p className="spec-mono mt-8 opacity-45">
          Pick a treatment and it gets applied to the site. Nothing changes until then.
        </p>
      </div>
    </div>
  );
}