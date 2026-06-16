import { ContentList } from '@/components/site/ContentList';
import { getContentBySection } from '@/lib/data';

export default async function CitizensCharterPage() {
  const items = await getContentBySection('citizens-charter');
  return <ContentList title="Citizen's Charter" description="Public service processes, requirements, and service commitment information." items={items} />;
}
