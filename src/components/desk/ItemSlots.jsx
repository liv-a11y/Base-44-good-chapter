import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { Image } from "@/components/ui/image";
import { addItem, replaceItem, reorderItems } from "@/lib/curator-fns";
import ItemDialog from "@/components/desk/ItemDialog";

const EIGHT = 8;

const money = (value) => (value == null ? "—" : `$${value}`);

const ANSWER_LABELS = {
  approved: "The person approved this",
  declined: "The person declined this",
  given: "Given",
};

const answerLabel = (status) => ANSWER_LABELS[status] || "Waiting on the person";

const answerTone = (status) => {
  if (status === "declined") return "text-clay";
  if (status === "approved" || status === "given") return "text-cobalt";
  return "text-ink/40";
};

export default function ItemSlots({ chapterId, items }) {
  const router = useRouter();
  const add = useServerFn(addItem);
  const replace = useServerFn(replaceItem);
  const reorder = useServerFn(reorderItems);

  const [dialog, setDialog] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const move = async (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setError("");
    try {
      await reorder({ data: { chapter_id: chapterId, ids: next.map((item) => item.id) } });
      await router.invalidate();
    } catch {
      setError("The order did not save.");
    }
  };

  const submit = async (values) => {
    setSaving(true);
    setError("");
    try {
      if (dialog.mode === "replace") {
        await replace({
          data: { chapter_id: chapterId, item_id: dialog.item.id, ...values },
        });
      } else {
        await add({ data: { chapter_id: chapterId, ...values } });
      }
      setDialog(null);
      await router.invalidate();
    } catch (cause) {
      setError(cause?.message || "That did not save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section aria-labelledby="slots-heading">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="slots-heading" className="text-[22px]">
          The eight
        </h2>
        <span className="gc-label text-ink/45">
          {items.length} of {EIGHT}
        </span>
      </div>

      {error ? <p className="mt-2 text-[15px] text-clay">{error}</p> : null}

      <div className="mt-3 space-y-3">
        {Array.from({ length: EIGHT }).map((_, index) => {
          const item = items[index];
          return item ? (
            <article key={item.id} className="border-2 border-ink bg-paper p-4">
              <div className="flex gap-4">
                {item.photo_url ? (
                  <Image
                    src={item.photo_url}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 border-2 border-ink object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 shrink-0 border-2 border-ink/25 bg-plaster" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="gc-label text-ink/40">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="font-heading text-[19px] leading-tight">{item.name}</h3>
                    </div>
                    <p className="shrink-0 font-mono text-[13px]">{money(item.price)}</p>
                  </div>

                  <p className="mt-1 text-[15px] leading-relaxed text-ink/75">{item.why}</p>

                  <p className={`gc-label mt-2 ${answerTone(item.status)}`}>
                    {answerLabel(item.status)}
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="gc-label truncate text-ink/40">
                      {item.source || "No source"}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        aria-label={`Move ${item.name} up`}
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        className="flex h-8 w-8 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-plaster disabled:border-ink/20 disabled:text-ink/25 disabled:hover:bg-transparent disabled:hover:text-ink/25"
                      >
                        <ArrowUp size={14} strokeWidth={1.8} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Move ${item.name} down`}
                        onClick={() => move(index, 1)}
                        disabled={index === items.length - 1}
                        className="flex h-8 w-8 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-plaster disabled:border-ink/20 disabled:text-ink/25 disabled:hover:bg-transparent disabled:hover:text-ink/25"
                      >
                        <ArrowDown size={14} strokeWidth={1.8} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDialog({ mode: "replace", item })}
                        className="gc-label border-b-2 border-transparent pb-0.5 text-cobalt transition-colors hover:border-cobalt"
                      >
                        Replace
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <button
              key={`empty-${index}`}
              type="button"
              onClick={() => setDialog({ mode: "add" })}
              disabled={items.length >= EIGHT}
              className="flex w-full items-center gap-3 border-2 border-dashed border-ink/25 px-4 py-5 text-left transition-colors hover:border-ink hover:bg-paper disabled:hover:border-ink/25 disabled:hover:bg-transparent"
            >
              <span className="gc-label w-6 shrink-0 text-ink/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="gc-label flex items-center gap-2 text-ink/55">
                <Plus size={14} strokeWidth={1.8} /> Add an item
              </span>
            </button>
          );
        })}
      </div>

      {dialog ? (
        <ItemDialog
          mode={dialog.mode}
          item={dialog.item}
          saving={saving}
          onClose={() => setDialog(null)}
          onSubmit={submit}
        />
      ) : null}
    </section>
  );
}