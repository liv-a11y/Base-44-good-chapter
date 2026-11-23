import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/site/Hero";
import ChapterGrid from "@/components/site/ChapterGrid";
import HowItWorks from "@/components/site/HowItWorks";
import Promises from "@/components/site/Promises";
import GiftsSection from "@/components/site/GiftsSection";
import InviteSection from "@/components/site/InviteSection";
import WhyWeExist from "@/components/site/WhyWeExist";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "Good Chapter Co." },
      {
        name: "description",
        content: "A friend starts it. The person approves it. Nobody asks.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <ChapterGrid />
      <HowItWorks />
      <Promises />
      <GiftsSection />
      <InviteSection />
      <WhyWeExist />
    </>
  );
}