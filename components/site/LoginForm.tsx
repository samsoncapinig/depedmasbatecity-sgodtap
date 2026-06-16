'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback`;

    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });

    if (error) setError(error.message);
    else setMessage('Check your email for the magic link.');

    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="form card form-stack">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      </div>
      <button className="button" type="submit" disabled={loading}>{loading ? 'Sending link…' : 'Send magic link'}</button>
      {message ? <p className="success-text">{message}</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
    </form>
  );
}
