import { LoginForm } from '@/components/site/LoginForm';

export default function LoginPage() {
  return (
    <section className="container section">
      <div className="section-heading">
        <div>
          <h1>Log in</h1>
          <p>Use a Supabase magic link to access your admin dashboard.</p>
        </div>
      </div>
      <LoginForm />
    </section>
  );
}
