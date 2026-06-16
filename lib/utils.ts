export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function sectionLabel(section: string) {
  const map: Record<string, string> = {
    announcements: 'Announcements',
    issuances: 'Issuances',
    downloadables: 'Downloadables',
    articles: 'Articles',
    'citizens-charter': "Citizen's Charter",
    about: 'About',
  };
  return map[section] ?? section;
}
