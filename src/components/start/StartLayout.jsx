import Wordmark from "@/components/site/Wordmark";

/** The marketing site is on the main domain, this flow on its own subdomain. */
const SITE_URL = "https://goodchaptercollective.com";

export default function StartLayout({ step, total, panel, summary, trail, children }) {
  const filled = Math.round(((step + 1) / total) * 100);

  return (
    <div className="flex min-h-screen flex-col bg-plaster">
      <header className="bg-ink">
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-6 px-6 py-5">
          <Wordmark tone="reverse" />
          <a href={SITE_URL} className="gc-label pb-0.5 text-plaster">
            Leave
          </a>
        </div>
      </header>

      <div className="sticky top-0 z-20 border-b border-ink/15 bg-plaster/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1120px] items-center gap-4 px-6 py-3">
          <span className="gc-spec shrink-0 text-ink/55">
            {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <div className="relative h-[1.5px] flex-1 overflow-hidden bg-ink/20" aria-hidden="true">
            <div
              className="absolute inset-y-0 left-0 bg-cobalt transition-[width] duration-700 ease-out"
              style={{ width: `${filled}%` }}
            />
          </div>
          <span className="gc-spec hidden max-w-[210px] truncate text-ink/45 lg:block">{trail}</span>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-6 pb-24 pt-12 sm:pt-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-start lg:gap-16">
          <div className="max-w-[620px]">{children}</div>

          <aside className="hidden lg:sticky lg:top-20 lg:block lg:self-start">
            {summary}
            {panel ? <div className="mt-10">{panel}</div> : null}
          </aside>
        </div>

        {panel ? <div className="mt-16 lg:hidden">{panel}</div> : null}
      </main>
    </div>
  );
}