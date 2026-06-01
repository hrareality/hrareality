import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const STAR_COUNT = 300;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init stars
    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 1000,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x * 30;
      const my = mouseRef.current.y * 30;

      for (const star of starsRef.current) {
        star.z -= 0.15;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
        }

        const scale = 400 / star.z;
        const sx = (star.x + mx) * scale + w / 2;
        const sy = (star.y + my) * scale + h / 2;
        const r = star.size * scale * 0.5;

        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;

        const alpha = star.opacity * Math.min(1, (1000 - star.z) / 200);

        // Purple-tinted stars
        const hue = 260 + Math.random() * 40;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.3, r), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 60%, 80%, ${alpha})`;
        ctx.fill();

        // Glow for brighter stars
        if (r > 0.8) {
          ctx.beginPath();
          ctx.arc(sx, sy, r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(270, 100%, 65%, ${alpha * 0.15})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
