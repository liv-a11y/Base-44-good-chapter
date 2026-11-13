import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Image } from "@/components/ui/image";
import { REPLACE_REASONS } from "@/lib/replace-reasons";

const labelCls = "gc-label mb-1 block text-ink/50";

export default function ItemDialog({ mode, item, saving, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: item?.name || "",
    photo_url: item?.photo_url || "",
    price: item?.price != null ? String(item.price) : "",
    source_url: item?.source_url || "",
    why: item?.why || "",
    reason_code: "",
    note: "",
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
    const price = Number(form.price);
    if (!form.name.trim()) return setError("Give the item a name.");
    if (form.price === "" || !Number.isFinite(price) || price < 0) {
      return setError("Price needs a number.");
    }
    if (!form.why.trim()) return setError("Write why this was chosen for them.");
    if (mode === "replace" && !form.reason_code) return setError("Pick a reason for the change.");

    setError("");
    onSubmit({
      name: form.name.trim(),
      photo_url: form.photo_url,
      price,
      source_url: form.source_url.trim(),
      why: form.why.trim(),
      reason_code: form.reason_code,
      note: form.note.trim(),
    });
  };

  return (
    <Dialog open onOpenChange={(open) => (!open && !saving ? onClose() : null)}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-2 border-ink bg-paper sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle className="font-heading text-[24px] font-normal">
            {mode === "replace" ? "Replace this item" : "Add an item"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className={labelCls} htmlFor="item-name">
              Name
            </label>
            <input
              id="item-name"
              className="gc-input"
              value={form.name}
              onChange={(event) => set({ name: event.target.value })}
              maxLength={120}
            />
          </div>

          <div>
            <span className={labelCls}>Photo</span>
            <div className="flex items-center gap-3">
              {form.photo_url ? (
                <Image
                  src={form.photo_url}
                  alt=""
                  className="h-16 w-16 shrink-0 border-2 border-ink object-cover"
                />
              ) : (
                <div className="h-16 w-16 shrink-0 border-2 border-ink/25 bg-plaster" />
              )}
              <div className="min-w-0 flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => upload(event.target.files?.[0])}
                  className="block w-full text-[13px] text-ink/70"
                />
                <p className="gc-label mt-1 text-ink/40">
                  {uploading ? "Uploading" : "Stored publicly — anyone with the link can open it"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls} htmlFor="item-price">
                Price
              </label>
              <input
                id="item-price"
                className="gc-input"
                value={form.price}
                onChange={(event) => set({ price: event.target.value })}
                inputMode="decimal"
                placeholder="0"
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="item-source">
                Source link
              </label>
              <input
                id="item-source"
                className="gc-input"
                value={form.source_url}
                onChange={(event) => set({ source_url: event.target.value })}
                placeholder="https://"
                maxLength={600}
              />
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="item-why">
              Why it was chosen
            </label>
            <textarea
              id="item-why"
              className="gc-input"
              value={form.why}
              onChange={(event) => set({ why: event.target.value })}
              maxLength={600}
              placeholder="One or two sentences, in plain words."
            />
          </div>

          {mode === "replace" ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="item-reason">
                  Reason for the change
                </label>
                <select
                  id="item-reason"
                  className="gc-input"
                  value={form.reason_code}
                  onChange={(event) => set({ reason_code: event.target.value })}
                >
                  <option value="">Choose</option>
                  {REPLACE_REASONS.map((reason) => (
                    <option key={reason.code} value={reason.code}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="item-note">
                  Note
                </label>
                <input
                  id="item-note"
                  className="gc-input"
                  value={form.note}
                  onChange={(event) => set({ note: event.target.value })}
                  maxLength={400}
                />
              </div>
            </div>
          ) : null}

          {error ? <p className="text-[15px] text-clay">{error}</p> : null}

          <div className="flex items-center justify-between gap-4 pt-2">
            <button type="button" onClick={onClose} className="gc-label text-ink/55">
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading} className="gc-btn">
              <span className="gc-btn-label">
                {saving ? "Saving" : mode === "replace" ? "Replace item" : "Add item"}
              </span>
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}