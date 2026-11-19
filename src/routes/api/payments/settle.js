import { createFileRoute } from "@tanstack/react-router";
import { requireUserRoute } from "@/lib/auth-middleware";
import { sweepPendingContributions } from "@/lib/contributions";

/**
 * Called by the payment event, whether or not the guest came back to the page.
 * The provider event carries no checkout id on every provider, so this sweeps
 * every open contribution and asks about each one.
 */
export const Route = createFileRoute("/api/payments/settle")({
  server: {
    middleware: [requireUserRoute],
    handlers: {
      POST: async ({ context }) => {
        if (context.user?.role !== "admin") {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }

        const service = context.getBase44().asServiceRole;
        const settled = await sweepPendingContributions(service);
        return Response.json({ settled });
      },
    },
  },
});