export interface Link {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  handle: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  availability: string;
  email: string;
  links: Link[];
  skills: string[];
  stats: { label: string; value: string }[];
  domains: Domain[];
}

export interface Domain {
  label: string;
  example?: string;
  url?: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  metric?: string;
  stack: string[];
  highlights: string[];
  links: Link[];
}

export interface Organization {
  id: string;
  name: string;
  glyph: string;
  logo?: string;
  color: string;
  role: string;
  period: string;
  description: string;
  projects: Project[];
}

export interface PersonalProject {
  id: string;
  title: string;
  summary: string;
  status: 'Live' | 'Beta' | 'Experimental' | 'Archived';
  color: string;
  stack: string[];
  highlights: string[];
  links: Link[];
}

/** Interface copy (labels, buttons, section headings) loaded from site.json. */
export interface SiteText {
  nav: { menuButton: string; closeButton: string; links: { label: string; target: string }[] };
  hero: {
    kicker: string;
    domainsLabel: string;
    exploreButton: string;
    contactButton: string;
    scrollCue: string;
  };
  experience: { label: string; viewButton: string };
  projects: { label: string; openButton: string };
  about: { label: string; skillsLabel: string; contactButton: string };
  detail: { closeButton: string; stackLabel: string; outcomesLabel: string };
  footer: { note: string };
}

/** The org or personal project currently open in the detail overlay. */
export type Selection = { kind: 'org' | 'orb'; id: string } | null;

export interface PortfolioContent {
  profile: Profile;
  organizations: Organization[];
  personalProjects: PersonalProject[];
  site: SiteText;
}
