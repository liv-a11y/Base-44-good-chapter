import { Image } from "@/components/ui/image";

const money = (value) =>
  value == null ? "No price" : Number.isInteger(Number(value)) ? `$${Number(value)}` : `$${Number(value).toFixed(2)}`;

const STATUS_TONE = {
  approved: "border-ink bg-ink text-plaster",
  proposed: "border-clay text-clay",
  retired: "border-ink/30 text-ink/45",
};

export default function AffiliateRow({ product, onUse, onStatus, onEdit, onDelete }) {
  const link = product.affiliate_url || product.product_url;

  return (
    <article className="grid gap-4 border-t border-ink py-5 sm:grid-cols-[88px_minmax(0,1fr)_auto]">
      {product.photo_url ? (
        <Image
          src={product.photo_url}
          alt={product.name}
          className="h-[88px] w-[88px] border border-ink object-cover"
        />
      ) : (
        <div className="h-[88px] w-[88px] border border-ink/30 bg-paper" />
      )}

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-heading text-[21px] leading-tight">{product.name}</h3>
          <span className={`gc-label border px-2 py-0.5 ${STATUS_TONE[product.status] || STATUS_TONE.proposed}`}>
            {product.status}
          </span>
          {product.is_sample ? (
            <span className="gc-label border border-clay px-2 py-0.5 text-clay">Sample</span>
          ) : null}
        </div>

        <p className="gc-label mt-2 text-ink/55">
          {[product.retailer, product.category, money(product.price)].filter(Boolean).join(" · ")}
        </p>

        {product.description ? (
          <p className="mt-2 text-[17px] leading-[1.45] text-ink/80">{product.description}</p>
        ) : null}

        {product.note ? (
          <p className="mt-2 border-l border-ink/30 pl-3 text-[15px] leading-[1.4] text-ink/60">
            {product.note}
          </p>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              className="gc-label gc-link pb-0.5"
            >
              {product.affiliate_url ? "Open affiliate link" : "Open product page"}
            </a>
          ) : null}
          {product.affiliate_url && product.product_url ? (
            <a
              href={product.product_url}
              target="_blank"
              rel="noreferrer noopener"
              className="gc-label text-ink/50 underline underline-offset-4"
            >
              Plain page
            </a>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-x-4 gap-y-2 sm:flex-col sm:items-end">
        <button type="button" onClick={onUse} className="gc-label gc-link pb-0.5">
          Put in a chapter
        </button>
        {product.status !== "approved" ? (
          <button
            type="button"
            onClick={() => onStatus("approved")}
            className="gc-label gc-link pb-0.5"
          >
            Approve
          </button>
        ) : null}
        {product.status !== "retired" ? (
          <button
            type="button"
            onClick={() => onStatus("retired")}
            className="gc-label gc-link pb-0.5"
          >
            Retire
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onStatus("proposed")}
            className="gc-label gc-link pb-0.5"
          >
            Bring back
          </button>
        )}
        <button type="button" onClick={onEdit} className="gc-label gc-link pb-0.5">
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="gc-label border-b border-transparent pb-0.5 text-ink/40 hover:text-clay"
        >
          Delete
        </button>
      </div>
    </article>
  );
}