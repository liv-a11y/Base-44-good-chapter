import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { TAG_CLAY, WORDMARK_INK, WORDMARK_PAPER } from "@/lib/brand-assets";

const SIZES = {
  sm: "w-[104px]",
  md: "w-[124px] sm:w-[148px]",
  lg: "w-[150px] sm:w-[176px]",
};

/**
 * The horizontal lockup: the official wordmark with the clay tag set over its
 * right corner, in the position and angle the site uses. Ink on paper, paper
 * on burgundy and cobalt.
 */
export default function Wordmark({ to = "/", tone = "ink", size = "md", className = "" }) {
  return (
    <Link
      to={to}
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Good Chapter Co. home"
    >
      <span className={`relative mt-2 block ${SIZES[size] ?? SIZES.md}`}>
        <Image
          src={tone === "reverse" ? WORDMARK_PAPER : WORDMARK_INK}
          alt="Good Chapter Co."
          fittingType="fit"
          className="block h-auto w-full"
        />
        <Image
          src={TAG_CLAY}
          alt=""
          aria-hidden="true"
          className="absolute left-[75%] top-[-20%] h-auto w-[24%] [transform:rotate(-9deg)_scaleX(-1)]"
        />
      </span>
    </Link>
  );
}