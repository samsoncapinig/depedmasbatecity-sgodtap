import { createClient } from '@/lib/supabase/server';

type Contact = {
  id: number;
  name: string;
  position: string;
  office: string;
  email: string;
  phone: string;
  sort_order: number;
};

export default async function DirectoryPage() {
  const supabase = await createClient();

  const { data: contacts } = await supabase
    .from('directory_contacts')
    .select('*')
    .order('sort_order')
    .returns<Contact[]>(); // ✅ FIX

  return (
    <section className="container section">
      <div className="section-heading">
        <div>
          <h1>Directory</h1>
          <p>Office and personnel directory listing.</p>
        </div>
      </div>

      <div className="table-wrap card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Office</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {(contacts ?? []).map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.position}</td>
                <td>{contact.office}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!contacts?.length ? (
        <p className="empty-state">No contacts yet.</p>
      ) : null}
    </section>
  );
}
