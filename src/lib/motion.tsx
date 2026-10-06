"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function useLexiMotion(
  setup: () => (() => void) | void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    const cleanup = setup();
    return () => {
      if (typeof cleanup === "function") cleanup();
      ScrollTrigger.getAll().forEach((t) => {
        if ((t.trigger as HTMLElement | null)?.closest("[data-lexi-scope]"))
          t.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
