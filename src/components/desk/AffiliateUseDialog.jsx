import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CHAPTER_STATE_LABELS } from "@/lib/chapter-types";

const labelCls = "gc-label mb-1 block text-ink/50";

/** Choose the chapter this product belongs in, and write why it suits that person. */
export default function AffiliateUseDialog({ product, chapters, saving, onClose, onSubmit }) {
  const [chapterId, setChapterId] = useState(chapters[0]?.id || "");
  const [why, setWhy] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!chapterId) return setError("Pick the chapter first.");
    if (!why.trim()) return setError("Write why this was chosen for them.");
    setError("");
    onSubmit({ product_id: product.id, chapter_id: chapterId, why: why.trim() });
  };

  return (
    <Dialog open onOpenChange={(open) => (!open && !saving ? onClose() : null)}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-none border border-ink bg-paper sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="font-heading text-[26px] font-normal">
            Put {product.name} in a chapter
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className={labelCls} htmlFor="au-chapter">
              Chapter
            </label>
            <select
              id="au-chapter"
              className="gc-input"
              value={chapterId}
              onChange={(event) => setChapterId(event.target.value)}
            >
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.person_name}
                  {chapter.reference ? ` · ${chapter.reference}` : ""} ·{" "}
                  {CHAPTER_STATE_LABELS[chapter.state] || chapter.state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls} htmlFor="au-why">
              Why it was chosen
            </label>
            <textarea
              id="au-why"
              className="gc-input"
              value={why}
              onChange={(event) => setWhy(event.target.value)}
              maxLength={600}
              placeholder="One or two sentences, in plain words."
            />
          </div>

          {error ? <p className="text-[17px] leading-[1.35] text-clay">{error}</p> : null}

          <div className="flex items-center justify-between gap-4 pt-2">
            <button type="button" onClick={onClose} className="gc-label gc-link pb-0.5">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="gc-btn">
              <span className="gc-btn-label">{saving ? "Adding" : "Add to the list"}</span>
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}