import { Link } from "@tanstack/react-router";
import Wordmark from "@/components/site/Wordmark";

const SITE_LINKS = [
  { label: "Our why", to: "/read" },
  { label: "Giving back", to: "/giving" },
  { label: "Brands", to: "/partners/brands" },
  { label: "Maya’s chapter", to: "/first-place" },
  { label: "Start a chapter", to: "/start" },
];

const linkStyle = "w-fit text-[17px] text-plaster/85 underline underline-offset-4 hover:text-plaster";

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink bg-ink text-plaster">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-10">
          <div className="max-w-[30ch]">
            <Wordmark tone="reverse" size="lg" />
            <p className="mt-5 text-[19px] leading-[1.4] text-plaster/85">Good people. Different rules.</p>
          </div>

          <nav aria-label="The work" className="flex flex-col gap-2">
            <span className="gc-label text-plaster/55">The work</span>
            {SITE_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className={linkStyle}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Legal" className="flex flex-col gap-2">
            <span className="gc-label text-plaster/55">Fine print</span>
            <Link to="/privacy" className={linkStyle}>
              Privacy
            </Link>
            <Link to="/terms" className={linkStyle}>
              Terms
            </Link>
            <a href="mailto:info@goodchaptercollective.com" className={linkStyle}>
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-plaster/30 pt-5 text-[14px]">
          <a href="mailto:liv@goodchaptercollective.com" className={linkStyle}>
            liv@goodchaptercollective.com
          </a>
          <p className="text-plaster/65">© 2026 Good Chapter, Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}