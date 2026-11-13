import { Image } from "@/components/ui/image";

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export default function SampleChapter({ chapter }) {
  if (!chapter) return null;

  return (
    <section className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="gc-sticker text-ink">Sample</span>
            <h2 className="mt-7 text-[clamp(26px,3vw,38px)] leading-[1.15] text-ink">
              {chapter.person_name}
            </h2>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">
              {chapter.chapter_type}
            </p>
            <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-ink/80">{chapter.story_line}</p>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink/60">
              A sample chapter, kept here to show the shape of one. The person is not real, the items
              are not for sale, and no chapter looks exactly like this one.
            </p>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
              <span className="gc-label text-ink/60">Eight things</span>
              <span className="gc-label text-ink/40">Sample</span>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 pt-6 sm:grid-cols-4">
              {chapter.items.map((item, index) => (
                <article key={`${item.name}-${index}`}>
                  <div className="aspect-square overflow-hidden rounded border-2 border-ink bg-plaster">
                    <Image src={item.photo_url} alt={item.name} className="h-full w-full" />
                  </div>
                  <h3 className="mt-3 text-[15px] font-normal leading-snug text-ink">{item.name}</h3>
                  <p className="mt-1 text-[14px] text-ink/70">{money(item.price)}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45">
                    {item.source}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}