import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

/**
 * The desk frame only. Each view inside it renders its own shell and its own
 * data, so the desk can hold more than one screen.
 */
export const Route = createFileRoute("/_authed/desk")({
  ssr: false,
  beforeLoad: ({ context }) => {
    if (context.user?.role !== "admin") throw redirect({ to: "/" });
  },
  component: DeskFrame,
});

function DeskFrame() {
  return <Outlet />;
}