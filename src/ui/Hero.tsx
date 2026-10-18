import { motion } from 'framer-motion';
import type { Profile, SiteText } from '../types';
import { HeroSculpture } from '../scene/HeroSculpture';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

interface HeroProps {
  profile: Profile;
  site: SiteText['hero'];
}

export function Hero({ profile, site }: HeroProps) {
  return (
    <motion.section
      id="top"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-28 md:px-12 md:py-32"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[18%] h-80 w-80 rounded-full bg-lilac blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] right-[30%] h-72 w-72 rounded-full bg-sage blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.p variants={item} className="kicker mb-6">
            {site.kicker} {profile.name}
          </motion.p>
          <motion.h1 variants={item} className="display text-[clamp(3rem,7.5vw,7rem)]">
            {profile.title}
          </motion.h1>
          <motion.p variants={item} className="mt-8 max-w-xl text-lg text-mute">
            {profile.tagline}
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <a href="#experience" className="btn-outline">
              {site.exploreButton}
            </a>
            <a href={`mailto:${profile.email}`} className="btn-outline">
              {site.contactButton}
            </a>
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="relative order-first h-[340px] w-full md:order-none md:h-[720px]">
          <HeroSculpture />
        </motion.div>
      </div>

      <motion.p
        animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="kicker absolute bottom-8 left-6 z-10 hidden md:left-12 md:block"
      >
        {site.scrollCue}
      </motion.p>
    </motion.section>
  );
}

