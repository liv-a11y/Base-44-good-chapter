import { createFileRoute } from "@tanstack/react-router";
import { quoteStatus } from "@/lib/quote-fns";
import DeskShell from "@/components/desk/DeskShell";
import QuoteLab from "@/components/desk/QuoteLab";

export const Route = createFileRoute("/_authed/desk/quote")({
  ssr: false,
  loader: () => quoteStatus(),
  head: () => ({ meta: [{ title: "Any-store quote | Curator desk" }] }),
  component: QuotePage,
});

function QuotePage() {
  const status = Route.useLoaderData();

  return (
    <DeskShell>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-5">
        <h1 className="text-[clamp(32px,4vw,48px)]">Price anything, from any store</h1>
        <span className="gc-label text-ink/55">Test bench</span>
      </div>

      <p className="mt-5 max-w-[62ch] text-[19px] leading-[1.4] text-ink/80">
        Paste a product link and a delivery address. The desk asks the store for the real price, with
        shipping and tax, without anyone leaving Good Chapter. This is the test of whether a guest
        could one day pay here for a gift from any shop.
      </p>

      <QuoteLab status={status} />
    </DeskShell>
  );
}
