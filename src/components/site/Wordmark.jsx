import { Link } from "@tanstack/react-router";

/** Type-set wordmark. Swap in the supplied lockup artwork when it is uploaded. */
export default function Wordmark({ to = "/", className = "" }) {
  return (
    <Link
      to={to}
      className={`font-heading text-[21px] leading-none tracking-[-0.01em] text-ink ${className}`}
    >
      Good Chapter
    </Link>
  );
}