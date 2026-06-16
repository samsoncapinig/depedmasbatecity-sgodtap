import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export async function AuthButton() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return (
      <Link href="/login" className="button button-secondary">
        Log in
      </Link>
    );
  }

  return (
    <div className="auth-links">
      <Link href="/admin" className="button button-secondary">Admin</Link>
      <form action="/auth/signout" method="post">
        <button className="button" type="submit">Sign out</button>
      </form>
    </div>
  );
}
