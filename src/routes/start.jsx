import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { startChapter } from "@/lib/server-fns";
import { BUDGET_PATHS } from "@/lib/chapter-types";
import { questionsFor } from "@/lib/chapter-questions";
import StartLayout from "@/components/start/StartLayout";
import ChapterSoFar from "@/components/start/ChapterSoFar";
import PathStep from "@/components/start/steps/PathStep";
import PersonStep from "@/components/start/steps/PersonStep";
import TypeStep from "@/components/start/steps/TypeStep";
import PromptStep from "@/components/start/steps/PromptStep";
import StarterStep from "@/components/start/steps/StarterStep";
import GuestsStep from "@/components/start/steps/GuestsStep";
import InterviewStep from "@/components/start/steps/InterviewStep";
import AnchorStep from "@/components/start/steps/AnchorStep";
import PoolStep from "@/components/start/steps/PoolStep";
import ReviewStep from "@/components/start/steps/ReviewStep";
import DoneStep from "@/components/start/steps/DoneStep";
import GiftPanel from "@/components/start/GiftPanel";

/** The start flow lives on its own subdomain. */
const START_URL = "https://start.goodchaptercollective.com";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start a chapter | Good Chapter Co." },
      {
        name: "description",
        content: "Answer a few questions about the person. A curator builds eight things. Nothing is sent until they say yes.",
      },
      { property: "og:url", content: START_URL },
      { property: "og:title", content: "Start a chapter | Good Chapter Co." },
      { property: "og:description", content: "Answer a few questions about the person. A curator builds eight things. Nothing is sent until they say yes." },
    ],
    links: [{ rel: "canonical", href: START_URL }],
  }),
  component: StartPage,
});

/** Steps that show the live shop panel beside the question. */
const PANEL_STEPS = ["prompt1", "prompt2", "prompt3", "anchor", "pool", "review"];

/** A set amount skips the interview and the anchor. Everything else is shared. */
const stepsFor = (path) => [
  "path",
  "person",
  "type",
  "prompt1",
  "prompt2",
  "prompt3",
  ...(BUDGET_PATHS.includes(path) ? ["pool"] : ["interview", "anchor"]),
  "starter",
  "guests",
  "review",
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
  const [suggestions, setSuggestions] = useState([]);
  const [gaps, setGaps] = useState([]);
  const [panelBusy, setPanelBusy] = useState(false);

  const cues = questionsFor(form.chapterType);
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
    setSuggestions([]);
    setGaps([]);
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
          poolAmount: BUDGET_PATHS.includes(form.path) ? Number(form.poolAmount) : undefined,
          guests,
          items: suggestions,
          gaps,
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
        question={cues.cues[0].question}
        hint={cues.cues[0].hint}
        placeholder={cues.cues[0].placeholder}
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
        question={cues.cues[1].question}
        hint={cues.cues[1].hint}
        placeholder={cues.cues[1].placeholder}
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
        question={cues.cues[2].question}
        hint={cues.cues[2].hint}
        placeholder={cues.cues[2].placeholder}
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
        onNext={goNext}
        onBack={goBack}
        error={error}
      />
    );
  } else if (current === "review") {
    screen = (
      <ReviewStep
        gaps={gaps}
        checking={panelBusy}
        suggestionCount={suggestions.length}
        submitting={submitting}
        error={error}
        onNext={finish}
        onBack={goBack}
      />
    );
  }

  const panel = PANEL_STEPS.includes(current) ? (
    <GiftPanel
      answers={{
        alwaysWears: form.alwaysWears,
        rewatches: form.rewatches,
        neverBuys: form.neverBuys,
        chapterType: form.chapterType,
        anchorIdea: form.anchorIdea,
        cap: BUDGET_PATHS.includes(form.path) ? Number(form.poolAmount) || 0 : 0,
      }}
      onChange={(payload) => {
        setSuggestions(payload.items);
        setGaps(payload.gaps);
      }}
      onBusy={setPanelBusy}
    />
  ) : null;

  const trail = [form.personName.trim(), form.chapterType].filter(Boolean).join(" / ");

  return (
    <StartLayout
      step={result ? steps.length - 1 : step}
      total={steps.length}
      panel={panel}
      summary={result ? null : <ChapterSoFar form={form} />}
      trail={result ? "Filed" : trail}
    >
      {submitting ? <p className="gc-label mb-6 text-ink/55">Saving</p> : null}
      {screen}
    </StartLayout>
  );
}