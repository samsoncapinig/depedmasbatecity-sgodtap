import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getAdminData } from '@/lib/data';
import { AdminForms } from '@/components/admin/AdminForms';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', auth.user.id).single();
  if (!profile || profile.role !== 'admin') redirect('/');

  const data = await getAdminData();

  return (
    <section className="container section">
      <div className="section-heading">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Signed in as {profile.email || auth.user.email}</p>
        </div>
      </div>

      <AdminForms />

      <div className="section">
        <h2>Recent content</h2>
        <div className="table-wrap card">
          <table>
            <thead><tr><th>Section</th><th>Title</th><th>Published</th><th>Updated</th></tr></thead>
            <tbody>
              {data.contentItems.map((item) => (
                <tr key={item.id}><td>{item.section}</td><td>{item.title}</td><td>{String(item.published)}</td><td>{new Date(item.updated_at).toLocaleString()}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <h2>Feedback submissions</h2>
        <div className="table-wrap card">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Status</th><th>Message</th></tr></thead>
            <tbody>
              {data.feedback.map((item) => (
                <tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td>{item.email}</td><td>{item.status}</td><td>{item.message}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
