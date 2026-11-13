import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { LOCKUP_INK, LOCKUP_PAPER } from "@/lib/brand-assets";

/**
 * The supplied lockup: burgundy type and clay tag on paper, or the paper
 * version for burgundy and cobalt bands. Never set as live text, never
 * recoloured, never squashed.
 */
export default function Wordmark({ to = "/", tone = "ink", className = "" }) {
  const src = tone === "reverse" ? LOCKUP_PAPER : LOCKUP_INK;

  return (
    <Link to={to} className={`inline-flex items-center ${className}`} aria-label="Good Chapter Co.">
      <Image
        src={src}
        alt="Good Chapter Co."
        fittingType="fit"
        className="h-[34px] w-auto sm:h-[44px]"
      />
    </Link>
  );
}