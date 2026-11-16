import { useState } from "react";
import { requestInvitation } from "@/lib/server-fns";

const WAYS_IN = [
  "Consumer",
  "Founding partner: Employer",
  "Founding partner: Real estate",
  "Founding partner: Brand",
  "Investor",
  "General inquiry",
];

const SCOPED_CSS = `
.gci-band { border: 1px solid #182e91; }
.gci-stamp { width:100px; height:100px; border:1px solid #F8EBDA; border-radius:50%; display:grid; place-items:center; opacity:.8; position:relative; animation: gci-ink .8s cubic-bezier(.2,.7,.2,1) both; }
.gci-stamp::before, .gci-stamp::after { content:""; position:absolute; background:#F8EBDA; opacity:.8; }
.gci-stamp::before { width:1px; height:72px; transform:rotate(45deg); }
.gci-stamp::after { width:72px; height:1px; transform:rotate(-45deg); }
@keyframes gci-ink {
  from { clip-path: inset(0 100% 0 0); transform: rotate(-14deg); opacity:.1; }
  to { clip-path: inset(0); transform: rotate(0); opacity:.8; }
}
.gci-panel { background:#F8EBDA; color:#651C1A; border:1px solid #F8EBDA; box-shadow:11px 11px 0 rgba(18,31,112,.3); }
.gci-field { box-sizing:border-box; width:100%; border:1px solid #651C1A; border-radius:0; background:#fffaf1; color:#651C1A; padding:11px 13px; font-family:var(--font-body); font-size:17px; line-height:1.35; transition:background-color .18s, color .18s, box-shadow .18s; }
.gci-field:focus-visible { outline:2px solid #C2402F; outline-offset:2px; background:#fff; }
.gci-field::placeholder { color:rgba(101,28,26,.55); }
.gci-select { height:48px; }
.gci-textarea { height:92px; resize:none; }
.gci-button { height:48px; border:0; background:#284CD6; color:#F8EBDA; font-family:var(--font-sans); font-weight:700; font-size:14px; line-height:1.2; letter-spacing:.04em; text-align:left; padding:0 18px; cursor:pointer; transition:background-color .2s, color .2s, box-shadow .2s; }
.gci-button:hover:not(:disabled) { background:#651C1A; }
.gci-button:active:not(:disabled) { background:#C2402F; }
.gci-button:focus-visible { outline:2px solid #C2402F; outline-offset:3px; }
.gci-button:disabled { background:#284CD6; color:rgba(248,232,218,.6); cursor:not-allowed; }
.gci-policy { font-size:13px; line-height:1.45; margin:1px 0 0; color:rgba(101,28,26,.8); }
.gci-policy a { color:#651C1A; text-decoration:underline; text-underline-offset:2px; transition:color .18s; }
.gci-policy a:hover { color:#284CD6; }
@media (prefers-reduced-motion: reduce) {
  .gci-stamp { animation:none; }
}
`;

export default function InviteSection() {
  const [interest, setInterest] = useState("");
  const [comments, setComments] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!interest || !email.trim()) {
      setError("Choose your way in, and leave an email we can write to.");
      return;
    }
    setState("sending");
    setError("");
    try {
      await requestInvitation({
        data: { email: email.trim(), interest, comments: comments.trim() || undefined },
      });
      setState("sent");
    } catch (submitError) {
      setState("idle");
      setError("That did not go through. Try again, or write to info@goodchaptercollective.com.");
    }
  }

  return (
    <section id="invite" className="gci-band scroll-mt-24 bg-cobalt text-plaster">
      <style>{SCOPED_CSS}</style>
      <div className="grid gap-10 px-6 py-12 sm:px-10 md:grid-cols-[310px_1fr] md:gap-12 lg:px-[58px] lg:py-[54px]">
        <div className="flex flex-col justify-between pb-2 pt-[6px]">
          <div>
            <p className="gc-label">Private pilot</p>
            <h2 className="mt-[30px] mb-[22px] text-[38px] leading-[1.02] tracking-[-0.035em] sm:text-[46px] lg:text-[52px]">
              Join the pilot. Make showing up the new normal.
            </h2>
            <p className="max-w-[34rem] text-[19px] leading-[1.45] text-[#fff0dc]">
              Friends, agents, employers, and the curious. Tell us who you are and we will write when
              the doors open.
            </p>
            <svg
              className="mt-[34px] h-[82px] w-[82px] [filter:drop-shadow(5px_5px_0_rgba(101,28,26,.24))] [transform:rotate(-10deg)]"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path fill="#C2402F" d="M14 12h43l30 30-45 45L12 57V14a2 2 0 0 1 2-2Z" />
              <path fill="#F8EBDA" d="M23 22h28l23 23-32 32-21-21V24a2 2 0 0 1 2-2Z" />
              <circle cx="28" cy="28" r="5" fill="#651C1A" />
              <path
                d="M38 56c7-8 13-13 22-18"
                fill="none"
                stroke="#C2402F"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="gci-stamp mt-10 self-start" aria-hidden="true" />
        </div>

        <div className="gci-panel flex min-w-0 flex-col self-stretch">
          <div className="border-b-[1px] border-plaster bg-ink px-6 py-[17px] text-plaster">
            <span className="gc-label">Request an invitation</span>
          </div>

          {state === "sent" ? (
            <div className="p-6 text-[17px] leading-[1.5]">
              <strong className="mb-3 block font-body text-[21px] font-normal">
                You are on the list.
              </strong>
              We will write to {email} when the first circle opens. Nothing else goes out before
              then.
            </div>
          ) : (
            <form
              className="flex flex-col gap-[9px] px-6 py-[21px]"
              onSubmit={handleSubmit}
              noValidate
            >
              <label
                htmlFor="waitlist-interest"
                className="text-[12px] uppercase leading-[1.4] tracking-[0.19em]"
              >
                I’m here as
              </label>
              <select
                id="waitlist-interest"
                required
                value={interest}
                onChange={(event) => setInterest(event.target.value)}
                className="gci-field gci-select"
              >
                <option value="" disabled>
                  Choose your way in
                </option>
                {WAYS_IN.map((way) => (
                  <option key={way} value={way}>
                    {way}
                  </option>
                ))}
              </select>

              <label
                htmlFor="waitlist-comments"
                className="mt-[5px] text-[12px] uppercase leading-[1.4] tracking-[0.19em]"
              >
                Comments. Optional.
              </label>
              <textarea
                id="waitlist-comments"
                rows={4}
                maxLength={1000}
                value={comments}
                onChange={(event) => setComments(event.target.value)}
                placeholder="Tell us what brought you here."
                className="gci-field gci-textarea"
              />
              <p className="text-[13px] leading-[1.4] text-ink/80">
                Optional. Leave out other people’s names and anything about health.
              </p>

              <label
                htmlFor="waitlist-email"
                className="mt-[5px] text-[12px] uppercase leading-[1.4] tracking-[0.19em]"
              >
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

              {error ? <p className="text-[15px] leading-[1.45] text-clay">{error}</p> : null}

              <button type="submit" className="gci-button mt-[5px]" disabled={state === "sending"}>
                {state === "sending" ? "Sending" : "Request an invite"}
              </button>

              <p className="gci-policy">
                By requesting an invitation, you agree to receive emails from Good Chapter, Co. about
                the pilot and you accept our{" "}
                <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms</a>. You can
                unsubscribe any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}