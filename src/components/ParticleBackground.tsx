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
  life?: number; // For burst particles
  maxLife?: number; // For burst particles
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
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseSpeed = 0;

    const getColors = () => {
      const isDark = document.documentElement.dataset.scheme === "dark";
      if (isDark) {
        return [
          "rgba(244, 143, 177, 0.6)", // Darker pink
          "rgba(251, 113, 133, 0.6)", // Rose
          "rgba(232, 121, 249, 0.6)", // Purple
          "rgba(167, 139, 250, 0.6)", // Light purple
        ];
      }
      return [
        "rgba(255, 183, 197, 0.8)", // Soft pink
        "rgba(255, 218, 224, 0.8)", // Lighter pink
        "rgba(255, 240, 245, 0.8)", // Lavender blush
        "rgba(240, 230, 220, 0.7)", // Warm dust
      ];
    };

    let colors = getColors();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const updateColors = () => {
      colors = getColors();
    };

    const createParticle = (x: number, y: number, isBurst = false): Particle => {
      const baseSize = isBurst ? Math.random() * 4 + 2 : Math.random() * 5 + 3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      if (isBurst) {
        // Burst particles scatter in all directions
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 4;
        return {
          x,
          y,
          size: baseSize,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          color,
          opacity: 1,
          angle: Math.random() * 360,
          spin: (Math.random() - 0.5) * 0.3,
          life: 0,
          maxLife: Math.random() * 60 + 40, // 40-100 frames
        };
      }
      
      // Mouse trail particles
      return {
        x,
        y,
        size: baseSize,
        speedX: (Math.random() - 0.5) * 2,
        speedY: Math.random() * 2 + 1,
        color,
        opacity: Math.random() * 0.5 + 0.5,
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 0.1,
        life: 0,
        maxLife: Math.random() * 80 + 60, // 60-140 frames
      };
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(window.innerWidth / 20, 80);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: Math.random() * 0.8 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.4 + 0.2,
          angle: Math.random() * 360,
          spin: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      mouseSpeed = Math.sqrt(dx * dx + dy * dy);
      
      // Create trail particles based on mouse speed
      if (mouseSpeed > 2 && Math.random() > 0.3) {
        const numTrailParticles = Math.min(Math.floor(mouseSpeed / 3), 3);
        for (let i = 0; i < numTrailParticles; i++) {
          particles.push(createParticle(
            mouseX + (Math.random() - 0.5) * 20,
            mouseY + (Math.random() - 0.5) * 20
          ));
        }
      }
      
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      
      // Create burst of particles
      for (let i = 0; i < 30; i++) {
        particles.push(createParticle(clickX, clickY, true));
      }
    };

    const drawPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      
      ctx.beginPath();
      // Draw a cherry blossom petal shape
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
      
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.restore();
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        drawPetal(p);

        // Update position
        p.x += p.speedX + Math.sin(p.angle) * 0.3;
        p.y += p.speedY;
        p.angle += p.spin;

        // Handle burst particles
        if (p.life !== undefined && p.maxLife !== undefined) {
          p.life++;
          p.speedX *= 0.96; // Friction
          p.speedY *= 0.96;
          p.speedY += 0.1; // Gravity
          p.opacity = 1 - (p.life / p.maxLife);
          
          if (p.life >= p.maxLife) {
            particles.splice(i, 1);
            continue;
          }
        } else {
          // Regular particles reset if out of bounds
          if (p.y > canvas.height + p.size) {
            p.y = -p.size;
            p.x = Math.random() * canvas.width;
          }
          if (p.x > canvas.width + p.size) {
            p.x = -p.size;
          } else if (p.x < -p.size) {
            p.x = canvas.width + p.size;
          }
        }
      }

      // Limit total particles for performance
      if (particles.length > 300) {
        particles = particles.slice(-300);
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("storage", () => {
      updateColors();
    });
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);
    
    // Watch for theme changes
    const observer = new MutationObserver(() => {
      updateColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-scheme"],
    });
    
    resize();
    drawParticles();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("storage", updateColors);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
