"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * LEXI smooth layer — buttery Lenis scroll wired into GSAP's ticker,
 * anchor navigation via scrollTo, and one global masked entrance for
 * every [data-chapter-title]. Skipped entirely under reduced motion.
 */
export default function LexiSmooth() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", () => ScrollTrigger.update());
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const a = el?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -64, duration: 1.5 });
    };
    document.addEventListener("click", onClick);

    // Global chapter-title entrances — masked rise, fired once each.
    const titles = gsap.utils.toArray<HTMLElement>("[data-chapter-title]");
    titles.forEach((t) => gsap.set(t, { y: 56, opacity: 0 }));
    const triggers = titles.map((t) =>
      ScrollTrigger.create({
        trigger: t,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(t, {
            y: 0,
            opacity: 1,
            duration: 1.25,
            ease: "power3.out",
          }),
      })
    );

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      triggers.forEach((t) => t.kill());
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
