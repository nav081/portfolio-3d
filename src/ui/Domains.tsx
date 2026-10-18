import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Profile } from '../types';
import { SectionLabel } from './Sections';

interface DomainsProps {
  domains: Profile['domains'];
  label: string;
}

const TILES = [
  { span: 'md:col-span-3 md:min-h-[260px]', tint: 'bg-lilac/60', accent: 'bg-lilac', big: false, from: 'left' },
  { span: 'md:col-span-7 md:min-h-[260px]', tint: 'bg-sage/60', accent: 'bg-sage', big: true, from: 'right' },
  { span: 'md:col-span-7 md:min-h-[260px]', tint: 'bg-peach/60', accent: 'bg-peach', big: true, from: 'left' },
  { span: 'md:col-span-3 md:min-h-[260px]', tint: 'bg-sky/60', accent: 'bg-sky', big: false, from: 'right' },
  { span: 'md:col-span-10 md:min-h-[220px]', tint: 'bg-lilac/40', accent: 'bg-sage', big: true, from: 'center' },
] as const;

const ENTRY = {
  left: { x: -80, clipPath: 'inset(0 100% 0 0)' },
  right: { x: 80, clipPath: 'inset(0 0 0 100%)' },
  center: { x: 0, clipPath: 'inset(0 50% 0 50%)' },
};

const REVEALED = 'inset(0 0% 0 0%)';

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

export function Domains({ domains, label }: DomainsProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.15 });

  return (
    <section id="domains" className="px-6 py-16 md:px-12 md:py-20">
      <SectionLabel text={label} />
      <motion.ul
        ref={listRef}
        variants={listVariants}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-10"
      >
        {domains.map((domain, index) => {
          const tile = TILES[index % TILES.length];
          const linked = Boolean(domain.url && domain.url !== '#');
          const cardClass = `group relative flex min-h-[170px] flex-col justify-between overflow-hidden border border-line p-6 md:p-8 ${tile.tint}`;
          const body = (
            <>
              <span
                aria-hidden
                className="display pointer-events-none absolute -bottom-10 -right-4 select-none text-[9rem] leading-none text-ink/[0.06]"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <motion.span
                aria-hidden
                variants={{
                  hidden: { scaleX: 0 },
                  show: { scaleX: 1, transition: { duration: 1.2, ease: 'easeInOut', delay: 0.6 } },
                }}
                className={`absolute inset-x-0 top-0 h-[3px] origin-left ${tile.accent}`}
              />

              <div className="flex items-center justify-end gap-4">
                {domain.example && (
                  <span className="kicker text-right">
                    {domain.example}
                    {linked && (
                      <span aria-hidden className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    )}
                  </span>
                )}
              </div>
              <h3
                className={`display relative mt-8 transition-transform duration-500 group-hover:translate-x-2 ${
                  tile.big ? 'text-[clamp(2.5rem,5vw,4.5rem)]' : 'text-[clamp(1.75rem,3vw,2.5rem)]'
                }`}
              >
                {domain.label}
              </h3>
            </>
          );
          return (
            <motion.li
              key={domain.label}
              variants={{
                hidden: { opacity: 0, ...ENTRY[tile.from] },
                show: {
                  opacity: 1,
                  x: 0,
                  clipPath: REVEALED,
                  transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className={`flex ${tile.span}`}
            >
              {linked ? (
                <a href={domain.url} target="_blank" rel="noreferrer" className={`${cardClass} w-full`}>
                  {body}
                </a>
              ) : (
                <div className={`${cardClass} w-full`}>{body}</div>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
