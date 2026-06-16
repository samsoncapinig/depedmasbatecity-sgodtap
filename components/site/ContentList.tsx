import { sectionLabel } from '@/lib/utils';
import { SectionCard } from '@/components/site/SectionCard';

export function ContentList({
  title,
  description,
  items,
  sectionPath,
}: {
  title: string;
  description?: string;
  items: Array<{ id: string; title: string; summary: string | null; section: string; file_url: string | null; external_url: string | null }>;
  sectionPath?: string;
}) {
  return (
    <section className="container section">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
      <div className="grid grid-3">
        {items.map((item) => (
          <SectionCard
            key={item.id}
            title={item.title}
            summary={item.summary}
            href={item.external_url || item.file_url || sectionPath}
            meta={sectionLabel(item.section)}
          />
        ))}
      </div>
      {!items.length ? <p className="empty-state">No entries yet.</p> : null}
    </section>
  );
}
