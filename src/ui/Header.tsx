import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { SiteText } from '../types';

interface HeaderProps {
  name: string;
  nav: SiteText['nav'];
}

export function Header({ name, nav }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 transition-[background-color,box-shadow] duration-300 md:px-12 ${
          scrolled ? 'bg-bg shadow-[0_1px_0_var(--color-line)]' : 'bg-transparent'
        }`}
      ><motion.span
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-lilac"
        />
        <a href="#top" className="text-sm font-black uppercase tracking-[0.2em] text-ink">
          {name}
        </a>
        <button type="button" onClick={() => setOpen(true)} className="btn-outline">
          {nav.menuButton}
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg px-6 py-5 md:px-12"
            aria-label="Main"
          >
            <div className="flex justify-end">
              <button type="button" onClick={close} className="btn-outline">
                {nav.closeButton}
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {nav.links.map((link, index) => (
                <motion.li
                  key={link.target}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
                >
                  <a
                    href={`#${link.target}`}
                    onClick={close}
                    className="display block text-[clamp(3rem,9vw,7rem)] text-ink transition-colors hover:text-mute"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
