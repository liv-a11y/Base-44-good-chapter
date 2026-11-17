import { createFileRoute, redirect } from "@tanstack/react-router";
import { listChapters } from "@/lib/curator-fns";
import { listInventoryIdeas } from "@/lib/idea-fns";
import DeskShell from "@/components/desk/DeskShell";
import ChapterTable from "@/components/desk/ChapterTable";
import InventoryBoard from "@/components/desk/InventoryBoard";

export const Route = createFileRoute("/_authed/desk")({
  ssr: false,
  beforeLoad: ({ context }) => {
    if (context.user?.role !== "admin") throw redirect({ to: "/" });
  },
  loader: async () => ({
    chapters: await listChapters(),
    ideas: await listInventoryIdeas(),
  }),
  head: () => ({ meta: [{ title: "Curator desk | Good Chapter Co." }] }),
  component: DeskPage,
});

function DeskPage() {
  const { chapters, ideas } = Route.useLoaderData();
  const open = chapters.filter((chapter) => !["closed", "declined"].includes(chapter.state));

  return (
    <DeskShell>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-5">
        <h1 className="text-[clamp(32px,4vw,48px)]">Chapters</h1>
        <span className="gc-label text-ink/55">{open.length} open</span>
      </div>
      <div className="mt-2">
        <ChapterTable chapters={chapters} />
      </div>
      <InventoryBoard ideas={ideas} />
    </DeskShell>
  );
}