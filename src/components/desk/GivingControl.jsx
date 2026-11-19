import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { setItemGiving } from "@/lib/curator-fns";

const money = (value) => `$${Number(value || 0).toLocaleString("en-US")}`;

const chip = (active) =>
  `gc-label border px-2.5 py-1.5 transition-colors ${
    active
      ? "border-ink bg-ink text-plaster"
      : "border-ink/40 text-ink/60 hover:border-ink hover:text-ink"
  }`;

/** How one item is given: by one person, or by several putting in together. */
export default function GivingControl({ chapterId, item }) {
  const router = useRouter();
  const save = useServerFn(setItemGiving);
  const [target, setTarget] = useState(item.pool_target ? String(item.pool_target) : "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const pool = item.giving_mode === "pool";

  const commit = async (mode, value) => {
    setSaving(true);
    setError("");
    try {
      await save({
        data: {
          chapter_id: chapterId,
          item_id: item.id,
          giving_mode: mode,
          pool_target: value,
        },
      });
      await router.invalidate();
    } catch (cause) {
      setError(cause?.message || "That did not save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-3 border-t border-ink/20 pt-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="gc-label mr-1 text-ink/45">Given by</span>
        <button
          type="button"
          className={chip(!pool)}
          disabled={saving}
          onClick={() => commit("individual")}
        >
          One person
        </button>
        <button
          type="button"
          className={chip(pool)}
          disabled={saving}
          onClick={() => commit("pool", Number(target) || item.price || 0)}
        >
          Several put in
        </button>
      </div>

      {pool ? (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            className="gc-input h-10 w-32"
            value={target}
            inputMode="decimal"
            aria-label="What the pooled item needs in total"
            onChange={(event) => setTarget(event.target.value.replace(/[^\d.]/g, ""))}
          />
          <button
            type="button"
            className="gc-label gc-link pb-0.5"
            disabled={saving}
            onClick={() => commit("pool", Number(target))}
          >
            Save target
          </button>
          {item.collected > 0 ? (
            <span className="gc-spec text-ink/55">
              {money(item.collected)} in
            </span>
          ) : null}
        </div>
      ) : null}

      {error ? <p className="mt-2 text-[16px] leading-snug text-clay">{error}</p> : null}
    </div>
  );
}