import { ContentList } from '@/components/site/ContentList';
import { getContentBySection } from '@/lib/data';

export default async function IssuancesPage() {
  const items = await getContentBySection('issuances');
  return <ContentList title="Issuances" description="Memoranda, bulletins, advisories, and official notices." items={items} />;
}
