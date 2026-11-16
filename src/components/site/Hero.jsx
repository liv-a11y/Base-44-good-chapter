import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { DRAWINGS } from "@/lib/brand-assets";

export default function Hero() {
  return (
    <section className="border-b border-ink">
      <div className="mx-auto grid max-w-6xl items-end gap-10 px-6 py-14 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14 md:py-24">
        <div className="gc-step">
          <p className="gc-label text-ink/65">Since 1924, nobody asks.</p>
          <h1 className="mt-7 max-w-5xl text-[42px] leading-[1.1] sm:text-[60px] lg:text-[84px]">
            you shouldn’t have to get married to get a{" "}
            <span className="inline-block rounded-[2px] bg-cobalt px-[0.14em] pb-[0.09em] pt-[0.02em] leading-none text-plaster">
              fucking
            </span>{" "}
            toaster.
          </h1>
          <p className="mt-7 max-w-[34rem] text-[19px] leading-[1.45] sm:text-[21px]">
            Good Chapter is making it easier to show up for the life that’s actually happening.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link to="/" hash="invite" className="gc-btn">
              <span className="gc-btn-label">Request an invitation</span>
            </Link>
            <Link
              to="/first-place"
              className="text-[18px] underline underline-offset-[6px] hover:text-cobalt"
            >
              See Maya’s chapter
            </Link>
          </div>
        </div>

        <Image
          src={DRAWINGS.door}
          alt=""
          aria-hidden="true"
          className="hidden h-auto w-[220px] md:block lg:w-[300px]"
        />
      </div>
    </section>
  );
}