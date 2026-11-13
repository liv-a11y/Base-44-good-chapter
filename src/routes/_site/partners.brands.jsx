import { createFileRoute } from "@tanstack/react-router";
import BrandsPage from "@/components/site/BrandsPage";

export const Route = createFileRoute("/_site/partners/brands")({
  head: () => ({
    meta: [
      { title: "Brands & collaborations · Good Chapter Co." },
      {
        name: "description",
        content: "Collaborate with Good Chapter on useful, human-centered gifting moments.",
      },
    ],
  }),
  component: BrandsPage,
});