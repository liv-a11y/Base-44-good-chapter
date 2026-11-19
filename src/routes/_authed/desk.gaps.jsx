import { createFileRoute } from "@tanstack/react-router";
import { inventoryGapReport } from "@/lib/idea-fns";
import DeskShell from "@/components/desk/DeskShell";
import GapCategories from "@/components/desk/GapCategories";
import RecentGapRequests from "@/components/desk/RecentGapRequests";

export const Route = createFileRoute("/_authed/desk/gaps")({
  ssr: false,
  loader: () => inventoryGapReport(),
  head: () => ({ meta: [{ title: "Inventory gaps | Curator desk" }] }),
  component: GapsPage,
});

function GapsPage() {
  const report = Route.useLoaderData();

  return (
    <DeskShell>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-5">
        <h1 className="text-[clamp(32px,4vw,48px)]">Where the shop is thin</h1>
        <span className="gc-label text-ink/55">
          {report.total} kept / {report.recentTotal} in {report.windowDays} days
        </span>
      </div>

      <p className="mt-5 max-w-[62ch] text-[19px] leading-[1.4] text-ink/80">
        Every concept a chapter needed and the shop could not answer, grouped by the category the desk
        gave it. A category that keeps coming back is the next shelf to stock.
      </p>

      <GapCategories categories={report.categories} />
      <RecentGapRequests rows={report.recent} windowDays={report.windowDays} />
    </DeskShell>
  );
}