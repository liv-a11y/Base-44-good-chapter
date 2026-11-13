import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { DRAWINGS } from "@/lib/brand-assets";

const LAMP =
  "https://goodchaptercollective.com/__l5e/assets-v1/0890e952-2b14-48c0-972a-5b879bb9e9de/cobalt-table-lamp-600.webp";

export default function FirstPlacePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <p className="gc-label text-ink/65">01 Closing</p>
      <h1 className="mt-5 max-w-[20ch] text-[34px] leading-[1.05] sm:text-[58px]">
        maya just got the keys. the rooms are empty.
      </h1>
      <p className="mt-6 max-w-[46rem] text-[19px] leading-[1.45] text-ink/85">
        Her agent skips the branded cutting board. She anchors one real object instead, a table lamp for
        the first night in.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-start md:gap-14">
        <figure className="flex flex-col bg-paper p-6">
          <div className="flex min-h-[260px] items-center justify-center p-4 sm:min-h-[340px]">
            <Image
              src={LAMP}
              alt="Cobalt table lamp."
              fittingType="fit"
              className="h-auto max-h-[300px] w-auto max-w-[80%]"
            />
          </div>
          <figcaption className="mt-5 border-t border-ink pt-4">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-heading text-[26px] leading-[1.1]">Cobalt table lamp</p>
              <span className="gc-spec text-ink">$240</span>
            </div>
            <p className="mt-2 text-[18px] leading-[1.4] text-ink/85">
              Good light for the first night in.
            </p>
          </figcaption>
        </figure>

        <div>
          <p className="gc-label text-ink/65">Anchored by her agent</p>
          <p className="mt-4 max-w-[36ch] text-[19px] leading-[1.45] text-ink/85">
            One object, chosen with a reason. The rest of the rooms stay quiet until Maya says what
            fits.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            <Link to="/start" className="gc-btn w-fit">
              <span className="gc-btn-label">Start a chapter</span>
            </Link>
            <Link
              to="/"
              hash="invite"
              className="inline-flex min-h-11 w-fit items-center text-[18px] underline underline-offset-[6px] hover:text-cobalt"
            >
              Request an invitation
            </Link>
          </div>
          <Image
            src={DRAWINGS.door}
            alt=""
            aria-hidden="true"
            className="mt-10 h-auto w-[140px]"
          />
        </div>
      </div>
    </section>
  );
}