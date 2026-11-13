import { createFileRoute } from "@tanstack/react-router";
import LegalDoc from "@/components/site/LegalDoc";
import { PRIVACY } from "@/lib/legal-copy";

export const Route = createFileRoute("/_site/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · Good Chapter Co." },
      { name: "description", content: "What Good Chapter, Co. collects, how it is used, and your choices." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <LegalDoc doc={PRIVACY} />;
}