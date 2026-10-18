import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label';

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    setEnabled(true);

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest(INTERACTIVE)));
    };
    const onLeave = () => setHovering(false);

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full border-2 border-ink bg-lilac/20 transition-colors duration-300"
      style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: hovering ? 68 : 40,
        height: hovering ? 68 : 40,
        opacity: hovering ? 1 : 0.85,
        backgroundColor: hovering ? 'rgba(221, 213, 239, 0.7)' : 'rgba(221, 213, 239, 0.2)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    />
  );
}

