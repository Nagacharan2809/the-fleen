"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "FLEEN", href: "#fleen" },
  { label: "Research", href: "#research" },
  { label: "Developers", href: "#developers" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Company", href: "#company" },
];

export default function LexiNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-300 ${
        scrolled
          ? "bg-[#0f110d]/85 backdrop-blur-md border-b rule-dark"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1440px] items-center justify-between px-5 md:px-10 h-[60px]"
      >
        <a href="#top" className="flex items-baseline gap-3 group">
          <span className="lexi-micro font-semibold tracking-[0.22em] text-[#ede8db]">
            LEXI&nbsp;LABS
          </span>
          <span
            aria-hidden
            className="hidden sm:inline-block h-[7px] w-[7px] bg-[#e8490f] group-hover:scale-125 transition-transform"
          />
          <span className="lexi-micro hidden sm:inline text-[#ede8db]/50">
            FLEEN&nbsp;1.0
          </span>
        </a>

        {/* Desktop: editorial spacing, no hamburger */}
        <ul className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="lexi-micro text-[#ede8db]/65 hover:text-[#ede8db] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-5">
          <a
            href="#research-paper"
            className="lexi-micro text-[#ede8db]/65 hover:text-[#ede8db] transition-colors"
          >
            Read&nbsp;the&nbsp;research
          </a>
          <a
            href="#demo"
            className="lexi-micro bg-[#ede8db] text-[#0f110d] px-4 py-2.5 hover:bg-[#e8490f] hover:text-white transition-colors"
          >
            Explore&nbsp;FLEEN
          </a>
        </div>

        {/* Mobile: intentionally designed full composition */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="lexi-mobile-nav"
          className="lg:hidden lexi-micro text-[#ede8db] border rule-dark px-4 py-2.5 min-h-[44px]"
        >
          {open ? "Close" : "Index"}
        </button>
      </nav>

      {open && (
        <div
          id="lexi-mobile-nav"
          className="lg:hidden border-t rule-dark bg-[#0f110d]/97 backdrop-blur-md"
        >
          <ol className="px-5 py-6 space-y-0">
            {LINKS.map((l, i) => (
              <li key={l.label} className="border-b rule-dark last:border-0">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 min-h-[44px]"
                >
                  <span className="text-2xl font-semibold tracking-tight">
                    {l.label}
                  </span>
                  <span className="lexi-micro text-[#ede8db]/40">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
            <li className="pt-5 flex gap-3">
              <a
                href="#demo"
                onClick={() => setOpen(false)}
                className="flex-1 text-center lexi-micro bg-[#ede8db] text-[#0f110d] px-4 py-3.5"
              >
                Explore FLEEN
              </a>
              <a
                href="#research-paper"
                onClick={() => setOpen(false)}
                className="flex-1 text-center lexi-micro border rule-dark px-4 py-3.5"
              >
                Research
              </a>
            </li>
          </ol>
        </div>
      )}
    </header>
  );
}
