import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { ARCHIVE } from "@/lib/brand-assets";

const ARCHIVE_CAPTIONS = "mt-3 text-[14px] leading-[1.4] text-ink/60";

export default function WhyWeExist() {
  return (
    <section aria-labelledby="why-we-exist" className="mx-auto max-w-6xl px-6 py-16 md:py-28">
      <p className="gc-label text-ink/65">Why we exist</p>

      <div className="mt-8 grid items-start gap-6 sm:grid-cols-2">
        <figure>
          <div className="border border-ink bg-paper">
            <Image
              src={ARCHIVE.interior}
              alt="Archival photograph of the Marshall Field’s store interior, about 1910."
              className="h-[240px] w-full object-cover grayscale sm:h-[300px]"
            />
          </div>
          <figcaption className={ARCHIVE_CAPTIONS}>Marshall Field’s, about 1910.</figcaption>
        </figure>
        <figure>
          <div className="border border-ink bg-paper">
            <Image
              src={ARCHIVE.street}
              alt="Archival 1906 postcard of crowds outside the Marshall Field’s store."
              className="h-[240px] w-full object-cover grayscale sm:h-[300px]"
            />
          </div>
          <figcaption className={ARCHIVE_CAPTIONS}>The street outside, 1906.</figcaption>
        </figure>
      </div>

      <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-y border-ink py-4">
        <span className="gc-spec text-ink/60">1924</span>
        <span className="text-[19px] text-ink/85">One accepted life script: china, silver, crystal.</span>
        <span className="gc-spec ml-auto text-ink/60">Now</span>
        <span className="text-[19px] text-ink">Every life worth marking.</span>
      </div>

      <h2 id="why-we-exist" className="mt-12 max-w-[46ch] text-[28px] leading-[1.12] sm:text-[40px]">
        the registry was built for a woman leaving her father’s house for her husband’s. we built one
        for everything else she does.
      </h2>

      <div className="mt-6 grid gap-5 text-[19px] leading-[1.45] text-ink/85 md:max-w-[64ch]">
        <p>
          In 1924, a department store made care easy to give at marriage. China, silver, crystal, and a
          list so nobody guessed.
        </p>
        <p>
          Women kept building lives outside that script. Buying homes alone. Starting over. Moving
          somewhere new. The care stayed. The ritual did not.
        </p>
      </div>

      <Link
        to="/read"
        className="mt-7 inline-flex min-h-11 items-center text-[18px] underline underline-offset-[6px] hover:text-cobalt"
      >
        Read our why
      </Link>

      <p className="mt-10 text-[14px] leading-[1.5] text-ink/55">
        Archival images: Marshall Field’s, about 1906 to 1910. Public domain, via Wikimedia Commons.
      </p>
    </section>
  );
}