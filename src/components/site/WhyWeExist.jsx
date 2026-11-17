import { Link } from "@tanstack/react-router";
import { ARCHIVE } from "@/lib/brand-assets";

/** The 1924 story: one accepted life script then, every life worth marking now. */
export default function WhyWeExist() {
  return (
    <section aria-labelledby="why-we-exist" className="mx-auto max-w-6xl px-6 py-16 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(300px,.72fr)_minmax(0,1.28fr)] lg:gap-20">
        <div>
          <div className="grid grid-cols-2 border border-ink">
            <div className="col-span-2 flex items-end justify-between gap-5 border-b border-ink p-5">
              <span className="font-heading text-[52px] leading-[0.9] sm:text-[64px]">1924</span>
              <span className="gc-label text-right">
                One accepted
                <br />
                life script
              </span>
            </div>
            <img
              src={ARCHIVE.interior}
              alt="Archival photograph of the Marshall Field’s store interior, about 1910, with tall columns and shoppers on the main floor."
              loading="lazy"
              width={300}
              height={446}
              className="aspect-square h-full w-full border-r border-ink object-cover grayscale"
            />
            <div className="flex flex-col justify-between gap-8 p-5">
              <span className="gc-label">The bridal list</span>
              <p className="font-heading text-[26px] leading-[1.1]">
                China.
                <br />
                Silver.
                <br />
                Crystal.
              </p>
            </div>
            <img
              src={ARCHIVE.street}
              alt="Archival 1906 postcard of crowds on the street outside the Marshall Field’s store."
              loading="lazy"
              width={1920}
              height={1254}
              className="col-span-2 aspect-[3/2] h-full w-full border-t border-ink object-cover"
            />
            <div className="col-span-2 flex items-end justify-between gap-5 bg-cobalt p-5 text-plaster">
              <span className="font-heading text-[52px] leading-[0.9] sm:text-[64px]">now</span>
              <span className="gc-label text-right">
                Every life
                <br />
                worth marking
              </span>
            </div>
          </div>
          <p className="mt-4 text-[15px] leading-[1.4] text-ink/75">
            Archival images: Marshall Field’s, about 1906 to 1910. Public domain, via Wikimedia
            Commons.
          </p>
        </div>

        <div>
          <p className="gc-label text-ink/65">Why we exist</p>
          <h2
            id="why-we-exist"
            className="mt-5 text-[36px] leading-[1.04] sm:text-[52px] lg:text-[62px]"
          >
            the registry was built for a woman leaving her father’s house for her husband’s.{" "}
            <span className="text-clay">we built one for everything else she does.</span>
          </h2>
          <p className="mt-8 max-w-[40rem] text-[19px] leading-[1.45] text-ink/85">
            In 1924, a department store made care easy to give at marriage. China, silver, crystal,
            and a list so nobody guessed.
          </p>
          <p className="mt-5 max-w-[40rem] text-[19px] leading-[1.45] text-ink/85">
            Women kept building lives outside that script. Buying homes alone. Starting over. Moving
            somewhere new. The care stayed. The ritual did not.
          </p>
          <div className="mt-10 border-t border-ink pt-7">
            <p className="font-heading text-[26px] leading-[1.1] sm:text-[32px]">
              To learn more about our why.
            </p>
            <Link to="/read" className="gc-btn mt-6">
              <span className="gc-btn-label">Read our why</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
