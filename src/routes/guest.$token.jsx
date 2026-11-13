import { createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { getGuestChapter, claimItem } from "@/lib/guest-fns";
import Wordmark from "@/components/site/Wordmark";
import GuestItem from "@/components/guest/GuestItem";

export const Route = createFileRoute("/guest/$token")({
  loader: async ({ params }) => {
    const chapter = await getGuestChapter({ data: { token: params.token } });
    if (!chapter) throw notFound();
    return chapter;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.person_name ?? "A chapter"} | Good Chapter Co.` },
      {
        name: "description",
        content: "Eight things they read through and said yes to. Take the one you would most like to give.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: GuestChapter,
});

function GuestChapter() {
  const chapter = Route.useLoaderData();
  const { token } = Route.useParams();
  const claim = useServerFn(claimItem);

  const first = (chapter.person_name || "").split(/\s+/)[0] || "their";
  const onClaim = (itemId, displayName) =>
    claim({ data: { token, item_id: itemId, display_name: displayName } });

  return (
    <div className="min-h-screen bg-plaster">
      <header className="bg-cobalt">
        <div className="mx-auto flex w-full max-w-[900px] flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Wordmark tone="reverse" />
          <span className="gc-label text-plaster/75">Started by {chapter.starter_name}</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[900px] px-6 pb-24 pt-12">
        <p className="gc-label text-ink/50">{chapter.chapter_type}</p>
        <h1 className="gc-loud mt-4 text-[clamp(40px,8vw,84px)]">{first}’s chapter.</h1>

        {chapter.open ? (
          <p className="mt-6 max-w-[46ch] text-[21px] leading-[1.38] text-ink/85">
            Eight things {first} read through and said yes to. Take the one you would most like to
            give. Nothing here was picked from a catalogue, and nothing is a request for money.
          </p>
        ) : (
          <p className="mt-6 max-w-[44ch] border-l border-ink pl-4 text-[21px] leading-[1.4]">
            {chapter.state === "closed"
              ? "This chapter is closed. Nothing more is needed from you."
              : "This chapter has not gone out yet. Your link will work once it does."}
          </p>
        )}

        {chapter.items.length ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {chapter.items.map((item, index) => (
              <GuestItem
                key={item.id}
                item={item}
                index={index}
                open={chapter.open}
                onClaim={onClaim}
              />
            ))}
          </div>
        ) : (
          <p className="mt-12 border-t border-ink/25 pt-6 text-[21px] leading-[1.4] text-ink/80">
            There is nothing to give from this chapter yet.
          </p>
        )}

        <p className="gc-label mt-12 text-ink/45">
          A friend started this. {first} approved every item here. Nobody asked.
        </p>
        <p className="gc-label mt-2 text-ink/35">Good Chapter Co.</p>
      </main>
    </div>
  );
}