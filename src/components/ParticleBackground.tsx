import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  angle: number;
  spin: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const colors = [
      "rgba(255, 183, 197, 0.6)", // Soft pink
      "rgba(255, 218, 224, 0.6)", // Lighter pink
      "rgba(255, 240, 245, 0.6)", // Lavender blush
      "rgba(240, 230, 220, 0.5)", // Warm dust
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(window.innerWidth / 15, 100); // Responsive amount
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 + 0.2, // Falling down slowly
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2,
          angle: Math.random() * 360,
          spin: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        ctx.beginPath();
        // Draw a soft petal-like shape or circle
        if (p.size > 2) {
          ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        } else {
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        }

        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();

        // Update position
        p.x += p.speedX + Math.sin(p.angle) * 0.5; // Swaying effect
        p.y += p.speedY;
        p.angle += p.spin;

        // Reset if out of bounds
        if (p.y > canvas.height + p.size) {
          p.y = -p.size;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + p.size) {
          p.x = -p.size;
        } else if (p.x < -p.size) {
          p.x = canvas.width + p.size;
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener("resize", resize);
    resize();
    drawParticles();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
