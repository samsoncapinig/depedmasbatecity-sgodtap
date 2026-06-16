import { ContentList } from '@/components/site/ContentList';
import { getContentBySection } from '@/lib/data';

export default async function ArticlesPage() {
  const items = await getContentBySection('articles');
  return <ContentList title="Articles" description="Division stories, updates, and features." items={items} />;
}
