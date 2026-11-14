import { Image } from "@/components/ui/image";

const money = (price) => {
  if (price == null || Number.isNaN(Number(price))) return "No price";
  const value = Number(price);
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
};

export default function GiftCard({ item, index }) {
  return (
    <a
      href={item.source_url}
      target="_blank"
      rel="noreferrer noopener"
      className="group block border border-ink bg-paper transition-colors duration-200 hover:bg-plaster"
    >
      <div className="relative aspect-square overflow-hidden border-b border-ink bg-linen">
        {item.photo_url ? (
          <Image
            src={item.photo_url}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="gc-label absolute inset-0 flex items-center justify-center text-ink/35">
            No photo
          </span>
        )}
        <span className="gc-spec absolute left-2 top-2 bg-plaster px-1.5 py-0.5 text-ink/70">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="p-2.5">
        <p className="gc-spec text-ink/55">{money(item.price)}</p>
        <h3 className="mt-1 font-heading text-[16px] leading-[1.15]">{item.name}</h3>
        {item.why ? (
          <p className="mt-1.5 line-clamp-2 text-[14px] leading-[1.35] text-ink/60">{item.why}</p>
        ) : null}
        <p className="gc-label mt-2 truncate text-ink/40">{item.source || "From the shop"}</p>
      </div>
    </a>
  );
}