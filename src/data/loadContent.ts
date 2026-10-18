import type { Organization, PersonalProject, PortfolioContent, Profile, SiteText } from '../types';

const BASE_URL = import.meta.env.BASE_URL;

async function fetchJson<T>(file: string): Promise<T> {
  const response = await fetch(`${BASE_URL}data/${file}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${file} (HTTP ${response.status})`);
  }
  return (await response.json()) as T;
}

export async function loadContent(): Promise<PortfolioContent> {
  const [profile, organizations, personalProjects, site] = await Promise.all([
    fetchJson<Profile>('profile.json'),
    fetchJson<Organization[]>('organizations.json'),
    fetchJson<PersonalProject[]>('personal-projects.json'),
    fetchJson<SiteText>('site.json'),
  ]);

  const content: PortfolioContent = { profile, organizations, personalProjects, site };
  validateContent(content);
  return content;
}

/** Throws a single readable error listing every problem in the JSON content. */
export function validateContent(content: PortfolioContent): void {
  const errors: string[] = [];

  const requireText = (path: string, value: unknown) => {
    if (typeof value !== 'string' || value.trim() === '') errors.push(`${path} must be a non-empty string`);
  };
  const checkUnique = (path: string, ids: string[]) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) errors.push(`${path}: duplicate id "${id}"`);
      seen.add(id);
    }
  };

  requireText('profile.name', content.profile.name);
  requireText('profile.title', content.profile.title);
  requireText('site.nav.menuButton', content.site.nav.menuButton);
  requireText('site.nav.closeButton', content.site.nav.closeButton);
  requireText('site.hero.kicker', content.site.hero.kicker);
  requireText('site.hero.domainsLabel', content.site.hero.domainsLabel);
  requireText('site.hero.exploreButton', content.site.hero.exploreButton);
  requireText('site.hero.contactButton', content.site.hero.contactButton);
  requireText('site.experience.label', content.site.experience.label);
  requireText('site.projects.label', content.site.projects.label);
  requireText('site.about.label', content.site.about.label);
  requireText('site.detail.closeButton', content.site.detail.closeButton);
  requireText('site.footer.note', content.site.footer.note);

  if (content.organizations.length === 0) errors.push('organizations must contain at least one entry');
  checkUnique('organizations', content.organizations.map((o) => o.id));
  content.organizations.forEach((org, i) => {
    const base = `organizations[${i}]`;
    requireText(`${base}.id`, org.id);
    requireText(`${base}.name`, org.name);
    requireText(`${base}.glyph`, org.glyph);
    requireText(`${base}.color`, org.color);
    checkUnique(`${base}.projects`, org.projects.map((p) => p.id));
    org.projects.forEach((p, j) => {
      requireText(`${base}.projects[${j}].title`, p.title);
      requireText(`${base}.projects[${j}].summary`, p.summary);
    });
  });

  checkUnique('personalProjects', content.personalProjects.map((p) => p.id));
  content.personalProjects.forEach((p, i) => {
    requireText(`personalProjects[${i}].title`, p.title);
    requireText(`personalProjects[${i}].color`, p.color);
  });

  if (errors.length > 0) {
    throw new Error(`Invalid portfolio content:\n- ${errors.join('\n- ')}`);
  }
}
