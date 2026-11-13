import { Image } from "@/components/ui/image";
import DrawingPlaceholder from "@/components/site/DrawingPlaceholder";

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export default function SampleChapter({ chapter }) {
  if (!chapter) return null;

  return (
    <section className="border-t border-ink bg-plaster">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="gc-sticker">Sample</span>
            <h2 className="mt-7 text-[clamp(28px,3.2vw,44px)]">{chapter.person_name}</h2>
            <p className="gc-label mt-3 text-ink/60">{chapter.chapter_type}</p>
            <p className="mt-5 max-w-[32ch] text-[19px] leading-[1.38] text-ink">{chapter.story_line}</p>
            <p className="mt-6 max-w-[34ch] text-[17px] leading-[1.38] text-ink/70">
              A sample chapter, kept here to show the shape of one. The person is not real, the items
              are not for sale, and no chapter looks exactly like this one.
            </p>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3">
              <span className="gc-label text-ink/60">Eight things</span>
              <span className="gc-label text-ink/40">Sample</span>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 pt-6 sm:grid-cols-4">
              {chapter.items.map((item, index) => (
                <article key={`${item.name}-${index}`}>
                  {item.photo_url ? (
                    <div className="aspect-square overflow-hidden border border-ink bg-plaster">
                      <Image src={item.photo_url} alt={item.name} className="h-full w-full" />
                    </div>
                  ) : (
                    <DrawingPlaceholder label={item.name} className="aspect-square" />
                  )}
                  <h3 className="mt-3 font-body text-[19px] leading-[1.25]">{item.name}</h3>
                  <p className="gc-spec mt-1 text-ink/70">{money(item.price)}</p>
                  <p className="gc-label mt-1 text-ink/45">{item.source}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}