export function QuickLinks({ items }: { items: Array<{ id: string; title: string; url: string }> }) {
  if (!items.length) return null;

  return (
    <section className="container section">
      <div className="section-heading">
        <h2>Quick Links</h2>
      </div>
      <div className="grid grid-3">
        {items.map((item) => (
          <a key={item.id} href={item.url} className="card card-hover" target="_blank" rel="noreferrer">
            <h3>{item.title}</h3>
            <p>{item.url}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
