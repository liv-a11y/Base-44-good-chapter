import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { Image } from "@/components/ui/image";
import DrawingPlaceholder from "@/components/site/DrawingPlaceholder";
import { addItem, replaceItem, reorderItems } from "@/lib/curator-fns";
import ItemDialog from "@/components/desk/ItemDialog";
import ShopSearch from "@/components/desk/ShopSearch";
import GivingControl from "@/components/desk/GivingControl";

const EIGHT = 8;

const money = (value) => (value == null ? "No price" : `$${value}`);

const ANSWER_LABELS = {
  approved: "The person approved this",
  declined: "The person declined this",
  given: "Given",
};

const answerLabel = (status) => ANSWER_LABELS[status] || "Waiting on the person";

const answerTone = (status) => {
  if (status === "declined") return "text-clay";
  if (status === "approved" || status === "given") return "text-cobalt";
  return "text-ink/50";
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
        <h2 id="slots-heading" className="text-[26px]">
          The eight
        </h2>
        <span className="gc-label text-ink/50">
          {items.length} of {EIGHT}
        </span>
      </div>

      {items.length ? (
        <p className="mt-2 text-[15px] leading-[1.4] text-ink/55">
          Drafts from the shop, pulled in by what the starter answered. Read each one and replace
          what misses before this goes to the person.
        </p>
      ) : null}

      {error ? <p className="mt-2 text-[17px] text-clay">{error}</p> : null}

      <ShopSearch
        chapterId={chapterId}
        disabled={items.length >= EIGHT}
        onPick={(product) =>
          setDialog({
            mode: "add",
            item: {
              name: product.name,
              photo_url: product.photo_url || "",
              price: product.price,
              source_url: product.source_url || "",
              why: "",
            },
          })
        }
      />

      <div className="mt-5 space-y-3">
        {Array.from({ length: EIGHT }).map((_, index) => {
          const item = items[index];
          return item ? (
            <article key={item.id} className="border border-ink bg-paper p-4">
              <div className="flex gap-4">
                {item.photo_url ? (
                  <Image
                    src={item.photo_url}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 border border-ink object-cover"
                  />
                ) : (
                  <DrawingPlaceholder label="No drawing" className="h-20 w-20 shrink-0" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="gc-spec text-ink/50">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="font-heading text-[22px] leading-tight">{item.name}</h3>
                    </div>
                    <p className="gc-spec shrink-0">{money(item.price)}</p>
                  </div>

                  <p className="mt-1 text-[19px] leading-[1.35] text-ink/85">{item.why}</p>

                  <p className={`gc-label mt-2 ${answerTone(item.status)}`}>
                    {answerLabel(item.status)}
                  </p>

                  <GivingControl chapterId={chapterId} item={item} />

                  {item.claim ? (
                    <p className="gc-label mt-1 text-ink/55">Taken by {item.claim}</p>
                  ) : null}

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="gc-label truncate text-ink/50">
                      {item.source || "No source"}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        aria-label={`Move ${item.name} up`}
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        className="flex h-8 w-8 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-plaster disabled:border-ink/25 disabled:text-ink/30 disabled:hover:bg-transparent disabled:hover:text-ink/30"
                      >
                        <ArrowUp size={14} strokeWidth={1.8} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Move ${item.name} down`}
                        onClick={() => move(index, 1)}
                        disabled={index === items.length - 1}
                        className="flex h-8 w-8 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-plaster disabled:border-ink/25 disabled:text-ink/30 disabled:hover:bg-transparent disabled:hover:text-ink/30"
                      >
                        <ArrowDown size={14} strokeWidth={1.8} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDialog({ mode: "replace", item })}
                        className="gc-label gc-link ml-2 pb-0.5"
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
              className="flex w-full items-center gap-3 border border-dashed border-ink/35 px-4 py-5 text-left transition-colors hover:border-ink hover:bg-paper disabled:hover:border-ink/35 disabled:hover:bg-transparent"
            >
              <span className="gc-spec w-6 shrink-0 text-ink/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="gc-label flex items-center gap-2 text-ink/60">
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