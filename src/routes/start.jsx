import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { startChapter } from "@/lib/server-fns";
import StartLayout from "@/components/start/StartLayout";
import PersonStep from "@/components/start/steps/PersonStep";
import TypeStep from "@/components/start/steps/TypeStep";
import PromptStep from "@/components/start/steps/PromptStep";
import StarterStep from "@/components/start/steps/StarterStep";
import GuestsStep from "@/components/start/steps/GuestsStep";
import InterviewStep from "@/components/start/steps/InterviewStep";
import DoneStep from "@/components/start/steps/DoneStep";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start a chapter | Good Chapter Co." },
      {
        name: "description",
        content: "Answer a few questions about the person. A curator builds eight things. Nothing is sent until they say yes.",
      },
    ],
  }),
  component: StartPage,
});

const TOTAL = 8;

const EMPTY_FORM = {
  personName: "",
  personEmail: "",
  chapterType: "",
  alwaysWears: "",
  rewatches: "",
  neverBuys: "",
  starterIdeas: "",
  starterName: "",
  starterEmail: "",
  guests: [{ name: "", email: "" }],
};

function StartPage() {
  const submitChapter = useServerFn(startChapter);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (patch) => setForm((current) => ({ ...current, ...patch }));
  const goNext = () => {
    setError("");
    setStep((current) => Math.min(current + 1, TOTAL));
  };
  const goBack = () => {
    setError("");
    setStep((current) => Math.max(current - 1, 0));
  };
  const restart = () => {
    setForm(EMPTY_FORM);
    setResult(null);
    setError("");
    setStep(0);
  };

  const finish = async () => {
    const guests = form.guests.filter((row) => row.name.trim() || row.email.trim());
    if (guests.length === 0) {
      setError("Add at least one guest, with a name and an email.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const response = await submitChapter({ data: { ...form, guests } });
      setResult(response);
    } catch {
      setError("This did not save. Try once more.");
    } finally {
      setSubmitting(false);
    }
  };

  let screen = null;
  if (result) {
    screen = <DoneStep result={result} form={form} onRestart={restart} />;
  } else if (step === 0) {
    screen = <PersonStep form={form} update={update} onNext={goNext} />;
  } else if (step === 1) {
    screen = <TypeStep form={form} update={update} onNext={goNext} onBack={goBack} />;
  } else if (step === 2) {
    screen = (
      <PromptStep
        label="Prompt one of three"
        question="What do they always wear?"
        hint="A jacket they replace every year. The same boots. A ring they never take off."
        placeholder="The same grey wool coat, every day, from the start of October."
        value={form.alwaysWears}
        onChange={(value) => update({ alwaysWears: value })}
        onNext={goNext}
        onBack={goBack}
      />
    );
  } else if (step === 3) {
    screen = (
      <PromptStep
        label="Prompt two of three"
        question="What do they rewatch?"
        hint="Not their favourite film. The one that is always on in the background."
        placeholder="The same cooking show, from the start, every winter."
        value={form.rewatches}
        onChange={(value) => update({ rewatches: value })}
        onNext={goNext}
        onBack={goBack}
      />
    );
  } else if (step === 4) {
    screen = (
      <PromptStep
        label="Prompt three of three"
        question="What would they never buy themselves?"
        hint="Something they would pick up, smile at, and put back."
        placeholder="Anything that costs more than twenty dollars for the kitchen."
        value={form.neverBuys}
        onChange={(value) => update({ neverBuys: value })}
        onNext={goNext}
        onBack={goBack}
      />
    );
  } else if (step === 5) {
    screen = <InterviewStep form={form} update={update} onNext={goNext} onBack={goBack} />;
  } else if (step === 6) {
    screen = <StarterStep form={form} update={update} onNext={goNext} onBack={goBack} />;
  } else if (step === 7) {
    screen = (
      <GuestsStep
        form={form}
        update={update}
        onNext={finish}
        onBack={goBack}
        error={error}
      />
    );
  }

  return (
    <StartLayout step={result ? TOTAL - 1 : step} total={TOTAL}>
      {submitting ? <p className="gc-label mb-6 text-ink/55">Saving</p> : null}
      {screen}
    </StartLayout>
  );
}