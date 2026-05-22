"use client";

import { useEffect, useRef } from "react";

export default function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let stars: {
      x: number;
      y: number;
      r: number;
      alpha: number;
      speed: number;
      drift: number;
    }[] = [];
    let raf = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.15 + 0.05,
        drift: (Math.random() - 0.5) * 0.3,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const grad = ctx.createRadialGradient(
        W * 0.5,
        H * 0.3,
        0,
        W * 0.5,
        H * 0.3,
        H * 0.85
      );
      grad.addColorStop(0, "rgba(59,130,246,0.28)");
      grad.addColorStop(0.4, "rgba(37,99,235,0.12)");
      grad.addColorStop(1, "rgba(5,10,22,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      stars.forEach((s) => {
        s.y -= s.speed;
        s.x += s.drift;
        if (s.y < -2) {
          s.y = H + 2;
          s.x = Math.random() * W;
        }
        if (s.x < -2 || s.x > W + 2) s.x = Math.random() * W;
        const flicker =
          Math.sin(t * 0.001 * (s.speed * 10) + s.x) * 0.2 + 0.8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 220, 255, ${s.alpha * flicker})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}
