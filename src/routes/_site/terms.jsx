import { createFileRoute } from "@tanstack/react-router";
import LegalDoc from "@/components/site/LegalDoc";
import { TERMS } from "@/lib/legal-copy";

export const Route = createFileRoute("/_site/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use · Good Chapter Co." },
      { name: "description", content: "The terms that cover your use of goodchaptercollective.com." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return <LegalDoc doc={TERMS} />;
}