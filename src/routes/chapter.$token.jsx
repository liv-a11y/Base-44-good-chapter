import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getChapterByToken } from "@/lib/server-fns";
import Wordmark from "@/components/site/Wordmark";
import ChapterItem from "@/components/person/ChapterItem";

export const Route = createFileRoute("/chapter/$token")({
  loader: async ({ params }) => {
    const chapter = await getChapterByToken({ data: { token: params.token } });
    if (!chapter) throw notFound();
    return chapter;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.person_name ?? "Your chapter"} | Good Chapter Co.` },
      {
        name: "description",
        content: "Eight things chosen for you, one at a time, with a reason written next to each.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PersonChapter,
});

function PersonChapter() {
  const chapter = Route.useLoaderData();
  const { token } = Route.useParams();
  const first = (chapter.person_name || "").split(/\s+/)[0] || "You";

  return (
    <div className="min-h-screen bg-plaster">
      <header className="bg-ink">
        <div className="mx-auto flex w-full max-w-[900px] items-center justify-between gap-6 px-6 py-5">
          <Wordmark tone="reverse" />
          <span className="gc-label text-plaster/70">Your private link</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[900px] px-6 pb-24 pt-12">
        <p className="gc-label text-ink/50">{chapter.chapter_type}</p>
        <h1 className="gc-loud mt-4 text-[clamp(40px,8vw,84px)]">this is yours.</h1>
        <p className="mt-6 max-w-[46ch] text-[21px] leading-[1.38] text-ink/85">
          {first}, eight things, chosen one at a time, each with the reason it was chosen for you.
          Read them in your own time. Nothing reaches your guests until you have answered.
        </p>

        {chapter.await_answer ? (
          <div className="mt-8 max-w-[560px] border border-ink bg-paper p-6">
            <p className="gc-label text-ink/50">Your answer first</p>
            <p className="mt-2 text-[21px] leading-[1.35] text-ink">
              Say yes, and the list opens to the people you named. Send it back and nothing goes
              out at all.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link
                to="/decide/$token/$answer"
                params={{ token: chapter.accept_token, answer: "accept" }}
                className="gc-btn"
              >
                <span className="gc-btn-label">Accept it</span>
                <span className="gc-btn-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                to="/decide/$token/$answer"
                params={{ token: chapter.decline_token, answer: "decline" }}
                className="gc-label border border-ink px-5 py-3 text-center"
              >
                Send it back
              </Link>
            </div>
          </div>
        ) : null}

        {chapter.person_decision === "accepted" ? (
          <p className="gc-label mt-8 text-ink/55">
            You said yes{chapter.decided_on ? ` on ${chapter.decided_on}` : ""}. The list is open to
            the people you named.
          </p>
        ) : null}

        {chapter.person_decision === "declined" ? (
          <p className="mt-8 max-w-[44ch] border-l border-ink pl-4 text-[21px] leading-[1.4]">
            You sent this back{chapter.decided_on ? ` on ${chapter.decided_on}` : ""}. Nothing went
            to the guests. Your friend can change the list and ask you again.
          </p>
        ) : null}

        {chapter.story_line ? (
          <p className="mt-8 max-w-[44ch] border-l border-ink pl-4 font-heading text-[26px] leading-[1.15]">
            {chapter.story_line}
          </p>
        ) : null}

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {chapter.items.map((item, index) => (
            <ChapterItem
              key={item.id}
              token={token}
              item={item}
              index={index}
              open={chapter.answers_open}
              awaiting={chapter.await_answer}
            />
          ))}
        </div>

        <p className="gc-label mt-12 text-ink/45">
          Keep this link to yourself. It is the only copy.
        </p>
      </main>
    </div>
  );
}