import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getGuestIdeas, saveGuestIdea, shareIdea } from "@/lib/guest-fns";

const OWN_LIMIT = 3;

/**
 * Ideas for this one guest only. Three arrive with the chapter and the guest
 * can add up to three of their own. Nothing here is added to the chapter, and
 * no other guest ever sees it. Sharing one tells the curator it landed.
 */
export default function PrivateIdeas({ token }) {
  const load = useServerFn(getGuestIdeas);
  const save = useServerFn(saveGuestIdea);
  const share = useServerFn(shareIdea);

  const [ideas, setIdeas] = useState([]);
  const [shared, setShared] = useState("");
  const [phase, setPhase] = useState("loading");
  const [sending, setSending] = useState("");
  const [error, setError] = useState("");

  const [draft, setDraft] = useState({ name: "", what: "" });
  const [saving, setSaving] = useState(false);
  const [draftError, setDraftError] = useState("");

  useEffect(() => {
    let live = true;
    load({ data: { token } })
      .then((result) => {
        if (!live) return;
        if (!result) {
          setPhase("quiet");
          return;
        }
        setIdeas(result.ideas ?? []);
        setShared(result.shared ?? "");
        setPhase("ready");
      })
      .catch(() => {
        if (live) setPhase("quiet");
      });
    return () => {
      live = false;
    };
  }, [token]);

  const choose = async (idea) => {
    setSending(idea.name);
    setError("");
    try {
      const result = await share({ data: { token, name: idea.name } });
      if (!result?.ok) {
        setError("That did not send. Try once more.");
        return;
      }
      setShared(result.shared ?? idea.name);
    } catch {
      setError("That did not send. Try once more.");
    } finally {
      setSending("");
    }
  };

  const add = async () => {
    if (!draft.name.trim()) {
      setDraftError("Name the thing first.");
      return;
    }
    setSaving(true);
    setDraftError("");
    try {
      const result = await save({
        data: { token, name: draft.name.trim(), what: draft.what.trim() },
      });
      if (!result?.ok) {
        setDraftError(
          result?.reason === "limit"
            ? "Three of your own is the most this takes."
            : "That did not save. Try once more.",
        );
        return;
      }
      setIdeas(result.ideas ?? []);
      setDraft({ name: "", what: "" });
    } catch {
      setDraftError("That did not save. Try once more.");
    } finally {
      setSaving(false);
    }
  };

  if (phase === "quiet") return null;

  if (phase === "loading") {
    return (
      <section className="mt-12 border-t border-ink pt-8">
        <p className="gc-label text-ink/45">Three ideas for you only. One moment.</p>
      </section>
    );
  }

  const own = ideas.filter((idea) => idea.mine);
  const ordered = [...own, ...ideas.filter((idea) => !idea.mine)];

  return (
    <section className="mt-12 border-t border-ink pt-8" aria-labelledby="ideas-heading">
      <span className="gc-sticker">Only your link shows this</span>
      <h2 id="ideas-heading" className="mt-5 text-[clamp(26px,4vw,38px)]">
        Three more, and room for yours.
      </h2>
      <p className="mt-4 max-w-[46ch] text-[19px] leading-[1.38] text-ink/85">
        Built from this chapter. None of these are on the list, and nobody else can see them. Add
        your own if something comes to mind. Send one to the curator and it becomes a note, not an
        item.
      </p>

      {ordered.length ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {ordered.map((idea) => {
            const mine = shared === idea.name;
            return (
              <article key={`${idea.mine ? "own" : "made"}-${idea.name}`} className="flex flex-col border border-ink bg-paper p-4">
                {idea.mine ? <span className="gc-label mb-2 text-clay">Yours</span> : null}
                <h3 className="text-[21px] leading-[1.1]">{idea.name}</h3>
                {idea.what ? (
                  <p className="mt-1 text-[17px] leading-[1.35] text-ink/85">{idea.what}</p>
                ) : null}
                {idea.why ? (
                  <p className="mt-2 border-l border-ink/40 pl-3 text-[17px] leading-[1.35] text-ink/85">
                    {idea.why}
                  </p>
                ) : null}
                {idea.find ? (
                  <span className="gc-spec mt-2 text-[11px] text-ink/55">{idea.find}</span>
                ) : null}

                <button
                  type="button"
                  onClick={() => choose(idea)}
                  disabled={sending === idea.name}
                  className={`gc-label mt-auto pt-4 text-left ${mine ? "text-cobalt" : "text-ink/60"}`}
                >
                  {mine
                    ? "Sent to the curator"
                    : sending === idea.name
                      ? "Sending"
                      : "Send this to the curator"}
                </button>
              </article>
            );
          })}
        </div>
      ) : null}

      {own.length < OWN_LIMIT ? (
        <div className="mt-6 border border-ink bg-paper p-4">
          <label className="gc-label block text-ink/55" htmlFor="own-idea">
            One of yours
          </label>
          <input
            id="own-idea"
            className="gc-input mt-2"
            value={draft.name}
            maxLength={90}
            placeholder="A cast iron pan"
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
          />
          <input
            className="gc-input mt-2"
            value={draft.what}
            maxLength={240}
            placeholder="For the Sunday eggs they make for everyone"
            onChange={(event) => setDraft({ ...draft, what: event.target.value })}
          />
          <button
            type="button"
            className="gc-btn mt-3 w-full justify-between"
            disabled={saving}
            onClick={add}
          >
            <span className="gc-btn-label">{saving ? "Saving" : "Keep it here"}</span>
            <span className="gc-btn-arrow" aria-hidden="true">
              →
            </span>
          </button>
          {draftError ? (
            <p className="mt-2 text-[16px] leading-snug text-clay">{draftError}</p>
          ) : null}
        </div>
      ) : null}

      {error ? <p className="mt-4 text-[17px] leading-[1.38] text-clay">{error}</p> : null}
    </section>
  );
}