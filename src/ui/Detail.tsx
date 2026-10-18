import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import type { Organization, PersonalProject, PortfolioContent, Project, Selection, SiteText } from '../types';

interface DetailProps {
  content: PortfolioContent;
  selection: Selection;
  site: SiteText['detail'];
  onClose: () => void;
}

export function Detail({ content, selection, site, onClose }: DetailProps) {
  useEffect(() => {
    if (!selection) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selection, onClose]);

  const org = selection?.kind === 'org' ? content.organizations.find((o) => o.id === selection.id) : undefined;
  const orb = selection?.kind === 'orb' ? content.personalProjects.find((p) => p.id === selection.id) : undefined;

  return (
    <AnimatePresence>
      {selection && (
        <motion.div
          key={`${selection.kind}-${selection.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] overflow-y-auto bg-bg"
          role="dialog"
          aria-modal="true"
        >
          <button type="button" onClick={onClose} className="btn-outline fixed right-6 top-5 z-10 md:right-12">
            {site.closeButton}
          </button>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-4xl px-6 pb-24 pt-28 md:px-12"
          >
            {org && <OrgBody org={org} site={site} />}
            {orb && <OrbBody orb={orb} site={site} />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OrgBody({ org, site }: { org: Organization; site: SiteText['detail'] }) {
  return (
    <>
      {org.logo && (
        <div className="mb-8 flex h-24 w-full max-w-[200px] items-center justify-center rounded-xl border border-line bg-white p-4">
          <img
            src={`${import.meta.env.BASE_URL}${org.logo}`}
            alt={`${org.name} logo`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
      <p className="kicker">{org.period}</p>
      <h2 className="display mt-6 text-[clamp(3rem,8vw,6rem)]">{org.name}</h2>
      <p className="mt-6 text-xl text-ink">{org.role}</p>
      <p className="mt-4 max-w-2xl text-mute">{org.description}</p>
      {org.projects.map((project) => (
        <ProjectArticle
          key={project.id}
          item={project}
          site={site}
          meta={
            <>
              <span className="chip">{project.role}</span>
              <span className="chip">{project.year}</span>
            </>
          }
        />
      ))}
    </>
  );
}

function OrbBody({ orb, site }: { orb: PersonalProject; site: SiteText['detail'] }) {
  return (
    <ProjectArticle item={orb} site={site} meta={<span className="chip">{orb.status}</span>} />
  );
}

function ProjectArticle({
  item,
  site,
  meta,
}: {
  item: Project | PersonalProject;
  site: SiteText['detail'];
  meta: ReactNode;
}) {
  return (
    <article className="mt-16 border-t border-line pt-12">
      <div className="flex flex-wrap gap-3">{meta}</div>
      <h3 className="display mt-6 text-[clamp(2.25rem,5vw,4rem)]">{item.title}</h3>
      <p className="mt-6 max-w-2xl text-lg text-mute">{item.summary}</p>

      {item.highlights.length > 0 && (
        <div className="mt-10">
          <p className="kicker">{site.outcomesLabel}</p>
          <ul className="mt-4 space-y-3">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-ink">
                <span className="text-mute">—</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.stack.length > 0 && (
        <div className="mt-10">
          <p className="kicker">{site.stackLabel}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.links.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-4">
          {item.links.map((link) => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noreferrer" className="btn-outline">
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
