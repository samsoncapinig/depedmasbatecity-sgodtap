import { ContentList } from '@/components/site/ContentList';
import { getContentBySection } from '@/lib/data';

export default async function DownloadablesPage() {
  const items = await getContentBySection('downloadables');
  return <ContentList title="Downloadables" description="Forms, templates, and reference documents." items={items} />;
}
