import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Image } from "@/components/ui/image";

const labelCls = "gc-label mb-1 block text-ink/50";

/** The curator's record for one product: what it is, who sells it, and the link. */
export default function AffiliateForm({ product, saving, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    retailer: product?.retailer || "",
    category: product?.category || "",
    price: product?.price != null ? String(product.price) : "",
    product_url: product?.product_url || "",
    affiliate_url: product?.affiliate_url || "",
    photo_url: product?.photo_url || "",
    description: product?.description || "",
    note: product?.note || "",
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const set = (patch) => setForm((current) => ({ ...current, ...patch }));

  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      set({ photo_url: file_url });
    } catch {
      setError("That photo did not upload. Try another file.");
    } finally {
      setUploading(false);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return setError("Give the product a name.");
    const price = form.price === "" ? null : Number(form.price);
    if (price != null && (!Number.isFinite(price) || price < 0)) {
      return setError("Price needs a number, or leave it empty.");
    }
    for (const [key, value] of [
      ["product_url", form.product_url],
      ["affiliate_url", form.affiliate_url],
    ]) {
      if (value.trim() && !/^https?:\/\//i.test(value.trim())) {
        return setError(key === "affiliate_url" ? "The affiliate link starts with https://" : "The product link starts with https://");
      }
    }

    setError("");
    onSubmit({
      ...(product?.id ? { id: product.id } : {}),
      name: form.name.trim(),
      retailer: form.retailer.trim(),
      category: form.category.trim(),
      price,
      product_url: form.product_url.trim(),
      affiliate_url: form.affiliate_url.trim(),
      photo_url: form.photo_url,
      description: form.description.trim(),
      note: form.note.trim(),
    });
  };

  return (
    <Dialog open onOpenChange={(open) => (!open && !saving ? onClose() : null)}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-none border border-ink bg-paper sm:max-w-[580px]">
        <DialogHeader>
          <DialogTitle className="font-heading text-[26px] font-normal">
            {product?.id ? "Edit this product" : "Add a product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className={labelCls} htmlFor="ap-name">
              Name
            </label>
            <input
              id="ap-name"
              className="gc-input"
              value={form.name}
              onChange={(event) => set({ name: event.target.value })}
              maxLength={140}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls} htmlFor="ap-retailer">
                Retailer
              </label>
              <input
                id="ap-retailer"
                className="gc-input"
                value={form.retailer}
                onChange={(event) => set({ retailer: event.target.value })}
                maxLength={120}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="ap-category">
                Shelf
              </label>
              <input
                id="ap-category"
                className="gc-input"
                value={form.category}
                onChange={(event) => set({ category: event.target.value })}
                placeholder="Kitchen"
                maxLength={40}
              />
            </div>
          </div>

          <div>
            <span className={labelCls}>Photo</span>
            <div className="flex items-center gap-3">
              {form.photo_url ? (
                <Image
                  src={form.photo_url}
                  alt=""
                  className="h-16 w-16 shrink-0 border border-ink object-cover"
                />
              ) : (
                <div className="h-16 w-16 shrink-0 border border-ink/30 bg-plaster" />
              )}
              <div className="min-w-0 flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => upload(event.target.files?.[0])}
                  className="block w-full text-[15px] text-ink/75"
                />
                <p className="gc-label mt-1 text-ink/40">
                  {uploading
                    ? "Uploading"
                    : "Stored publicly, anyone with the link can open them"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls} htmlFor="ap-price">
                Price
              </label>
              <input
                id="ap-price"
                className="gc-input"
                value={form.price}
                onChange={(event) => set({ price: event.target.value })}
                inputMode="decimal"
                placeholder="0"
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="ap-product-url">
                Product link
              </label>
              <input
                id="ap-product-url"
                className="gc-input"
                value={form.product_url}
                onChange={(event) => set({ product_url: event.target.value })}
                placeholder="https://"
                maxLength={600}
              />
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="ap-affiliate-url">
              Affiliate link
            </label>
            <input
              id="ap-affiliate-url"
              className="gc-input"
              value={form.affiliate_url}
              onChange={(event) => set({ affiliate_url: event.target.value })}
              placeholder="Only when an approved program gives you one"
              maxLength={600}
            />
            <p className="mt-1 text-[15px] leading-[1.4] text-ink/55">
              Leave it empty until the retailer has approved you. The product link is used until then.
            </p>
          </div>

          <div>
            <label className={labelCls} htmlFor="ap-description">
              What it is
            </label>
            <textarea
              id="ap-description"
              className="gc-input"
              value={form.description}
              onChange={(event) => set({ description: event.target.value })}
              maxLength={600}
              placeholder="One or two plain sentences."
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="ap-note">
              Curator note
            </label>
            <input
              id="ap-note"
              className="gc-input"
              value={form.note}
              onChange={(event) => set({ note: event.target.value })}
              maxLength={400}
              placeholder="Why you kept it. What to check before using it again."
            />
          </div>

          {error ? <p className="text-[17px] leading-[1.35] text-clay">{error}</p> : null}

          <div className="flex items-center justify-between gap-4 pt-2">
            <button type="button" onClick={onClose} className="gc-label gc-link pb-0.5">
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading} className="gc-btn">
              <span className="gc-btn-label">
                {saving ? "Saving" : product?.id ? "Save changes" : "Add to library"}
              </span>
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}