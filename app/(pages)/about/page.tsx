import { ContentList } from '@/components/site/ContentList';
import { getContentBySection } from '@/lib/data';

export default async function AboutPage() {
  const items = await getContentBySection('about');
  return <ContentList title="About" description="Office profile, mission, vision, and portal information." items={items} />;
}
