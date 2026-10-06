"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

const FleenField = dynamic(() => import("./FleenField"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full" aria-hidden>
      <svg viewBox="0 0 800 420" className="h-full w-full opacity-60">
        {Array.from({ length: 10 }).map((_, r) => (
          <line key={r} x1="0" y1={40 + r * 36} x2="800" y2={40 + r * 36} stroke="#ede8db" strokeOpacity="0.12" />
        ))}
      </svg>
    </div>
  ),
});

/**
 * FLEEN 1.0 hero reveal — the model as scientific artifact.
 * FLEEN and 1.0 carry distinct roles: name (identity) vs. revision (instrument reading).
 */
export default function FleenReveal() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !scope.current) return;
    const ctx = gsap.context(() => {
      // NOTE: masked spans animate --lexi-r, never yPercent — GSAP would
      // otherwise preserve the stylesheet translate and hide them forever.
      gsap.fromTo(
        "[data-hero-fleen]",
        { "--lexi-r": "110%" },
        {
          "--lexi-r": "0%",
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-hero-wrap]", start: "top 82%" },
        }
      );
      gsap.fromTo(
        "[data-hero-num]",
        { "--lexi-r": "110%" },
        {
          "--lexi-r": "0%",
          duration: 1.3,
          delay: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: "[data-hero-wrap]", start: "top 82%" },
        }
      );
      gsap.fromTo(
        "[data-hero-meta]",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-hero-wrap]", start: "top 70%" },
        }
      );
      // 1.0 parallax drift against FLEEN — scroll-linked transformation
      gsap.to("[data-hero-num]", {
        xPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: "[data-hero-wrap]", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      // field drifts and settles as the visitor leaves the hero
      gsap.fromTo(
        "[data-hero-field]",
        { y: 0 },
        {
          y: 90,
          ease: "none",
          scrollTrigger: { trigger: "[data-hero-field]", start: "top bottom", end: "bottom top", scrub: 1.2 },
        }
      );
      gsap.fromTo(
        "[data-hero-wrap]",
        { y: 0 },
        {
          y: -50,
          ease: "none",
          scrollTrigger: { trigger: "[data-hero-wrap]", start: "top top", end: "bottom top", scrub: 1 },
        }
      );
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="fleen"
      ref={scope}
      data-lexi-scope
      aria-label="FLEEN 1.0 introduction"
      className="relative border-t rule-dark"
    >
      <div data-hero-wrap className="mx-auto max-w-[1440px] px-5 md:px-10 pt-14 md:pt-20">
        <h2 aria-label="FLEEN 1.0" className="relative mt-2 select-none">
          <span className="mask-line overflow-hidden">
            <span data-hero-fleen className="lexi-display block text-[21vw] md:text-[19vw]">
              FLEEN
            </span>
          </span>
          <span className="mask-line overflow-hidden md:absolute md:right-0 md:top-[4%] md:w-[30%]">
            <span
              data-hero-num
              className="lexi-display block text-[21vw] md:text-[9vw] text-transparent md:text-right"
              style={{ WebkitTextStroke: "1.5px #ede8db" }}
              aria-hidden={false}
            >
              1.0
            </span>
          </span>
        </h2>

        <div className="grid md:grid-cols-12 gap-8 mt-6 md:mt-4 items-end">
          <p data-hero-meta className="md:col-span-5 text-lg leading-relaxed text-[#ede8db]/80 lexi-body-narrow">
            FLEEN&nbsp;1.0 is a foundational model — the layer beneath
            future systems, not another application on top.
          </p>
          <div data-hero-meta className="md:col-span-7 flex flex-wrap md:justify-end gap-3">
            <a
              href="#demo"
              className="lexi-micro bg-[#e8490f] text-white px-6 py-3.5 hover:bg-[#ede8db] hover:text-[#0f110d] transition-colors min-h-[44px] inline-flex items-center"
            >
              Explore&nbsp;FLEEN
            </a>
            <a
              href="#research-paper"
              className="lexi-micro border rule-dark px-6 py-3.5 hover:border-[#e8490f] hover:text-white transition-colors min-h-[44px] inline-flex items-center"
            >
              Read&nbsp;the&nbsp;research
            </a>
          </div>
        </div>
      </div>

      {/* Proprietary object */}
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 mt-8 md:mt-10">
        <figure data-hero-field className="border-t rule-dark pt-4">
          <div className="instrument overflow-hidden">
            <FleenField className="h-[52svh] md:h-[64vh] w-full" />
          </div>
        </figure>
      </div>
    </section>
  );
}
