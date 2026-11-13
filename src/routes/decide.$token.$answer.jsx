import { createFileRoute, notFound } from "@tanstack/react-router";
import { getDecision } from "@/lib/decision-fns";
import DecisionScreen from "@/components/person/DecisionScreen";

export const Route = createFileRoute("/decide/$token/$answer")({
  loader: async ({ params }) => {
    if (params.answer !== "accept" && params.answer !== "decline") throw notFound();
    const decision = await getDecision({ data: { token: params.token, answer: params.answer } });
    if (!decision) throw notFound();
    return decision;
  },
  head: () => ({
    meta: [
      { title: "Your answer | Good Chapter Co." },
      { name: "description", content: "One answer, before anyone else sees the chapter." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DecidePage,
});

function DecidePage() {
  const chapter = Route.useLoaderData();
  const { token, answer } = Route.useParams();

  return <DecisionScreen chapter={chapter} token={token} answer={answer} />;
}