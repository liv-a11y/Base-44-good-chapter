import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { CHAPTER_SYMBOLS } from "@/lib/brand-assets";

/**
 * The one loud field on the page: a clay band with paper type. Paper on clay
 * is 4.4:1, so nothing smaller than 24px sits on it. The actions live on the
 * paper strip underneath.
 */
export default function Hero() {
  return (
    <section className="border-b border-ink">
      <div className="bg-clay text-plaster">
        <div className="mx-auto grid max-w-6xl items-end gap-10 px-6 py-16 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14 md:py-28">
          <div className="gc-step">
            <h1 className="max-w-4xl text-[44px] leading-[1.04] sm:text-[64px] lg:text-[88px]">
              divorce doesn’t come with a china pattern.
            </h1>
            <p className="mt-8 max-w-[36rem] text-[24px] leading-[1.35] sm:text-[26px]">
              A list for the chapters nobody throws a shower for.
            </p>
          </div>

          <Image
            src={CHAPTER_SYMBOLS.startingOver.paper}
            alt=""
            aria-hidden="true"
            className="hidden h-auto w-[220px] md:block lg:w-[300px]"
          />
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-4 px-6 py-7">
        <p className="mr-auto text-[19px] leading-[1.4] sm:text-[21px]">
          A friend starts it. The person approves it. Nobody asks.
        </p>
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
    </section>
  );
}
