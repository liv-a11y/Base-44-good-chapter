import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Image } from "@/components/ui/image";
import { searchShop } from "@/lib/shop-fns";
import { saveInventoryIdea, suggestInventoryIdea } from "@/lib/idea-fns";
import IdeaCard from "@/components/desk/IdeaCard";

const money = (value) =>
  value == null || Number.isNaN(Number(value))
    ? "No price"
    : Number.isInteger(Number(value))
      ? `$${Number(value)}`
      : `$${Number(value).toFixed(2)}`;

/** Search the store from the desk. Picking a product opens the item form, filled in. */
export default function ShopSearch({ chapterId, onPick, disabled }) {
  const router = useRouter();
  const search = useServerFn(searchShop);
  const ask = useServerFn(suggestInventoryIdea);
  const keep = useServerFn(saveInventoryIdea);

  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [disconnected, setDisconnected] = useState(false);
  const [error, setError] = useState("");

  const [idea, setIdea] = useState(null);
  const [asking, setAsking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const run = async (event) => {
    event.preventDefault();
    setError("");
    setSearching(true);
    setIdea(null);
    setSaved(false);
    try {
      const result = await search({ data: { query: query.trim() } });
      setDisconnected(!result.connected);
      setItems(result.items || []);
      setSearched(true);
    } catch {
      setError("The shop did not answer. Try once more.");
    } finally {
      setSearching(false);
    }
  };

  const nameSomething = async () => {
    setAsking(true);
    setError("");
    try {
      const result = await ask({ data: { chapter_id: chapterId, query: query.trim() } });
      setIdea(result.idea);
      setSaved(false);
    } catch {
      setError("The desk could not name anything. Try once more.");
    } finally {
      setAsking(false);
    }
  };

  const keepIdea = async () => {
    setSaving(true);
    setError("");
    try {
      await keep({ data: { chapter_id: chapterId, ...idea } });
      setSaved(true);
      await router.invalidate();
    } catch {
      setError("That idea did not save.");
    } finally {
      setSaving(false);
    }
  };

  const empty = searched && !disconnected && !items.length && !error;

  return (
    <div className="mt-6 border border-ink bg-paper p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="gc-label text-ink/55">Search the shop</h3>
        {items.length ? <span className="gc-spec text-ink/40">{items.length} found</span> : null}
      </div>

      <form onSubmit={run} className="mt-2 flex items-stretch gap-2">
        <input
          className="gc-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Grey wool coat"
          maxLength={80}
          aria-label="Search the shop"
        />
        <button
          type="submit"
          className="gc-btn shrink-0"
          disabled={searching || disabled}
        >
          <span className="gc-btn-label">{searching ? "Searching" : "Search"}</span>
        </button>
      </form>

      {disabled ? (
        <p className="mt-2 text-[15px] leading-[1.4] text-ink/50">
          Eight is the limit. Replace something to use a different product.
        </p>
      ) : null}

      {disconnected ? (
        <p className="mt-2 text-[15px] leading-[1.4] text-clay">
          The shop is not connected. Add the store address and its storefront token first.
        </p>
      ) : null}

      {error ? <p className="mt-2 text-[17px] text-clay">{error}</p> : null}

      {empty ? (
        <div className="mt-2">
          <p className="text-[15px] leading-[1.4] text-ink/55">
            Nothing in the shop matches that. Try a shorter search, in plain words.
          </p>
          {chapterId && !idea ? (
            <button
              type="button"
              onClick={nameSomething}
              disabled={asking}
              className="gc-label gc-link mt-2 pb-0.5 disabled:border-b-0 disabled:text-ink/30"
            >
              {asking ? "Naming one" : "Name the closest thing anyway"}
            </button>
          ) : null}
        </div>
      ) : null}

      {idea ? (
        <div className="mt-3">
          <IdeaCard idea={idea} onSave={keepIdea} saved={saved} saving={saving} />
        </div>
      ) : null}

      {items.length ? (
        <ul className="mt-3 max-h-[360px] overflow-y-auto">
          {items.map((product) => (
            <li
              key={product.id}
              className="flex items-center gap-3 border-t border-ink/20 py-2.5"
            >
              {product.photo_url ? (
                <Image
                  src={product.photo_url}
                  alt={product.name}
                  className="h-12 w-12 shrink-0 border border-ink object-cover"
                />
              ) : (
                <span className="h-12 w-12 shrink-0 border border-ink/30 bg-plaster" />
              )}
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 font-heading text-[16px] leading-tight">
                  {product.name}
                </p>
                <p className="gc-spec text-ink/50">{money(product.price)}</p>
              </div>
              <button
                type="button"
                onClick={() => onPick(product)}
                disabled={disabled}
                className="gc-label gc-link shrink-0 pb-0.5 disabled:border-b-0 disabled:text-ink/30"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}