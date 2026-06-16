import { Hero } from '@/components/site/Hero';
import { QuickLinks } from '@/components/site/QuickLinks';
import { ContentList } from '@/components/site/ContentList';
import { getAnnouncements, getContentBySection, getQuickLinks, getSiteSettings } from '@/lib/data';

export default async function HomePage() {
  const [settings, quickLinks, announcements, issuances, articles] = await Promise.all([
    getSiteSettings(),
    getQuickLinks(),
    getAnnouncements(),
    getContentBySection('issuances', 3),
    getContentBySection('articles', 3),
  ]);

  return (
    <>
      <Hero title={settings?.hero_title} subtitle={settings?.hero_subtitle} />
      <QuickLinks items={quickLinks} />
      <ContentList title="Announcements" description="Featured updates and notices." items={announcements} sectionPath="/articles" />
      <ContentList title="Latest Issuances" description="Division memoranda, bulletins, and policy documents." items={issuances} sectionPath="/issuances" />
      <ContentList title="Recent Articles" description="Public-facing news and updates." items={articles} sectionPath="/articles" />
    </>
  );
}
