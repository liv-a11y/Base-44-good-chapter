import { createFileRoute } from "@tanstack/react-router";
import GivingPage from "@/components/site/GivingPage";

export const Route = createFileRoute("/_site/giving")({
  head: () => ({
    meta: [
      { title: "Giving back · Good Chapter Co." },
      { name: "description", content: "A share of every chapter goes to a nonprofit that knows it." },
    ],
  }),
  component: GivingPage,
});