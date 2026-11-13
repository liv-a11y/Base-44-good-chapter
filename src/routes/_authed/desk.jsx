import { createFileRoute, redirect } from "@tanstack/react-router";
import { listChapters } from "@/lib/curator-fns";
import DeskShell from "@/components/desk/DeskShell";
import ChapterTable from "@/components/desk/ChapterTable";

export const Route = createFileRoute("/_authed/desk")({
  ssr: false,
  beforeLoad: ({ context }) => {
    if (context.user?.role !== "admin") throw redirect({ to: "/" });
  },
  loader: () => listChapters(),
  head: () => ({ meta: [{ title: "Curator desk | Good Chapter Co." }] }),
  component: DeskPage,
});

function DeskPage() {
  const chapters = Route.useLoaderData();
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
    </DeskShell>
  );
}