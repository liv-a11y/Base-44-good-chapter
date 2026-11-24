import { useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  deleteAffiliateProduct,
  listAffiliateProducts,
  saveAffiliateProduct,
  setAffiliateStatus,
  useProductInChapter,
} from "@/lib/affiliate-fns";
import { listChapters } from "@/lib/curator-fns";
import DeskShell from "@/components/desk/DeskShell";
import AffiliateRow from "@/components/desk/AffiliateRow";
import AffiliateForm from "@/components/desk/AffiliateForm";
import AffiliateUseDialog from "@/components/desk/AffiliateUseDialog";

export const Route = createFileRoute("/_authed/desk/library")({
  ssr: false,
  beforeLoad: ({ context }) => {
    if (context.user?.role !== "admin") throw redirect({ to: "/" });
  },
  loader: async () => {
    const [library, chapters] = await Promise.all([
      listAffiliateProducts({ data: {} }),
      listChapters(),
    ]);
    return { library, chapters };
  },
  head: () => ({ meta: [{ title: "Product library | Curator desk" }] }),
  component: LibraryPage,
});

const STATUS_TABS = [
  { key: "", label: "Everything" },
  { key: "approved", label: "Approved" },
  { key: "proposed", label: "To review" },
  { key: "retired", label: "Retired" },
];

function LibraryPage() {
  const data = Route.useLoaderData();
  const list = useServerFn(listAffiliateProducts);
  const save = useServerFn(saveAffiliateProduct);
  const setStatus = useServerFn(setAffiliateStatus);
  const remove = useServerFn(deleteAffiliateProduct);
  const putInChapter = useServerFn(useProductInChapter);

  const [rows, setRows] = useState(data.library.rows);
  const [meta, setMeta] = useState({ categories: data.library.categories, counts: data.library.counts });
  const [filters, setFilters] = useState({ query: "", category: "", status: "" });
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [using, setUsing] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [notice, setNotice] = useState("");

  const reload = async (next) => {
    setFilters(next);
    setBusy(true);
    try {
      const result = await list({ data: next });
      setRows(result.rows);
      setMeta({ categories: result.categories, counts: result.counts });
    } finally {
      setBusy(false);
    }
  };

  const search = (event) => {
    event.preventDefault();
    reload({ ...filters, query: draft.trim() });
  };

  const saveProduct = async (values) => {
    setSaving(true);
    try {
      await save({ data: values });
      setEditing(null);
      setNotice(values.id ? "Saved." : "Added. It waits in To review.");
      await reload(filters);
    } finally {
      setSaving(false);
    }
  };

  const changeStatus = async (product, status) => {
    setNotice("");
    await setStatus({ data: { id: product.id, status } });
    await reload(filters);
  };

  const removeProduct = async (product) => {
    if (!window.confirm(`Delete ${product.name} from the library?`)) return;
    setNotice("");
    await remove({ data: { id: product.id } });
    await reload(filters);
  };

  const place = async (values) => {
    setPlacing(true);
    try {
      const result = await putInChapter({ data: values });
      setUsing(null);
      setNotice(`Added to ${data.chapters.find((row) => row.id === result.chapter_id)?.person_name || "the chapter"}.`);
    } finally {
      setPlacing(false);
    }
  };

  const { counts } = meta;

  return (
    <DeskShell>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-5">
        <div>
          <h1 className="text-[clamp(32px,4vw,48px)]">The product library</h1>
          <p className="gc-label mt-3 text-ink/55">
            {counts.all} kept · {counts.approved} approved · {counts.proposed} to review
          </p>
        </div>
        <button type="button" onClick={() => setEditing({})} className="gc-btn">
          <span className="gc-btn-label">Add a product</span>
        </button>
      </div>

      <p className="mt-5 max-w-[64ch] text-[19px] leading-[1.45] text-ink/80">
        Products you would stand behind, with the retailer and the link. A product waits in To review
        until you approve it. Putting one in a chapter still means writing why it suits that person.
      </p>

      <form onSubmit={search} className="mt-6 flex flex-wrap items-stretch gap-2">
        <input
          className="gc-input max-w-[380px]"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Search the library"
          maxLength={80}
          aria-label="Search the product library"
        />
        <button type="submit" className="gc-btn shrink-0" disabled={busy}>
          <span className="gc-btn-label">{busy ? "Searching" : "Search"}</span>
        </button>
      </form>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            aria-pressed={filters.status === tab.key}
            onClick={() => reload({ ...filters, status: tab.key })}
            className="gc-option !w-auto !py-2 !text-[17px]"
          >
            {tab.label}
            {tab.key ? <span className="gc-spec ml-2 text-ink/40">{counts[tab.key] ?? 0}</span> : null}
          </button>
        ))}
      </div>

      {meta.categories.length ? (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="gc-label text-ink/40">Shelves</span>
          <button
            type="button"
            onClick={() => reload({ ...filters, category: "" })}
            className={`gc-label pb-0.5 ${filters.category ? "text-ink/50 underline underline-offset-4" : "text-ink"}`}
          >
            All
          </button>
          {meta.categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => reload({ ...filters, category })}
              className={`gc-label pb-0.5 ${
                filters.category === category ? "text-ink border-b border-ink" : "text-ink/50 hover:text-ink"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}

      {notice ? <p className="mt-5 border border-ink bg-paper px-4 py-2 text-[16px]">{notice}</p> : null}

      {rows.length ? (
        <div className="mt-6">
          {rows.map((product) => (
            <AffiliateRow
              key={product.id}
              product={product}
              onUse={() => setUsing(product)}
              onStatus={(status) => changeStatus(product, status)}
              onEdit={() => setEditing(product)}
              onDelete={() => removeProduct(product)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-ink bg-paper p-8">
          <h2 className="font-heading text-[24px] leading-tight">Nothing here yet.</h2>
          <p className="mt-3 max-w-[52ch] text-[18px] leading-[1.5] text-ink/80">
            {filters.query || filters.category || filters.status
              ? "Nothing matches that. Clear the search or pick another shelf."
              : "Add the first product you would put in a chapter. The library keeps the retailer, the link, and why you kept it."}
          </p>
          {filters.query || filters.category || filters.status ? (
            <button
              type="button"
              onClick={() => {
                setDraft("");
                reload({ query: "", category: "", status: "" });
              }}
              className="gc-label gc-link mt-4 pb-0.5"
            >
              Clear the filters
            </button>
          ) : (
            <button type="button" onClick={() => setEditing({})} className="gc-btn mt-5">
              <span className="gc-btn-label">Add the first product</span>
            </button>
          )}
        </div>
      )}

      <p className="mt-12 max-w-[64ch] border-t border-ink/30 pt-4 text-[15px] leading-[1.5] text-ink/55">
        A link is only an affiliate link once the retailer has approved you and given you one. Until
        then the plain product page is used. Check each program before you rely on it: photos and
        descriptions belong to the retailer, and approval is theirs to give.
      </p>

      {editing ? (
        <AffiliateForm
          product={editing.id ? editing : null}
          saving={saving}
          onClose={() => setEditing(null)}
          onSubmit={saveProduct}
        />
      ) : null}

      {using && data.chapters.length ? (
        <AffiliateUseDialog
          product={using}
          chapters={data.chapters}
          saving={placing}
          onClose={() => setUsing(null)}
          onSubmit={place}
        />
      ) : null}

      {using && !data.chapters.length ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6">
          <div className="max-w-[440px] border border-ink bg-paper p-6">
            <h2 className="font-heading text-[24px] leading-tight">No chapters yet.</h2>
            <p className="mt-3 text-[17px] leading-[1.45] text-ink/80">
              A chapter has to exist before a product can go into one.
            </p>
            <button type="button" onClick={() => setUsing(null)} className="gc-label gc-link mt-5 pb-0.5">
              Close
            </button>
          </div>
        </div>
      ) : null}
    </DeskShell>
  );
}