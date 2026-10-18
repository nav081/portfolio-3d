import { motion } from 'framer-motion';
import type { Organization, PersonalProject, Profile, Selection, SiteText } from '../types';

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: 'easeOut' as const },
};

const drawLine = {
  initial: { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 1.2, ease: 'easeInOut' as const, delay: 0.2 },
};

const accents = ['bg-sage', 'bg-lilac', 'bg-peach', 'bg-sky'];

export function SectionLabel({ text }: { text: string }) {
  const chars = Array.from(text);
  return (
    <>
      <motion.p
        className="kicker flex items-center overflow-hidden"
        aria-label={text}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      >
        {chars.map((char, index) => {
          const isSlash = char === '/';
          return (
            <motion.span
              key={`${char}-${index}`}
              aria-hidden
              variants={{
                hidden: { y: '110%', opacity: 0, filter: 'blur(6px)' },
                show: { y: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } },
              }}
              className={`inline-block whitespace-pre ${isSlash ? 'text-ink' : ''}`}
            >
              {isSlash ? (
                <motion.span
                  className="inline-block"
                  animate={{ opacity: [1, 0.25, 1], scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                >
                  {char}
                </motion.span>
              ) : (
                char
              )}
            </motion.span>
          );
        })}
        <motion.span
          aria-hidden
          className="ml-2 inline-block h-3.5 w-[2px] bg-ink"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear', times: [0, 0.5, 0.5, 1] }}
        />
      </motion.p>
      <motion.span {...drawLine} aria-hidden className="mt-4 block h-px w-24 origin-left bg-ink" />
    </>
  );
}

interface ExperienceProps {
  organizations: Organization[];
  site: SiteText['experience'];
  onOpen: (selection: Selection) => void;
}

export function ExperienceSection({ organizations, site, onOpen }: ExperienceProps) {
  return (
    <motion.section id="experience" {...reveal} className="px-6 py-20 md:px-12 md:py-24">
      <SectionLabel text={site.label} />
      <ul className="mt-12 border-t border-line">
        {organizations.map((org, index) => (
          <motion.li
            key={org.id}
            {...reveal}
            transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
            className="group relative grid gap-6 border-b border-line py-10 md:grid-cols-[120px_1fr_auto] md:items-center"
          >
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-ink transition-transform duration-700 ease-out group-hover:scale-y-100"
            />
            <span aria-hidden className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-lilac transition-transform duration-700 ease-out group-hover:scale-x-100" />
            <span
              className={
                org.logo
                  ? 'flex h-20 w-full max-w-[160px] items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-3 transition-transform duration-500 group-hover:scale-110'
                  : `flex h-14 w-14 items-center justify-center rounded-full text-sm font-semibold text-ink transition-transform duration-500 group-hover:scale-110 ${accents[index % accents.length]}`
              }
            >
              {org.logo ? (
                <img
                  src={`${import.meta.env.BASE_URL}${org.logo}`}
                  alt={`${org.name} logo`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                org.glyph
              )}
            </span>
            <div>
              <p className="kicker">{org.period}</p>
              <h3 className="display mt-3 text-[clamp(2.25rem,5vw,4.5rem)] transition-transform duration-500 group-hover:translate-x-3">
                {org.name}
              </h3>
              <p className="mt-3 text-lg text-ink">{org.role}</p>
              <p className="mt-3 max-w-2xl text-mute">{org.description}</p>
            </div>
            <button
              type="button"
              onClick={() => onOpen({ kind: 'org', id: org.id })}
              className="btn-outline justify-self-start md:justify-self-end"
            >
              {site.viewButton}
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}

interface ProjectsProps {
  projects: PersonalProject[];
  site: SiteText['projects'];
  onOpen: (selection: Selection) => void;
}

export function ProjectsSection({ projects, site, onOpen }: ProjectsProps) {
  return (
    <motion.section id="projects" {...reveal} className="border-t border-line px-6 py-20 md:px-12 md:py-24">
      <SectionLabel text={site.label} />
      <ul className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
        {projects.map((project, index) => (
          <motion.li
            key={project.id}
            {...reveal}
            transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
          >
            <button
              type="button"
              onClick={() => onOpen({ kind: 'orb', id: project.id })}
              className="group relative flex min-h-72 w-full overflow-hidden flex-col justify-between bg-bg p-8 text-left transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:bg-panel hover:shadow-[0_18px_40px_-24px_rgba(47,44,56,0.35)] active:scale-[0.99]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100"
              />
              <div className="flex items-center justify-between">
                <span className="chip">{project.status}</span>
                <span className="text-mute transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </div>
              <div>
                <h3 className="display text-4xl">{project.title}</h3>
                <p className="mt-4 text-mute">{project.summary}</p>
              </div>
              <span className="kicker mt-8">{site.openButton}</span>
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}

interface AboutProps {
  profile: Profile;
  site: SiteText['about'];
}

export function AboutSection({ profile, site }: AboutProps) {
  return (
    <motion.section id="about" {...reveal} className="grid gap-12 border-t border-line px-6 py-20 md:grid-cols-2 md:gap-16 md:px-12 md:py-24">
      <div>
        <SectionLabel text={site.label} />
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="mt-6 flex items-center gap-3 text-sm text-mute"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage ring-1 ring-ink/30" />
          </span>
          {profile.location} · {profile.availability}
        </motion.p>
        <motion.p
          className="mt-8 text-2xl leading-relaxed text-ink md:text-3xl"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {profile.bio}
        </motion.p>
        <motion.a
          href={`mailto:${profile.email}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="btn-outline mt-10"
        >
          {site.contactButton}
        </motion.a>
      </div>
      <div className="space-y-16">
        <div>
          <SectionLabel text={site.skillsLabel} />
          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: Math.min(index, 12) * 0.03 }}
                className="chip"
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </div>
        <dl className="grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
          {profile.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.12 }}
            >
              <dt className="kicker">{stat.label}</dt>
              <dd className="display mt-3 text-4xl">{stat.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </motion.section>
  );
}

interface FooterProps {
  profile: Profile;
  site: SiteText['footer'];
}

export function Footer({ profile, site }: FooterProps) {
  return (
    <footer id="contact" className="border-t border-line px-6 py-16 md:px-12">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <motion.a
          href={`mailto:${profile.email}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="break-all bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_3px] bg-[position:0_100%] bg-no-repeat text-[clamp(2rem,5vw,4.5rem)] font-black tracking-[-0.03em] text-ink transition-[color,background-size] duration-500 hover:bg-[length:100%_3px] hover:text-mute"
        >
          {profile.email}
        </motion.a>
        <ul className="flex flex-wrap gap-6">
          {profile.links.map((link, index) => (
            <motion.li
              key={link.url}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <a href={link.url} target="_blank" rel="noreferrer" className="kicker transition-colors hover:text-ink">
                {link.label} ↗
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="kicker mt-16"
      >
        {site.note} · © {new Date().getFullYear()} {profile.name}
      </motion.p>
    </footer>
  );
}
