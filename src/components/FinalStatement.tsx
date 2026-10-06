"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/**
 * FINAL STATEMENT — closing frame of a film. Extremely spacious.
 * One statement, two essential actions, quiet institutional footer.
 */
export default function FinalStatement() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !scope.current) return;
    const ctx = gsap.context(() => {
      // Masked lines animate --lexi-r (see FleenReveal note).
      gsap.fromTo(
        "[data-final-line]",
        { "--lexi-r": "110%" },
        {
          "--lexi-r": "0%",
          duration: 1.4,
          stagger: 0.14,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-final-head]", start: "top 82%" },
        }
      );
      gsap.fromTo(
        "[data-final-cta]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-final-head]", start: "top 60%" },
        }
      );
      // slow settle as the page ends — the film's last breath
      gsap.to("[data-final-head]", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-final-head]",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="company" ref={scope} data-lexi-scope className="border-t rule-dark scroll-mt-16">
      <section aria-label="Closing statement" className="mx-auto max-w-[1440px] px-5 md:px-10 pt-24 md:pt-44 pb-14 md:pb-20 text-center">
        <h2 data-final-head className="lexi-display text-[13vw] md:text-[9vw] leading-[0.9] mx-auto max-w-[12ch]">
          <span className="mask-line">
            <span data-final-line>Build on</span>
          </span>
          <span className="mask-line">
            <span data-final-line className="text-[#e8490f]">something solid.</span>
          </span>
        </h2>
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            data-final-cta
            href="#demo"
            className="lexi-micro bg-[#ede8db] text-[#0f110d] px-8 py-4 hover:bg-[#e8490f] hover:text-white transition-colors min-h-[44px] inline-flex items-center"
          >
            Explore&nbsp;FLEEN
          </a>
          <a
            data-final-cta
            href="#top"
            className="lexi-micro border rule-dark px-8 py-4 text-[#ede8db]/80 hover:text-white hover:border-[#e8490f] transition-colors min-h-[44px] inline-flex items-center"
          >
            Explore&nbsp;LEXI&nbsp;LABS
          </a>
        </div>
      </section>

      {/* Quiet institutional strip */}
      <div className="border-t rule-dark">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="lexi-micro text-[#ede8db]/55">LEXI&nbsp;LABS · FLEEN&nbsp;1.0</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2">
            {[
              ["FLEEN", "#fleen"],
              ["Research", "#research"],
              ["Developers", "#developers"],
              ["Infrastructure", "#infrastructure"],
            ].map(([l, h]) => (
              <a key={l} href={h} className="lexi-micro text-[#ede8db]/50 hover:text-[#ede8db] transition-colors">
                {l}
              </a>
            ))}
          </nav>
          <p className="lexi-micro text-[#ede8db]/35">© MMXXVI LEXI LABS</p>
        </div>
      </div>
    </footer>
  );
}
