export default function LegalDoc({ doc }) {
  return (
    <article className="mx-auto max-w-[68ch] px-6 py-14 md:py-20">
      <p className="gc-label text-ink/65">Legal</p>
      <h1 className="mt-5 text-[34px] leading-[1.05] sm:text-[52px]">{doc.title}</h1>
      <p className="mt-4 text-[15px] text-ink/60">{doc.updated}</p>

      {doc.intro.map((paragraph) => (
        <p key={paragraph} className="mt-6 text-[18px] leading-[1.6] text-ink/85">
          {paragraph}
        </p>
      ))}

      {doc.sections.map((section) => (
        <section key={section.heading} className="mt-9">
          <h2 className="text-[24px] leading-[1.15]">{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-[18px] leading-[1.6] text-ink/85">
              {paragraph}
            </p>
          ))}
          {section.bullets?.length ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[18px] leading-[1.6] text-ink/85">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <section className="mt-9 border-t border-ink pt-5">
        <h2 className="text-[24px] leading-[1.15]">Contact</h2>
        <p className="mt-3 text-[18px] leading-[1.6] text-ink/85">{doc.contact}</p>
      </section>
    </article>
  );
}