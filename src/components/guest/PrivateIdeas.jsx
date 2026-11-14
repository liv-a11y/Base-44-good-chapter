import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getGuestIdeas, shareIdea } from "@/lib/guest-fns";

/**
 * Three ideas for this one guest only. They are never added to the chapter and
 * never shown to another guest. Sharing one just tells the curator it landed.
 */
export default function PrivateIdeas({ token, person }) {
  const load = useServerFn(getGuestIdeas);
  const share = useServerFn(shareIdea);

  const [ideas, setIdeas] = useState([]);
  const [shared, setShared] = useState("");
  const [phase, setPhase] = useState("loading");
  const [sending, setSending] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    load({ data: { token } })
      .then((result) => {
        if (!live) return;
        setIdeas(result?.ideas ?? []);
        setShared(result?.shared ?? "");
        setPhase(result?.ideas?.length ? "ready" : "quiet");
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

  if (phase === "quiet") return null;

  if (phase === "loading") {
    return (
      <section className="mt-12 border-t border-ink pt-8">
        <p className="gc-label text-ink/45">Three ideas for you only. One moment.</p>
      </section>
    );
  }

  return (
    <section className="mt-12 border-t border-ink pt-8" aria-labelledby="ideas-heading">
      <span className="gc-sticker">Only your link shows this</span>
      <h2 id="ideas-heading" className="mt-5 text-[clamp(26px,4vw,38px)]">
        Three more, if you want them.
      </h2>
      <p className="mt-4 max-w-[46ch] text-[19px] leading-[1.38] text-ink/85">
        Built from this chapter. None of these are on the list, and nobody else can see them. Send
        one to the curator if it feels right and it becomes a note, not an item.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {ideas.map((idea) => {
          const mine = shared === idea.name;
          return (
            <article key={idea.name} className="flex flex-col border border-ink bg-paper p-4">
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

      {error ? <p className="mt-4 text-[17px] leading-[1.38] text-clay">{error}</p> : null}
    </section>
  );
}