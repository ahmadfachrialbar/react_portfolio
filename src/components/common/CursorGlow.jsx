import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const idleRef = useRef(null);
  const posRef = useRef({ x: -400, y: -400 });

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const updateGlow = () => {
      const { x, y } = posRef.current;
      glow.style.setProperty('--glow-x', `${x}px`);
      glow.style.setProperty('--glow-y', `${y}px`);
      glow.dataset.raf = '';
    };

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      glow.style.opacity = '1';

      clearTimeout(idleRef.current);
      idleRef.current = setTimeout(() => {
        glow.style.opacity = '0';
      }, 2000);

      if (glow.dataset.raf === 'pending') return;
      glow.dataset.raf = 'pending';
      requestAnimationFrame(updateGlow);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(idleRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-700"
      style={{
        background:
          'radial-gradient(350px at var(--glow-x, -400px) var(--glow-y, -400px), rgba(var(--glow-rgb), 0.18), transparent 65%)',
      }}
    />
  );
}
