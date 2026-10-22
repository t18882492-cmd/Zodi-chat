import React, { useEffect, useRef } from 'react';

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.min(140, Math.floor((width * height) / 9000));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.015 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.3 ? '#e0e7ff' : Math.random() > 0.5 ? '#c084fc' : '#38bdf8'
    }));

    // Generate shooting stars
    let shootingStar: {
      x: number;
      y: number;
      length: number;
      speed: number;
      dx: number;
      dy: number;
      opacity: number;
      active: boolean;
    } | null = null;

    const maybeSpawnShootingStar = () => {
      if (shootingStar && shootingStar.active) return;
      if (Math.random() < 0.008) {
        shootingStar = {
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 6,
          dx: 1,
          dy: 0.6,
          opacity: 1,
          active: true
        };
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep galactic gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#070814');
      gradient.addColorStop(0.4, '#0e0e24');
      gradient.addColorStop(0.75, '#12102e');
      gradient.addColorStop(1, '#080816');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle celestial nebulas
      const nebula1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.25,
        20,
        width * 0.2,
        height * 0.25,
        width * 0.45
      );
      nebula1.addColorStop(0, 'rgba(139, 92, 246, 0.12)');
      nebula1.addColorStop(0.5, 'rgba(112, 26, 117, 0.05)');
      nebula1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.65,
        30,
        width * 0.8,
        height * 0.65,
        width * 0.5
      );
      nebula2.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      nebula2.addColorStop(0.6, 'rgba(147, 51, 234, 0.04)');
      nebula2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Draw twinkling stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha >= 0.95) {
          star.alpha = 0.95;
          star.direction = -1;
        } else if (star.alpha <= 0.15) {
          star.alpha = 0.15;
          star.direction = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();

        // Star glow on brighter stars
        if (star.radius > 1.2 && star.alpha > 0.6) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.alpha * 0.25;
          ctx.fill();
        }
      });

      // Update & draw shooting star
      maybeSpawnShootingStar();
      if (shootingStar && shootingStar.active) {
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + shootingStar.opacity + ')';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - shootingStar.dx * shootingStar.length,
          shootingStar.y - shootingStar.dy * shootingStar.length
        );
        ctx.stroke();
        ctx.restore();

        shootingStar.x += shootingStar.dx * shootingStar.speed;
        shootingStar.y += shootingStar.dy * shootingStar.speed;
        shootingStar.opacity -= 0.015;

        if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar.active = false;
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
