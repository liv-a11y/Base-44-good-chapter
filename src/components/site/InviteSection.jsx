import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { requestInvitation } from "@/lib/server-fns";

const WAYS_IN = [
  { value: "Consumer", short: "A friend" },
  { value: "Founding partner: Employer", short: "An employer" },
  { value: "Founding partner: Real estate", short: "A realtor" },
  { value: "Founding partner: Brand", short: "A brand" },
  { value: "Investor", short: "An investor" },
  { value: "General inquiry", short: "Something else" },
];

const COPY = {
  default: {
    headline: "Join the pilot. Make showing up the new normal.",
    line: "Friends, agents, employers, and the curious. Tell us who you are and we will write when the doors open.",
    noteLabel: "",
    notePlaceholder: "",
  },
  Consumer: {
    headline: "Start one for someone you know.",
    line: "The move, the divorce, the first place alone. Eight things chosen for one person, and they approve every one before anyone else sees it.",
    noteLabel: "What is coming up for them?",
    notePlaceholder: "They are moving into their first place alone in March.",
  },
  "Founding partner: Employer": {
    headline: "Make showing up part of work.",
    line: "A chapter for the raise, the move, the leave, the diagnosis, the divorce nobody announces at the all hands. You set an amount aside per person. The person says yes first.",
    noteLabel: "What would a chapter cover at your company?",
    notePlaceholder: "We keep losing people quietly. We want something for the move and the leave.",
  },
  "Founding partner: Real estate": {
    headline: "Make showing up part of the move.",
    line: "Closing day is the easy part. A chapter is what a realtor hands over after it, eight things the person actually needs, approved by them before anyone else sees it.",
    noteLabel: "Who is the chapter usually for?",
    notePlaceholder: "Mostly first time buyers, settling in after closing.",
  },
  "Founding partner: Brand": {
    headline: "Be in the room after the milestone.",
    line: "A chapter places your product where it actually gets used, chosen by a curator and approved by the person first. No catalog, no ad slot.",
    noteLabel: "What would you want a chapter to include?",
    notePlaceholder: "Our linen line, for people setting up a first home.",
  },
  Investor: {
    headline: "Back the thing that comes after the list.",
    line: "We are building the chapter for every milestone that never got a registry. Tell us where you sit and we will send the short version.",
    noteLabel: "Where do you sit?",
    notePlaceholder: "Consumer seed, or strategic.",
  },
  "General inquiry": {
    headline: "Say the thing.",
    line: "Press, partnerships, or a question we have not answered yet. A person reads every note that comes through here.",
    noteLabel: "What is on your mind?",
    notePlaceholder: "I would like to write about the pilot.",
  },
};

const THREE_LINES = [
  "Tell us who you are.",
  "We write when the first circle opens.",
  "The person says yes before anything goes out.",
];

const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const SCOPED_CSS = `
.gci-band { border: 1px solid #182e91; }
.gci-panel { background:#F8EBDA; color:#651C1A; border:1px solid #F8EBDA; box-shadow:11px 11px 0 rgba(18,31,112,.3); }
.gci-legend { font-size:12px; line-height:1.4; letter-spacing:.19em; text-transform:uppercase; padding:0; margin:0 0 10px; }
.gci-chip { border:1px solid #651C1A; border-radius:999px; background:transparent; color:#651C1A; padding:8px 14px; font-family:var(--font-body); font-size:16px; line-height:1.2; cursor:pointer; transition:background-color .18s, color .18s, border-color .18s; }
.gci-chip:hover { background:#651C1A; color:#F8EBDA; }
.gci-chip[aria-pressed="true"] { background:#651C1A; color:#F8EBDA; }
.gci-chip:focus-visible { outline:2px solid #C2402F; outline-offset:2px; }
.gci-field { box-sizing:border-box; width:100%; border:1px solid #651C1A; border-radius:0; background:#fffaf1; color:#651C1A; padding:11px 13px; font-family:var(--font-body); font-size:17px; line-height:1.35; transition:background-color .18s, color .18s, box-shadow .18s; }
.gci-field:focus-visible { outline:2px solid #C2402F; outline-offset:2px; background:#fff; }
.gci-field::placeholder { color:rgba(101,28,26,.55); }
.gci-textarea { height:92px; resize:none; }
.gci-field-label { font-size:12px; line-height:1.4; letter-spacing:.19em; text-transform:uppercase; }
.gci-button { height:50px; border:0; background:#284CD6; color:#F8EBDA; font-family:var(--font-sans); font-weight:700; font-size:14px; line-height:1.2; letter-spacing:.04em; text-align:left; padding:0 18px; cursor:pointer; transition:background-color .2s, color .2s, box-shadow .2s; }
.gci-button:hover:not(:disabled) { background:#651C1A; }
.gci-button:active:not(:disabled) { background:#C2402F; }
.gci-button:focus-visible { outline:2px solid #C2402F; outline-offset:3px; }
.gci-button:disabled { background:#284CD6; color:rgba(248,232,218,.6); cursor:not-allowed; }
.gci-policy { font-size:13px; line-height:1.45; margin:0; color:rgba(101,28,26,.8); }
.gci-policy a { color:#651C1A; text-decoration:underline; text-underline-offset:2px; transition:color .18s; }
.gci-policy a:hover { color:#284CD6; }
.gci-reveal { animation: gci-reveal .34s cubic-bezier(.2,.7,.2,1) both; }
@keyframes gci-reveal {
  from { opacity:0; transform: translateY(-6px); }
  to { opacity:1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .gci-reveal { animation:none; }
}
`;

export default function InviteSection({ defaultInterest = "", id = "invite" }) {
  const [interest, setInterest] = useState(defaultInterest);
  const [comments, setComments] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");
  const copy = COPY[interest] ?? COPY.default;

  async function handleSubmit(event) {
    event.preventDefault();
    if (!interest) {
      setError("Choose the one that sounds most like you.");
      return;
    }
    if (!emailOk(email)) {
      setError("Leave an email we can write to.");
      return;
    }
    setState("sending");
    setError("");
    try {
      await requestInvitation({
        data: { email: email.trim(), interest, comments: comments.trim() || undefined },
      });
      setState("sent");
    } catch {
      setState("idle");
      setError("That did not go through. Try again, or write to info@goodchaptercollective.com.");
    }
  }

  return (
    <section id={id} className="gci-band scroll-mt-24 bg-cobalt text-plaster">
      <style>{SCOPED_CSS}</style>

      <div className="grid gap-12 px-6 py-12 sm:px-10 md:grid-cols-[minmax(0,1fr)_minmax(0,440px)] md:gap-14 lg:px-[58px] lg:py-[58px]">
        <div className="flex flex-col justify-between">
          <div>
            <p className="gc-label text-plaster/70">Private pilot</p>

            <h2
              key={copy.headline}
              className="gc-step mt-6 text-[clamp(34px,4.4vw,52px)] leading-[1.02] tracking-[-0.035em]"
            >
              {copy.headline}
            </h2>

            <p
              key={copy.line}
              className="gc-step mt-5 max-w-[34rem] text-[19px] leading-[1.45] text-[#fff0dc]"
            >
              {copy.line}
            </p>
          </div>

          <ol className="mt-10 divide-y divide-plaster/25 border-t border-plaster/25">
            {THREE_LINES.map((line, index) => (
              <li key={line} className="flex items-baseline gap-4 py-3">
                <span className="gc-spec text-plaster/55">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[17px] leading-[1.35] text-[#fff0dc]">{line}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="gci-panel flex min-w-0 flex-col self-start">
          <div className="border-b-[1px] border-plaster bg-ink px-6 py-[17px] text-plaster">
            <span className="gc-label">Request an invitation</span>
          </div>

          {state === "sent" ? (
            <div className="gc-step p-6">
              <span className="gc-sticker">Nothing else goes out</span>
              <strong className="mb-3 mt-5 block font-body text-[23px] font-normal leading-[1.2]">
                You are on the list.
              </strong>
              <p className="text-[17px] leading-[1.5]">
                We will write to {email} when the first circle opens. Nothing else goes out before
                then.
              </p>
            </div>
          ) : (
            <form className="flex flex-col gap-5 px-6 py-[22px]" onSubmit={handleSubmit} noValidate>
              <fieldset className="flex flex-col">
                <legend className="gci-legend">I’m here as</legend>
                <div className="flex flex-wrap gap-2">
                  {WAYS_IN.map((way) => (
                    <button
                      key={way.value}
                      type="button"
                      aria-pressed={interest === way.value}
                      onClick={() => {
                        setInterest(way.value);
                        setError("");
                      }}
                      className="gci-chip"
                    >
                      {way.short}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-2">
                <label htmlFor="waitlist-email" className="gci-field-label">
                  Your email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="gci-field"
                />
              </div>

              {interest && copy.noteLabel ? (
                <div className="gci-reveal flex flex-col gap-2">
                  <label htmlFor="waitlist-comments" className="gci-field-label">
                    {copy.noteLabel} <span className="normal-case tracking-normal opacity-60">Optional</span>
                  </label>
                  <textarea
                    id="waitlist-comments"
                    rows={3}
                    maxLength={1000}
                    value={comments}
                    onChange={(event) => setComments(event.target.value)}
                    placeholder={copy.notePlaceholder}
                    className="gci-field gci-textarea"
                  />
                  <p className="text-[13px] leading-[1.4] text-ink/70">
                    Leave out other people’s names and anything about health.
                  </p>
                </div>
              ) : null}

              {error ? <p className="text-[15px] leading-[1.45] text-clay">{error}</p> : null}

              <button
                type="submit"
                className="gci-button flex items-center justify-between gap-4"
                disabled={state === "sending"}
              >
                <span>{state === "sending" ? "Sending" : "Request an invitation"}</span>
                <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
              </button>

              <p className="gci-policy">
                By requesting an invitation, you agree to receive emails from Good Chapter, Co. about
                the pilot and you accept our <a href="/privacy">Privacy Policy</a> and{" "}
                <a href="/terms">Terms</a>. You can unsubscribe any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}