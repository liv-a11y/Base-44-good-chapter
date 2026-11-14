import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { startChapter } from "@/lib/server-fns";
import StartLayout from "@/components/start/StartLayout";
import PathStep from "@/components/start/steps/PathStep";
import PersonStep from "@/components/start/steps/PersonStep";
import TypeStep from "@/components/start/steps/TypeStep";
import PromptStep from "@/components/start/steps/PromptStep";
import StarterStep from "@/components/start/steps/StarterStep";
import GuestsStep from "@/components/start/steps/GuestsStep";
import InterviewStep from "@/components/start/steps/InterviewStep";
import AnchorStep from "@/components/start/steps/AnchorStep";
import PoolStep from "@/components/start/steps/PoolStep";
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

/** The pool path skips the interview and the anchor. Everything else is shared. */
const stepsFor = (path) => [
  "path",
  "person",
  "type",
  "prompt1",
  "prompt2",
  "prompt3",
  ...(path === "employer_pool" ? ["pool"] : ["interview", "anchor"]),
  "starter",
  "guests",
];

const EMPTY_FORM = {
  path: "",
  personName: "",
  personEmail: "",
  chapterType: "",
  alwaysWears: "",
  rewatches: "",
  neverBuys: "",
  starterIdeas: "",
  anchorIdea: "",
  anchorNote: "",
  poolEmployer: "",
  poolAmount: "",
  poolTerm: "",
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

  const steps = stepsFor(form.path);
  const current = steps[Math.min(step, steps.length - 1)];

  const update = (patch) => setForm((value) => ({ ...value, ...patch }));
  const goNext = () => {
    setError("");
    setStep((value) => Math.min(value + 1, steps.length));
  };
  const goBack = () => {
    setError("");
    setStep((value) => Math.max(value - 1, 0));
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
      const response = await submitChapter({
        data: {
          ...form,
          poolAmount: form.path === "employer_pool" ? Number(form.poolAmount) : undefined,
          guests,
        },
      });
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
  } else if (current === "path") {
    screen = <PathStep form={form} update={update} onNext={goNext} />;
  } else if (current === "person") {
    screen = <PersonStep form={form} update={update} onNext={goNext} onBack={goBack} />;
  } else if (current === "type") {
    screen = <TypeStep form={form} update={update} onNext={goNext} onBack={goBack} />;
  } else if (current === "prompt1") {
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
  } else if (current === "prompt2") {
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
  } else if (current === "prompt3") {
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
  } else if (current === "interview") {
    screen = <InterviewStep form={form} update={update} onNext={goNext} onBack={goBack} />;
  } else if (current === "anchor") {
    screen = <AnchorStep form={form} update={update} onNext={goNext} onBack={goBack} />;
  } else if (current === "pool") {
    screen = <PoolStep form={form} update={update} onNext={goNext} onBack={goBack} />;
  } else if (current === "starter") {
    screen = <StarterStep form={form} update={update} onNext={goNext} onBack={goBack} />;
  } else if (current === "guests") {
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
    <StartLayout step={result ? steps.length - 1 : step} total={steps.length}>
      {submitting ? <p className="gc-label mb-6 text-ink/55">Saving</p> : null}
      {screen}
    </StartLayout>
  );
}