import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const mainCursor = useRef(null);
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x, y, vx, vy) => {
      const size = Math.random() * 3 + 1;
      // Combine mouse velocity with some randomness for the "float"
      const pvx = (vx * 0.1) + (Math.random() - 0.5) * 1.5;
      const pvy = (vy * 0.1) + (Math.random() - 0.5) * 1.5 - 0.5; // Slight upward bias
      
      // Use colors based on hover state (matching user's CSS theme)
      const color = isHovered ? '25, 164, 94' : '87, 65, 3'; // Green if hovered, Dark Gold/Brown otherwise
      
      return {
        x,
        y,
        size,
        vx: pvx,
        vy: pvy,
        opacity: 1,
        color
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.015;
        p.size *= 0.99;

        if (p.opacity <= 0) {
          particles.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Calculate velocity
      const vx = clientX - mouse.current.prevX;
      const vy = clientY - mouse.current.prevY;
      
      mouse.current.x = clientX;
      mouse.current.y = clientY;
      mouse.current.prevX = clientX;
      mouse.current.prevY = clientY;

      // Spawn more bubbles when moving fast
      const numParticles = Math.min(Math.ceil(Math.sqrt(vx * vx + vy * vy) / 5), 5);
      for (let i = 0; i < numParticles; i++) {
        particles.current.push(createParticle(clientX, clientY, vx, vy));
      }
      
      if (mainCursor.current) {
        mainCursor.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.closest('a, button, input, textarea, [role="button"], .interactive');
      setIsHovered(!!isClickable);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, [isHovered]);

  return (
    <div className="cursor-wrapper">
      <canvas ref={canvasRef} className="cursor-canvas" />
      <div 
        ref={mainCursor} 
        className={`cursor-dot-simple ${isHovered ? 'hover' : ''}`} 
      />
    </div>
  );
};

export default CustomCursor;
