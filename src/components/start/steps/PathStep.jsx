import StartQuestion from "@/components/start/StartQuestion";

const PATHS = [
  {
    value: "anchor_gift",
    title: "I want to anchor one gift.",
    line: "You pick the one thing you would give them first. The other seven get built around it.",
  },
  {
    value: "employer_pool",
    title: "There is a pool from work.",
    line: "Their employer set one amount per person for this benefit term. The chapter is built inside it.",
  },
  {
    value: "realtor_budget",
    title: "I'm a realtor and I have a set budget for anchor gifts.",
    line: "You set one amount per client before the chapter starts. The anchor gift and the seven after it are chosen inside it.",
  },
];

export default function PathStep({ form, update, onNext }) {
  return (
    <StartQuestion
      label="How it starts"
      question="Are you anchoring one gift, or working inside a set amount?"
      hint="Either way the curator picks eight things by hand and the person approves every one. This only decides where the chapter begins."
      canContinue={Boolean(form.path)}
      onSubmit={onNext}
    >
      <div className="space-y-2">
        {PATHS.map((path, index) => (
          <button
            key={path.value}
            type="button"
            className="gc-option items-start"
            aria-pressed={form.path === path.value}
            onClick={() => update({ path: path.value })}
          >
            <span className="gc-spec w-6 shrink-0 pt-1 opacity-70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="block">
              <span className="block text-[21px] leading-[1.2]">{path.title}</span>
              <span className="mt-1 block text-[17px] leading-[1.35] opacity-75">{path.line}</span>
            </span>
          </button>
        ))}
      </div>
    </StartQuestion>
  );
}