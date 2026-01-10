import React, { useRef, useEffect } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
};

export default function SnowParticles({ count = 160 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // init particles
    const particles: Particle[] = [];
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: Math.random() * 0.6 + 0.2,
        r: Math.random() * 2 + 1,
        opacity: 0.6 + Math.random() * 0.4,
      });
    }
    particlesRef.current = particles;

    // pointer handling
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left);
      mouseRef.current.y = (e.clientY - rect.top);
      mouseRef.current.active = true;
    };
    const onLeave = () => (mouseRef.current.active = false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(50, now - last) / 16.6667; // normalize to ~60fps
      last = now;

      if (!ctx) return;

      // clear but leave slight trail
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const active = mouseRef.current.active;

      for (const p of particlesRef.current) {
        // attraction towards cursor
        if (active) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.max(10, Math.sqrt(dx * dx + dy * dy));
          const force = 200 / (dist * dist); // tweakable
          p.vx += (dx / dist) * force * 0.08 * dt;
          p.vy += (dy / dist) * force * 0.08 * dt;
        }

        // gentle drift and gravity
        p.vx += (Math.random() - 0.5) * 0.02 * dt;
        p.vy += 0.02 * dt; // gravity-like

        // apply velocity
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // wrap or reset
        if (p.y > canvas.clientHeight + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.clientWidth;
          p.vy = Math.random() * 0.6 + 0.2;
        }
        if (p.x < -20) p.x = canvas.clientWidth + 20;
        if (p.x > canvas.clientWidth + 20) p.x = -20;

        // draw
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    />
  );
}
