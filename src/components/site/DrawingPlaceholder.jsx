/** Where a drawing is missing: a linen block with a label, never a drawn stand-in. */
export default function DrawingPlaceholder({ label, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center border border-ink/30 bg-paper ${className}`}
    >
      <span className="gc-label px-3 text-center text-[13px] text-ink/45">
        {label || "Drawing to come"}
      </span>
    </div>
  );
}