import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export default function BrandsPage() {
  return (
    <>
      <section className="border-b border-ink">
        <div className="mx-auto grid min-h-[46vh] max-w-6xl content-center gap-10 px-6 py-14 md:grid-cols-[1.2fr_.8fr] md:items-end md:py-20">
          <div>
            <p className="gc-label text-ink/65">Brands &amp; collaborations</p>
            <h1 className="mt-5 max-w-4xl text-[34px] leading-[1.05] sm:text-[60px]">
              thoughtful products for real-life chapters
            </h1>
          </div>
          <div className="border-t border-ink pt-6">
            <p className="text-[19px] leading-[1.45] text-ink/85">
              Collaborate with Good Chapter on useful, human-centered gifting moments.
            </p>
            <a href="mailto:liv@goodchaptercollective.com" className="gc-btn mt-7">
              <span className="gc-btn-label">Talk with Liv</span>
              <span className="gc-btn-arrow" aria-hidden="true">
                <ArrowRight size={15} strokeWidth={1.6} />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-ink text-plaster">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="max-w-3xl text-[28px] leading-[1.1] sm:text-[40px]">
            we’re building the thoughtful way to show up.
          </h2>
          <Link
            to="/first-place"
            className="mt-7 inline-block text-[15px] font-semibold underline underline-offset-4"
          >
            See Good Chapter
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <p className="max-w-[52ch] text-[19px] leading-[1.45] text-ink/85">
          Gifts come directly from independent makers and trusted retailers. No platform fees, and
          never marked up above retail.
        </p>
        <Link to="/" className="gc-label gc-link mt-8 inline-block pb-0.5">
          Back to the chapter
        </Link>
      </section>
    </>
  );
}