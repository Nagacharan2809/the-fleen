"use client";

import { useEffect, useRef, useState } from "react";
import type * as ThreeTypes from "three";

/**
 * FLEEN FIELD — proprietary computational object.
 * Concept: latent-space topology. A survey lattice of nodes whose
 * elevation is a live inference field; token streams cross it and
 * settle into structure. It exists to show what FLEEN is: tokens →
 * structure. Not decoration: elevation + flow rate respond to pointer
 * and scroll, labelled in the hero as Fig. 01.
 *
 * Perf: capped DPR (1.5 desktop / 1 mobile), ≤2200 points, no postfx,
 * IntersectionObserver-gated rAF, static fallback when WebGL / motion
 * is reduced or unavailable.
 */
export default function FleenField({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState<boolean>(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || fallback) return;
    let renderer: ThreeTypes.WebGLRenderer | null = null;
    let raf = 0;
    let disposed = false;
    let visible = true;

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        setFallback(true);
        return;
      }
      if (disposed || !mount) return;

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const W = mount.clientWidth || 800;
      const H = mount.clientHeight || 600;

      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        setFallback(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5));
      renderer.setSize(W, H);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
      camera.position.set(0, 7.4, 13.2);
      camera.lookAt(0, 0, 0);

      // — Lattice nodes —
      const NX = isMobile ? 46 : 72;
      const NZ = isMobile ? 30 : 44;
      const count = NX * NZ;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const paper = new THREE.Color("#ede8db");
      const signal = new THREE.Color("#e8490f");
      const dim = new THREE.Color("#4a5040");
      let k = 0;
      for (let ix = 0; ix < NX; ix++) {
        for (let iz = 0; iz < NZ; iz++) {
          const x = (ix / (NX - 1) - 0.5) * 20;
          const z = (iz / (NZ - 1) - 0.5) * 13;
          positions[k * 3] = x;
          positions[k * 3 + 1] = 0;
          positions[k * 3 + 2] = z;
          const edge = Math.abs(ix / (NX - 1) - 0.5) * 2;
          const c = edge > 0.82 ? dim : paper;
          colors[k * 3] = c.r;
          colors[k * 3 + 1] = c.g;
          colors[k * 3 + 2] = c.b;
          k++;
        }
      }
      const latticeGeo = new THREE.BufferGeometry();
      latticeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      latticeGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const lattice = new THREE.Points(
        latticeGeo,
        new THREE.PointsMaterial({
          size: isMobile ? 0.055 : 0.045,
          vertexColors: true,
          transparent: true,
          opacity: 0.85,
          sizeAttenuation: true,
        })
      );
      lattice.rotation.y = -0.12;
      scene.add(lattice);

      // — Sparse structure lines (every 4th row) —
      const linePts: number[] = [];
      for (let ix = 0; ix < NX; ix += 2) {
        for (let iz = 0; iz < NZ - 1; iz += 2) {
          const a = ix * NZ + iz;
          const b = ix * NZ + iz + 1;
          linePts.push(a, b);
        }
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
      lineGeo.setIndex(linePts);
      const lines = new THREE.LineSegments(
        lineGeo,
        new THREE.LineBasicMaterial({ color: "#ede8db", transparent: true, opacity: 0.13 })
      );
      lines.rotation.y = -0.12;
      scene.add(lines);

      // — Token streams: points travelling +x, settling as x grows —
      const STREAMS = isMobile ? 90 : 170;
      const sPos = new Float32Array(STREAMS * 3);
      const sCol = new Float32Array(STREAMS * 3);
      const seed = new Float32Array(STREAMS * 3); // x offset, lane, speed
      for (let i = 0; i < STREAMS; i++) {
        seed[i * 3] = Math.random();
        seed[i * 3 + 1] = (Math.random() - 0.5) * 11;
        seed[i * 3 + 2] = 0.35 + Math.random() * 0.9;
        const isSig = i % 9 === 0;
        const c = isSig ? signal : paper;
        sCol[i * 3] = c.r;
        sCol[i * 3 + 1] = c.g;
        sCol[i * 3 + 2] = c.b;
      }
      const streamGeo = new THREE.BufferGeometry();
      streamGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
      streamGeo.setAttribute("color", new THREE.BufferAttribute(sCol, 3));
      const streams = new THREE.Points(
        streamGeo,
        new THREE.PointsMaterial({ size: 0.11, vertexColors: true, transparent: true, opacity: 0.95 })
      );
      streams.rotation.y = -0.12;
      scene.add(streams);

      const field = (x: number, z: number, t: number, px: number, py: number) => {
        const d = Math.sqrt(x * x * 0.12 + z * z * 0.2);
        let h =
          Math.sin(x * 0.55 + t * 0.7) * Math.cos(z * 0.6 - t * 0.5) * 1.15 +
          Math.sin(d * 1.4 - t * 0.9) * 0.55;
        // pointer wells: attention-like depression/elevation
        const dx = x - px * 10;
        const dz = z - py * 6;
        h += Math.exp(-(dx * dx * 0.06 + dz * dz * 0.12)) * 1.6;
        // settling: structure calms toward +x (tokens → representation)
        const settle = THREE.MathUtils.clamp((x + 10) / 20, 0, 1);
        return h * (1 - settle * 0.45);
      };

      let px = 0;
      let py = 0;
      const onPointer = (e: PointerEvent) => {
        const r = mount.getBoundingClientRect();
        px = ((e.clientX - r.left) / r.width - 0.5) * 2;
        py = -((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      let scrollBoost = 0;
      const onScroll = () => {
        const r = mount.getBoundingClientRect();
        const vh = window.innerHeight;
        scrollBoost = THREE.MathUtils.clamp(1 - Math.abs(r.top + r.height / 2 - vh / 2) / vh, 0, 1);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      const clock = new THREE.Clock();
      const posAttr = latticeGeo.getAttribute("position") as ThreeTypes.BufferAttribute;
      const lineAttr = lineGeo.getAttribute("position") as ThreeTypes.BufferAttribute;
      const sAttr = streamGeo.getAttribute("position") as ThreeTypes.BufferAttribute;
      const gl = renderer as ThreeTypes.WebGLRenderer;

      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        const t = clock.getElapsedTime() * (0.55 + scrollBoost * 0.5);

        for (let ix = 0; ix < NX; ix++) {
          for (let iz = 0; iz < NZ; iz++) {
            const i = ix * NZ + iz;
            const x = (ix / (NX - 1) - 0.5) * 20;
            const z = (iz / (NZ - 1) - 0.5) * 13;
            const y = field(x, z, t, px, py);
            posAttr.setY(i, y);
            lineAttr.setY(i, y);
          }
        }
        posAttr.needsUpdate = true;
        lineAttr.needsUpdate = true;

        for (let i = 0; i < STREAMS; i++) {
          const lane = seed[i * 3 + 1];
          const speed = seed[i * 3 + 2];
          const x = (((seed[i * 3] + t * 0.06 * speed) % 1) - 0.5) * 20;
          const y = field(x, lane, t, px, py) + 0.35;
          sAttr.setXYZ(i, x, y, lane);
        }
        sAttr.needsUpdate = true;

        scene.rotation.y = Math.sin(t * 0.08) * 0.06;
        gl.render(scene, camera);
      };
      tick();

      const onResize = () => {
        const w = mount.clientWidth || 800;
        const h = mount.clientHeight || 600;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        gl.setSize(w, h);
      };
      window.addEventListener("resize", onResize);
      (gl.domElement as HTMLCanvasElement).dataset.ready = "1";

      // cleanup closure
      const cleanup = () => {
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
      (mount as HTMLElement & { _lexiCleanup?: () => void })._lexiCleanup = cleanup;
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      const node = mount as HTMLElement & { _lexiCleanup?: () => void };
      node._lexiCleanup?.();
      if (renderer) {
        renderer.dispose?.();
        renderer.domElement?.remove?.();
      }
    };
  }, [fallback]);

  if (fallback) {
    // Static fallback: survey lattice as SVG — still premium, no WebGL.
    return (
      <div
        className={className}
        role="img"
        aria-label="Static diagram of the FLEEN latent lattice: token streams settling into structure"
      >
        <svg viewBox="0 0 800 420" className="h-full w-full" aria-hidden>
          {Array.from({ length: 13 }).map((_, r) => (
            <path
              key={r}
              d={`M 0 ${60 + r * 24} C 200 ${40 + r * 24}, 400 ${90 + r * 22}, 800 ${55 + r * 24}`}
              fill="none"
              stroke="#ede8db"
              strokeOpacity={r % 4 === 0 ? 0.5 : 0.18}
              strokeWidth={r % 4 === 0 ? 1.2 : 1}
            />
          ))}
          {Array.from({ length: 26 }).map((_, i) => (
            <circle
              key={i}
              cx={40 + ((i * 137) % 720)}
              cy={70 + ((i * 89) % 280)}
              r={i % 7 === 0 ? 3.4 : 1.8}
              fill={i % 7 === 0 ? "#e8490f" : "#ede8db"}
              fillOpacity={i % 7 === 0 ? 1 : 0.7}
            />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={mountRef} className="h-full w-full" aria-hidden={false} role="img"
        aria-label="Live computational field: a latent lattice with token streams settling into structured representation" />
    </div>
  );
}
