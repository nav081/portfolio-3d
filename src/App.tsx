import { useCallback, useEffect, useState } from 'react';
import { loadContent } from './data/loadContent';
import { Cursor } from './ui/Cursor';
import { Detail } from './ui/Detail';
import { Domains } from './ui/Domains';
import { Header } from './ui/Header';
import { Hero } from './ui/Hero';
import { AboutSection, ExperienceSection, Footer, ProjectsSection } from './ui/Sections';
import type { PortfolioContent, Selection } from './types';

export default function App() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selection, setSelection] = useState<Selection>(null);

  useEffect(() => {
    loadContent().then(setContent).catch((err: unknown) => {
      setError(err instanceof Error ? err.message : String(err));
    });
  }, []);

  const closeDetail = useCallback(() => setSelection(null), []);

  if (error) {
    return <pre className="whitespace-pre-wrap p-8 text-sm text-ink">{error}</pre>;
  }

  if (!content) return <div className="min-h-screen bg-bg" />;

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Header name={content.profile.name} nav={content.site.nav} />
      <main>
        <Hero profile={content.profile} site={content.site.hero} />
        <Domains domains={content.profile.domains} label={content.site.hero.domainsLabel} />
        <ExperienceSection organizations={content.organizations} site={content.site.experience} onOpen={setSelection} />
        <ProjectsSection projects={content.personalProjects} site={content.site.projects} onOpen={setSelection} />
        <AboutSection profile={content.profile} site={content.site.about} />
      </main>
      <Footer profile={content.profile} site={content.site.footer} />
      <Detail content={content} selection={selection} site={content.site.detail} onClose={closeDetail} />
      <Cursor />
    </div>
  );
}
