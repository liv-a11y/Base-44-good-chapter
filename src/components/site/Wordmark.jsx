import { Link } from "@tanstack/react-router";

/**
 * Type-set wordmark, standing in until the lockup files are uploaded:
 * lockup-horizontal-ink.svg on paper, lockup-horizontal-reverse.svg on cobalt,
 * clay or burgundy. Swap the link contents for the image once both exist.
 */
export default function Wordmark({ to = "/", tone = "ink", className = "" }) {
  const color = tone === "reverse" ? "text-plaster" : "text-ink";

  return (
    <Link
      to={to}
      className={`font-heading text-[20px] leading-none tracking-[-0.01em] ${color} ${className}`}
    >
      Good Chapter Co.
    </Link>
  );
}