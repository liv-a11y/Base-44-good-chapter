/** What a chapter never does, said once, on the darkest field on the page. */
const PROMISES = [
  { line: "no asking for yourself.", body: "A friend starts it. The person only has to say yes." },
  { line: "nothing goes out early.", body: "The person approves the list in private before anyone sees it." },
  { line: "nobody sees who gave what.", body: "Each guest picks one real object. Nobody doubles up." },
  { line: "no registry.", body: "We say list, or chapter. That other word belongs to weddings." },
];

export default function Promises() {
  return (
    <section aria-labelledby="promises" className="mx-auto max-w-6xl px-6 py-14 md:py-24">
      <div className="bg-ink p-8 text-plaster sm:p-12">
        <p id="promises" className="gc-label">
          What a chapter never does
        </p>
        <ul className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {PROMISES.map((promise) => (
            <li key={promise.line} className="border-t border-plaster/60 pt-5">
              <p className="font-heading text-[28px] leading-[1.1] sm:text-[34px]">{promise.line}</p>
              <p className="mt-3 text-[18px] leading-[1.45]">{promise.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
