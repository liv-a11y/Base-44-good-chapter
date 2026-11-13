import { createFileRoute, redirect } from "@tanstack/react-router";
import { listRequests } from "@/lib/requests-fns";
import DeskShell from "@/components/desk/DeskShell";
import RequestList from "@/components/desk/RequestList";

export const Route = createFileRoute("/_authed/desk/requests")({
  ssr: false,
  beforeLoad: ({ context }) => {
    if (context.user?.role !== "admin") throw redirect({ to: "/" });
  },
  loader: () => listRequests(),
  head: () => ({ meta: [{ title: "Requests | Good Chapter Co." }] }),
  component: RequestsPage,
});

function RequestsPage() {
  const requests = Route.useLoaderData();
  const waiting = requests.filter((request) => !request.replied_on).length;

  return (
    <DeskShell>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-5">
        <h1 className="text-[clamp(32px,4vw,48px)]">Requests</h1>
        <span className="gc-label text-ink/55">{waiting} waiting on you</span>
      </div>

      <p className="mt-5 max-w-[58ch] text-[19px] leading-[1.4] text-ink/80">
        Everyone who asked to hear from us. The receipt goes out on its own the moment they submit;
        the reply is yours to write.
      </p>

      <RequestList requests={requests} />
    </DeskShell>
  );
}