import { createFileRoute, Link } from "@tanstack/react-router";
import { LIBRARY_NAME, findResource } from "@/lib/library";

export const Route = createFileRoute("/_site/partners/employers_/library/$slug")({
  head: ({ params }) => {
    const resource = findResource(params.slug);
    const title = resource
      ? `${resource.title}. ${LIBRARY_NAME}. Good Chapter, Co.`
      : `${LIBRARY_NAME}. Good Chapter, Co.`;
    const description = resource ? resource.line : "A free library for employers.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ResourcePage,
});

const PRINT_CSS = `
@media print {
  header, footer, .gcl-no-print { display: none !important; }
  main { background: #fff !important; }
}
`;

function Heading({ children }) {
  return children ? <h2 className="font-heading text-[24px] leading-[1.15]">{children}</h2> : null;
}

function Block({ block }) {
  if (block.kind === "p") {
    return (
      <div>
        <Heading>{block.heading}</Heading>
        <p className={`text-[19px] leading-[1.6] ${block.heading ? "mt-3" : ""}`}>{block.text}</p>
      </div>
    );
  }
  if (block.kind === "lines") {
    return (
      <div>
        <Heading>{block.heading}</Heading>
        <ul className={`grid gap-3 ${block.heading ? "mt-4" : ""}`}>
          {block.items.map((item) => (
            <li
              key={item}
              className="rounded-[4px] border-2 border-ink bg-paper px-5 py-4 font-heading text-[21px] leading-[1.3]"
            >
              &ldquo;{item}&rdquo;
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (block.kind === "steps") {
    return (
      <div>
        <Heading>{block.heading}</Heading>
        <ol className={`grid gap-3 ${block.heading ? "mt-4" : ""}`}>
          {block.items.map((item, index) => (
            <li key={item} className="flex items-baseline gap-4 border-t-2 border-ink pt-3">
              <span className="gc-label shrink-0 text-clay">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-[19px] leading-[1.5]">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  if (block.kind === "pairs") {
    return (
      <div>
        <Heading>{block.heading}</Heading>
        <div className="grid gap-3">
          <div className="hidden grid-cols-2 gap-4 sm:grid">
            <p className="gc-label text-clay">Retire this</p>
            <p className="gc-label text-clay">Say this</p>
          </div>
          {block.items.map(([retire, say]) => (
            <div key={retire} className="grid gap-1 border-t-2 border-ink pt-3 sm:grid-cols-2 sm:gap-4">
              <p className="text-[18px] leading-[1.45] text-ink/60 line-through">&ldquo;{retire}&rdquo;</p>
              <p className="text-[18px] leading-[1.45]">{say}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading>{block.heading}</Heading>
      <ul className={`grid gap-2 ${block.heading ? "mt-4" : ""}`}>
        {block.items.map((item) => (
          <li key={item} className="border-l-2 border-ink pl-4 text-[19px] leading-[1.5]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResourcePage() {
  const { slug } = Route.useParams();
  const resource = findResource(slug);

  if (!resource) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-heading text-[34px] leading-[1.1]">That page is not in the library.</h1>
        <Link
          to="/partners/employers/library"
          className="mt-6 inline-block text-[18px] underline underline-offset-[6px] hover:text-cobalt"
        >
          Back to {LIBRARY_NAME}
        </Link>
      </section>
    );
  }

  return (
    <>
      <style>{PRINT_CSS}</style>
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Link
          to="/partners/employers/library"
          className="gcl-no-print gc-label underline underline-offset-4 hover:text-cobalt"
        >
          {LIBRARY_NAME}
        </Link>
        <p className="gc-label mt-8 text-ink/65">
          {resource.audience} · {resource.time} · {resource.format}
        </p>
        <h1 className="mt-4 font-heading text-[40px] leading-[1.05] sm:text-[56px]">{resource.title}</h1>
        <p className="mt-5 text-[21px] leading-[1.45] text-ink/85">{resource.line}</p>

        <div className="mt-10 grid gap-10">
          {resource.blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>

        <p className="mt-12 border-t-2 border-ink pt-5 text-[15px] leading-[1.5] text-ink/70">
          From {LIBRARY_NAME}, the free employer library by Good Chapter, Co. General guidance, not
          legal or HR advice. Follow your own company&rsquo;s policies.
        </p>

        <div className="gcl-no-print mt-8 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-[4px] border-2 border-ink px-5 py-3 text-[17px] hover:bg-ink hover:text-plaster"
          >
            Print this
          </button>
          <Link
            to="/partners/employers/library"
            className="text-[18px] underline underline-offset-[6px] hover:text-cobalt"
          >
            More from the library
          </Link>
        </div>
      </article>
    </>
  );
}
