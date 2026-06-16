import Link from 'next/link';

export function Hero({ title, subtitle }: { title?: string | null; subtitle?: string | null }) {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div>
          <p className="eyebrow">DepEd Masbate City</p>
          <h1>{title || 'School Governance and Operations Division Training & Portal'}</h1>
          <p className="lead">
            {subtitle || 'Manage division information, announcements, downloads, feedback, and directory records with a clean Supabase-backed CMS.'}
          </p>
          <div className="hero-actions">
            <Link href="/downloadables" className="button">Browse Downloadables</Link>
            <Link href="/feedback" className="button button-secondary">Send Feedback</Link>
          </div>
        </div>
        <div className="hero-card card">
          <h3>Included in this rebuild</h3>
          <ul>
            <li>Public content pages</li>
            <li>Supabase Auth-ready admin</li>
            <li>Feedback intake form</li>
            <li>Directory listing</li>
            <li>Quick link management</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
