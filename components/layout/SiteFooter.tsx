export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>DepEd Masbate City</h3>
          <p>Varied & accessible source of information and training system.</p>
        </div>
        <div>
          <h4>Portal</h4>
          <p>Built with Next.js, Supabase, and Vercel.</p>
        </div>
        <div>
          <h4>Security</h4>
          <p>RLS enabled. Admin access is role-gated through Supabase Auth.</p>
        </div>
      </div>
    </footer>
  );
}
