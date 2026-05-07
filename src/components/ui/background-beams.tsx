"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const beams: {
      x: number; y: number; length: number;
      angle: number; speed: number; opacity: number; width: number;
    }[] = [];

    for (let i = 0; i < 12; i++) {
      beams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 300 + 150,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
        opacity: Math.random() * 0.4 + 0.1,
        width: Math.random() * 1.5 + 0.5,
      });
    }

    function drawGrid() {
      if (!ctx || !canvas) return;
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      const size = 60;
      for (let x = 0; x < width; x += size) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += size) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      beams.forEach((beam) => {
        beam.angle += beam.speed * 0.01;
        const endX = beam.x + Math.cos(beam.angle) * beam.length;
        const endY = beam.y + Math.sin(beam.angle) * beam.length;

        const gradient = ctx.createLinearGradient(beam.x, beam.y, endX, endY);
        gradient.addColorStop(0, `rgba(59,130,246,0)`);
        gradient.addColorStop(0.4, `rgba(59,130,246,${beam.opacity})`);
        gradient.addColorStop(0.7, `rgba(139,92,246,${beam.opacity * 0.7})`);
        gradient.addColorStop(1, `rgba(139,92,246,0)`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = beam.width;
        ctx.moveTo(beam.x, beam.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // drift slowly
        beam.x += Math.cos(beam.angle + Math.PI / 2) * 0.15;
        beam.y += Math.sin(beam.angle + Math.PI / 2) * 0.15;
        if (beam.x < -100) beam.x = width + 100;
        if (beam.x > width + 100) beam.x = -100;
        if (beam.y < -100) beam.y = height + 100;
        if (beam.y > height + 100) beam.y = -100;
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
    />
  );
}
