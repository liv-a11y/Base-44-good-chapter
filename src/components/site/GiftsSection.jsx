import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { DRAWINGS } from "@/lib/brand-assets";

export default function GiftsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-28">
      <div className="grid items-end gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        {/* The one loud field on this page. */}
        <div className="flex min-h-[300px] items-center justify-center bg-ink p-10 md:min-h-[420px]">
          <Image
            src={DRAWINGS.gift}
            alt="Drawing of a wrapped gift."
            fittingType="fit"
            className="h-auto w-[62%]"
          />
        </div>
        <div>
          <p className="gc-label text-ink/65">Where gifts come from</p>
          <p className="mt-5 text-[28px] leading-[1.12] sm:text-[38px]">
            Gifts come directly from independent makers, trusted retailers, and friends of Good
            Chapter.
          </p>
          <p className="mt-5 text-[19px] leading-[1.45] text-ink/85">
            No platform fees. Never marked up above retail.
          </p>
          <Link
            to="/read"
            className="mt-6 inline-flex min-h-11 items-center text-[18px] underline underline-offset-[6px] hover:text-cobalt"
          >
            Read our why
          </Link>
        </div>
      </div>
    </section>
  );
}