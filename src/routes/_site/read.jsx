import { createFileRoute } from "@tanstack/react-router";
import ReadPage from "@/components/site/ReadPage";

export const Route = createFileRoute("/_site/read")({
  head: () => ({
    meta: [
      { title: "Read · Good Chapter Co." },
      {
        name: "description",
        content:
          "Essays on the cultural rules that keep people from being celebrated, and how a friend can start it instead.",
      },
    ],
  }),
  component: ReadPage,
});