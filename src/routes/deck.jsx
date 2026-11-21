import { createFileRoute } from "@tanstack/react-router";
import DeckStage from "@/components/deck/DeckStage";

export const Route = createFileRoute("/deck")({
  head: () => ({
    meta: [
      { title: "Investor deck · Good Chapter Co." },
      { name: "description", content: "Good Chapter Co. investor deck." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DeckStage,
});