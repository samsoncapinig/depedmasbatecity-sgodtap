import { createContentItem, createDirectoryContact, createQuickLink, updateFeedbackStatus } from '@/app/actions';

export function AdminForms() {
  return (
    <div className="grid grid-2 section">
      <form action={createContentItem} className="form card form-stack">
        <h3>Create content item</h3>
        <input name="section" placeholder="Section (announcements, issuances, articles...)" required />
        <input name="title" placeholder="Title" required />
        <input name="summary" placeholder="Summary" />
        <textarea name="body" placeholder="Body" rows={5} />
        <input name="external_url" placeholder="External URL (optional)" />
        <input name="file_url" placeholder="File URL (optional)" />
        <input name="sort_order" type="number" defaultValue={1} />
        <label><input type="checkbox" name="published" defaultChecked /> Published</label>
        <label><input type="checkbox" name="featured" /> Featured</label>
        <button className="button" type="submit">Save content</button>
      </form>

      <form action={createQuickLink} className="form card form-stack">
        <h3>Create quick link</h3>
        <input name="title" placeholder="Title" required />
        <input name="url" placeholder="https://example.com" required />
        <input name="sort_order" type="number" defaultValue={1} />
        <button className="button" type="submit">Save quick link</button>
      </form>

      <form action={createDirectoryContact} className="form card form-stack">
        <h3>Create directory contact</h3>
        <input name="name" placeholder="Name" required />
        <input name="position" placeholder="Position" />
        <input name="office" placeholder="Office / Unit" />
        <input name="email" placeholder="Email" />
        <input name="phone" placeholder="Phone" />
        <input name="sort_order" type="number" defaultValue={1} />
        <button className="button" type="submit">Save contact</button>
      </form>

      <form action={updateFeedbackStatus} className="form card form-stack">
        <h3>Update feedback status</h3>
        <input name="id" placeholder="Feedback UUID" required />
        <select name="status" defaultValue="reviewed">
          <option value="new">new</option>
          <option value="reviewed">reviewed</option>
          <option value="closed">closed</option>
        </select>
        <button className="button" type="submit">Update status</button>
      </form>
    </div>
  );
}
