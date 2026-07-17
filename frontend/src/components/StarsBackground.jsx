import React, { useEffect, useRef } from 'react';

export default function StarsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 100;
    const mouse = { x: null, y: null, radius: 150 };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width, // Store base position for repulsion recovery
        baseY: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2, // Drift speed
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        depth: Math.random() * 0.8 + 0.2, // For parallax effect
      });
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Re-distribute base positions if window changes size
      particles.forEach(p => {
        p.baseX = Math.random() * width;
        p.baseY = Math.random() * height;
        p.x = p.baseX;
        p.y = p.baseY;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Drift the base position slightly
        p.baseX += p.vx;
        p.baseY += p.vy;

        // Wrap around boundaries
        if (p.baseX < 0) p.baseX = width;
        if (p.baseX > width) p.baseX = 0;
        if (p.baseY < 0) p.baseY = height;
        if (p.baseY > height) p.baseY = 0;

        let targetX = p.baseX;
        let targetY = p.baseY;

        // Parallax offset based on mouse position
        if (mouse.x !== null && mouse.y !== null) {
          const offsetX = (mouse.x - width / 2) * p.depth * 0.05;
          const offsetY = (mouse.y - height / 2) * p.depth * 0.05;
          targetX -= offsetX;
          targetY -= offsetY;

          // Mouse Repulsion Physics
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius; // 0 to 1
            const angle = Math.atan2(dy, dx);
            // Push away from mouse
            targetX -= Math.cos(angle) * force * 50;
            targetY -= Math.sin(angle) * force * 50;
            
            // Draw a subtle connecting glow line to mouse if close enough
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(96, 165, 250, ${0.12 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        // Smoothly interpolate to target position
        p.x += (targetX - p.x) * 0.1;
        p.y += (targetY - p.y) * 0.1;

        // Twinkle opacity
        p.alpha += p.twinkleSpeed * p.twinkleDirection;
        if (p.alpha > 0.9 || p.alpha < 0.1) {
          p.twinkleDirection *= -1;
        }

        // Draw star particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowBlur = p.radius > 1.2 ? 4 : 0;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent"
    />
  );
}
