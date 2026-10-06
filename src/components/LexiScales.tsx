"use client";

import { useEffect, useRef } from "react";

/**
 * LEXI SCALES — orange wind over a rect field.
 * A quiet grid of instrument rects; pointer movement blows a
 * directional gust through them — cells swell and burn orange along
 * the wind vector, then settle. Idle gusts cross on their own so the
 * field never feels dead. Flat 2D canvas, DPR-capped, visibility-gated,
 * static when reduced motion is requested. Deliberately unlike the
 * FLEEN lattice: graphic, wind-driven, hover-led.
 */
export default function LexiScales({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let cell = 20;
    let energy = new Float32Array(0);
    let raf = 0;
    let visible = true;
    let disposed = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const mobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = mobile ? 28 : 20;
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      energy = new Float32Array(cols * rows);
    };
    resize();
    window.addEventListener("resize", resize);

    const paint = () => {
      ctx.clearRect(0, 0, w, h);
      const base = cell * 0.34;
      const max = cell * 0.86;
      ctx.fillStyle = "rgba(237,232,219,0.09)";
      for (let j = 0; j < rows; j++) {
        const y = j * cell;
        for (let i = 0; i < cols; i++) {
          if (energy[j * cols + i] < 0.03) {
            const x = i * cell;
            ctx.fillRect(
              x + (cell - base) / 2,
              y + (cell - base) / 2,
              base,
              base
            );
          }
        }
      }
      for (let j = 0; j < rows; j++) {
        const y = j * cell;
        for (let i = 0; i < cols; i++) {
          const e = energy[j * cols + i];
          if (e >= 0.03) {
            const s = Math.min(1, e);
            const size = base + (max - base) * s;
            const x = i * cell;
            const alpha = Math.min(0.92, 0.12 + s * 0.8);
            ctx.fillStyle = `rgba(232,73,15,${alpha.toFixed(3)})`;
            ctx.fillRect(
              x + (cell - size) / 2,
              y + (cell - size) / 2,
              size,
              size
            );
          }
        }
      }
    };

    // Reduced motion: one static frame, no loop, no listeners.
    if (reduced) {
      paint();
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    const R = 150;
    const deposit = (
      x: number,
      y: number,
      dx: number,
      dy: number,
      strength: number
    ) => {
      const len = Math.hypot(dx, dy) || 1;
      const nx = dx / len;
      const ny = dy / len;
      const x0 = Math.max(0, Math.floor((x - R * 1.7) / cell));
      const x1 = Math.min(cols - 1, Math.ceil((x + R * 1.7) / cell));
      const y0 = Math.max(0, Math.floor((y - R) / cell));
      const y1 = Math.min(rows - 1, Math.ceil((y + R) / cell));
      for (let j = y0; j <= y1; j++) {
        for (let i = x0; i <= x1; i++) {
          const cx = i * cell + cell / 2 - x;
          const cy = j * cell + cell / 2 - y;
          const along = cx * nx + cy * ny;
          const perp = Math.abs(cx * ny - cy * nx);
          const reach = along > 0 ? R * 1.6 : R * 0.45;
          const fwd = Math.max(0, 1 - Math.abs(along) / reach);
          const side = Math.max(0, 1 - perp / (R * 0.6));
          const e = fwd * side * strength;
          if (e > 0.02) {
            const k = j * cols + i;
            energy[k] = Math.min(1.4, energy[k] + e);
          }
        }
      }
    };

    let lastX = -9999;
    let lastY = -9999;
    let lastT = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < -50 || y < -50 || x > r.width + 50 || y > r.height + 50)
        return;
      const now = performance.now();
      if (lastX > -9998) {
        const dt = Math.max(16, now - lastT);
        const vx = ((x - lastX) / dt) * 16;
        const vy = ((y - lastY) / dt) * 16;
        const speed = Math.hypot(vx, vy);
        deposit(x, y, vx, vy, Math.min(1, 0.22 + speed / 38));
      } else {
        deposit(x, y, 1, 0, 0.3);
      }
      lastX = x;
      lastY = y;
      lastT = now;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    // Idle gusts — an opening sweep, then one every few seconds.
    let gustX = -140;
    let gustAmp = 0.6;
    let nextGust = performance.now() + 6500;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || disposed) return;
      if (now >= nextGust) {
        gustX = -140;
        gustAmp = 0.45 + Math.random() * 0.4;
        nextGust = now + 4200 + Math.random() * 2600;
      }
      if (gustX < w + 140) {
        gustX += Math.max(4, w / 220);
        const wob = Math.sin(now / 700) * 22;
        const gx = Math.round((gustX + wob) / cell);
        for (let j = 0; j < rows; j++) {
          for (let d = -1; d <= 1; d++) {
            const i = gx + d;
            if (i < 0 || i >= cols) continue;
            const k = j * cols + i;
            energy[k] = Math.min(
              1.4,
              energy[k] + gustAmp * 0.16 * (d === 0 ? 1 : 0.45)
            );
          }
        }
      }
      for (let k = 0; k < energy.length; k++) energy[k] *= 0.93;
      paint();
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
