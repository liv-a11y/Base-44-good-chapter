import { createFileRoute, notFound } from "@tanstack/react-router";
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