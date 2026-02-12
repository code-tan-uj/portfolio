"use client";

import {
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import { useTheme } from "@/hooks/useTheme";

/* ========================================================================== */
/*  Types & config                                                             */
/* ========================================================================== */

export interface ParticlesProps {
  /** Turn the effect on/off at runtime */
  enabled?: boolean;
  /** Total number of particles (default 70) */
  count?: number;
  /** Particle base colour — overrides theme default */
  color?: string;
  /** Max connection line distance in px (default 120) */
  linkDistance?: number;
  /** Particle travel speed multiplier (default 0.4) */
  speed?: number;
  /** Min particle radius (default 1.5) */
  sizeMin?: number;
  /** Max particle radius (default 3.5) */
  sizeMax?: number;
  /** Respond to mouse movement (default true) */
  interactive?: boolean;
  /** Extra class names on the canvas wrapper */
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
}

/* ========================================================================== */
/*  Theme-aware colour defaults                                                */
/* ========================================================================== */

const COLORS = {
  light: "99, 102, 241",   // indigo
  dark: "129, 140, 248",   // lighter indigo
} as const;

/* ========================================================================== */
/*  Component                                                                  */
/* ========================================================================== */

export default function Particles({
  enabled = true,
  count = 70,
  color,
  linkDistance = 120,
  speed = 0.4,
  sizeMin = 1.5,
  sizeMax = 3.5,
  interactive = true,
  className,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const [visible, setVisible] = useState(true);

  const { theme } = useTheme();
  const rgb = color ?? COLORS[theme];

  /* ---- Initialise particles --------------------------------------------- */
  const initParticles = useCallback(
    (w: number, h: number) => {
      const pts: Particle[] = [];
      for (let i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: sizeMin + Math.random() * (sizeMax - sizeMin),
          opacity: 0.25 + Math.random() * 0.5,
        });
      }
      particlesRef.current = pts;
    },
    [count, speed, sizeMin, sizeMax],
  );

  /* ---- Resize handler --------------------------------------------------- */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    initParticles(w, h);
  }, [initParticles]);

  /* ---- Effects ---------------------------------------------------------- */
  useEffect(() => {
    if (!enabled) return;

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [enabled, handleResize]);

  // Animation loop effect
  useEffect(() => {
    if (!enabled || !visible) {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      return;
    }

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      const pts = particlesRef.current;
      const mouse = mouseRef.current;
      const linkDist2 = linkDistance * linkDistance;

      ctx.clearRect(0, 0, w, h);

      // Update & draw particles
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Mouse repulsion (subtle push)
        if (interactive && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          const repelDist = 150;
          if (dist2 < repelDist * repelDist && dist2 > 0) {
            const dist = Math.sqrt(dist2);
            const force = (repelDist - dist) / repelDist * 0.8;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Ensure minimum speed
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd < speed * 0.2) {
          p.vx += (Math.random() - 0.5) * speed * 0.1;
          p.vy += (Math.random() - 0.5) * speed * 0.1;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connection lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < linkDist2) {
            const alpha = (1 - Math.sqrt(dist2) / linkDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Mouse attraction lines
      if (interactive && mouse.active) {
        for (let i = 0; i < pts.length; i++) {
          const dx = pts[i].x - mouse.x;
          const dy = pts[i].y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          const mouseDist = 180;
          if (dist2 < mouseDist * mouseDist) {
            const alpha = (1 - Math.sqrt(dist2) / mouseDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, visible, interactive, linkDistance, rgb, speed]);

  // Pause when tab is not visible
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Mouse tracking
  useEffect(() => {
    if (!interactive || !enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [interactive, enabled]);

  if (!enabled) return null;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: interactive ? "auto" : "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
