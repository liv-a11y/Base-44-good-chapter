import { createFileRoute } from "@tanstack/react-router";
import FirstPlacePage from "@/components/site/FirstPlacePage";

export const Route = createFileRoute("/_site/first-place")({
  head: () => ({
    meta: [
      { title: "Maya’s chapter · Good Chapter Co." },
      {
        name: "description",
        content: "Maya just got the keys. One real object, anchored by her agent, for the first night in.",
      },
    ],
  }),
  component: FirstPlacePage,
});