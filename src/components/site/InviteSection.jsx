import { useState } from "react";
import { Image } from "@/components/ui/image";
import { TAG_CLAY } from "@/lib/brand-assets";
import { requestInvitation } from "@/lib/server-fns";

const WAYS_IN = [
  "Consumer",
  "Founding partner: Employer",
  "Founding partner: Real estate",
  "Founding partner: Brand",
  "Investor",
  "General inquiry",
];

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
    <section id="invite" className="scroll-mt-24 border-y border-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <p className="gc-label text-ink/65">Private pilot</p>
          <h2 className="mt-5 text-[34px] leading-[1.04] sm:text-[52px]">
            the first circle opens quietly.
          </h2>
          <p className="mt-5 max-w-[30rem] text-[19px] leading-[1.45] text-ink/85">
            Friends, agents, employers, and the curious. Tell us who you are and we will write when the
            doors open.
          </p>
          <Image
            src={TAG_CLAY}
            alt=""
            aria-hidden="true"
            className="mt-8 h-auto w-24 [transform:rotate(-9deg)]"
          />
        </div>

        <div className="w-full self-start border-[1.5px] border-ink bg-paper">
          <div className="border-b-[1.5px] border-ink bg-ink px-5 py-3 text-plaster">
            <span className="gc-label">Request an invitation</span>
          </div>

          {state === "sent" ? (
            <div className="p-5 sm:p-6">
              <p className="text-[21px] leading-[1.35]">You are on the list.</p>
              <p className="mt-3 text-[17px] leading-[1.5] text-ink/80">
                We will write to {email} when the first circle opens. Nothing else goes out before then.
              </p>
            </div>
          ) : (
            <form className="p-5 sm:p-6" onSubmit={handleSubmit} noValidate>
              <label htmlFor="waitlist-interest" className="gc-label block text-ink">
                I’m here as
              </label>
              <select
                id="waitlist-interest"
                required
                value={interest}
                onChange={(event) => setInterest(event.target.value)}
                className="gc-input mt-3 h-14 appearance-none text-[17px]"
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

              <label htmlFor="waitlist-comments" className="gc-label mt-6 block text-ink/65">
                Comments. Optional.
              </label>
              <textarea
                id="waitlist-comments"
                rows={4}
                maxLength={1000}
                value={comments}
                onChange={(event) => setComments(event.target.value)}
                placeholder="Tell us what brought you here."
                className="gc-input mt-3 text-[17px]"
              />
              <p className="mt-2 text-[14px] leading-[1.5] text-ink/55">
                Optional. Leave out other people’s names and anything about health.
              </p>

              <label htmlFor="waitlist-email" className="gc-label mt-6 block text-ink/65">
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
                className="gc-input mt-3 h-14 text-[18px]"
              />

              {error ? (
                <p className="mt-4 text-[15px] leading-[1.45] text-clay">{error}</p>
              ) : null}

              <button
                type="submit"
                className="gc-btn mt-6 w-full"
                disabled={state === "sending"}
              >
                <span className="gc-btn-label">
                  {state === "sending" ? "Sending" : "Request an invite"}
                </span>
              </button>

              <p className="mt-4 text-[13px] leading-[1.5] text-ink/55">
                By requesting an invitation, you agree to receive emails from Good Chapter, Co. about
                the pilot and you accept our{" "}
                <a href="/privacy" className="underline underline-offset-2">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/terms" className="underline underline-offset-2">
                  Terms
                </a>
                . You can unsubscribe any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}