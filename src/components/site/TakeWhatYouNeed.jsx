import { Link } from "@tanstack/react-router";

/** What someone actually needs in the middle of a change. Eight, like a chapter. */
const TABS = [
  "a place to start",
  "one less decision",
  "a softer landing",
  "room to change",
  "something to keep",
  "a reason to host",
  "someone to call",
  "permission",
];

export default function TakeWhatYouNeed() {
  return (
    <section aria-labelledby="take-what-you-need" className="bg-ink px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="gc-label text-plaster/70">The campaign</p>

        <div className="mt-5 overflow-hidden rounded-t-[4px] bg-mustard text-ink">
          <div className="px-6 pb-10 pt-9 text-center md:px-14 md:pb-14 md:pt-12">
            <span className="gc-label">good chapter co.</span>
            <h2
              id="take-what-you-need"
              className="gc-loud mx-auto mt-6 max-w-[18ch] text-[clamp(38px,9vw,96px)]"
            >
              take what you need.
            </h2>
            <p className="mt-4 text-[clamp(19px,2.4vw,28px)] italic leading-[1.2]">
              (and let someone give it.)
            </p>
            <p className="mx-auto mt-7 max-w-[46ch] text-[18px] leading-[1.45] md:text-[19px]">
              A friend starts the chapter. The person says what stays and what goes. Eight things
              for one life, chosen out loud, instead of a catalog for everybody.
            </p>
            <Link to="/start" className="gc-btn mt-8">
              <span className="gc-btn-label">Start a chapter</span>
            </Link>
          </div>

          <ul className="grid grid-cols-8 border-t border-dashed border-ink/60">
            {TABS.map((tab) => (
              <li
                key={tab}
                className="flex h-[136px] items-end justify-center border-l border-dashed border-ink/40 py-4 first:border-l-0 md:h-[168px]"
              >
                <span className="gc-label [writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-[10px] tracking-[0.16em] md:text-[12px]">
                  {tab}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.45] text-plaster/70">
          Tear one off. It is not a diagnosis and it is not a hint. It is the thing you say when
          someone asks what would actually help.
        </p>
      </div>
    </section>
  );
}