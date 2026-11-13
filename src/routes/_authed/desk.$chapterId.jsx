import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { getChapter } from "@/lib/curator-fns";
import { CHAPTER_STATE_LABELS } from "@/lib/chapter-types";
import DeskShell from "@/components/desk/DeskShell";
import AnswersPanel from "@/components/desk/AnswersPanel";
import ItemSlots from "@/components/desk/ItemSlots";
import StateBar from "@/components/desk/StateBar";

export const Route = createFileRoute("/_authed/desk/$chapterId")({
  ssr: false,
  beforeLoad: ({ context }) => {
    if (context.user?.role !== "admin") throw redirect({ to: "/" });
  },
  loader: async ({ params }) => {
    const data = await getChapter({ data: { id: params.chapterId } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.chapter?.person_name ?? "Chapter"} | Curator desk` }],
  }),
  component: ChapterPage,
});

function ChapterPage() {
  const { chapter, items, guests, reasons } = Route.useLoaderData();

  return (
    <DeskShell>
      <Link to="/desk" className="gc-label gc-link pb-0.5">
        All chapters
      </Link>

      <div className="mt-4 flex flex-col gap-6 border-b border-ink pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[clamp(32px,4vw,52px)]">{chapter.person_name}</h1>
          <p className="gc-label mt-3 text-ink/55">
            {chapter.chapter_type}
            {chapter.reference ? ` · ${chapter.reference}` : ""} ·{" "}
            {CHAPTER_STATE_LABELS[chapter.state] || chapter.state}
          </p>
        </div>
        <StateBar chapter={chapter} itemCount={items.length} />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <AnswersPanel chapter={chapter} guests={guests} reasons={reasons} />
        <ItemSlots chapterId={chapter.id} items={items} />
      </div>
    </DeskShell>
  );
}