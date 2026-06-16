import Link from 'next/link';

export function SectionCard({ title, summary, href, meta }: { title: string; summary?: string | null; href?: string; meta?: string }) {
  return (
    <article className="card card-hover">
      {meta ? <p className="meta">{meta}</p> : null}
      <h3>{title}</h3>
      {summary ? <p>{summary}</p> : null}
      {href ? (
        <Link href={href} className="text-link">
          View details →
        </Link>
      ) : null}
    </article>
  );
}
