import { Link } from "@tanstack/react-router";

export default function WhyWeExist() {
  return (
    <section aria-labelledby="why-we-exist" className="mx-auto max-w-6xl px-6 py-16 md:py-28">
      <p className="gc-label text-ink/65">Why we exist</p>

      <h2 id="why-we-exist" className="mt-8 max-w-[46ch] text-[28px] leading-[1.12] sm:text-[40px]">
        the registry was built for a woman leaving her father’s house for her husband’s. we built one
        for everything else she does.
      </h2>

      <div className="mt-6 grid gap-5 text-[19px] leading-[1.45] text-ink/85 md:max-w-[64ch]">
        <p>
          In 1924, a department store made care easy to give at marriage. China, silver, crystal, and a
          list so nobody guessed.
        </p>
        <p>
          Women kept building lives outside that script. Buying homes alone. Starting over. Moving
          somewhere new. The care stayed. The ritual did not.
        </p>
      </div>

      <Link
        to="/read"
        className="mt-7 inline-flex min-h-11 items-center text-[18px] underline underline-offset-[6px] hover:text-cobalt"
      >
        Read our why
      </Link>
    </section>
  );
}