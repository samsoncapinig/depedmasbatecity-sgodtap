import { FeedbackForm } from '@/components/site/FeedbackForm';

export default async function FeedbackPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const params = await searchParams;

  return (
    <section className="container section">
      <div className="section-heading">
        <div>
          <h1>Feedback</h1>
          <p>Send suggestions, requests, or technical concerns.</p>
          {params.success ? <p className="success-text">Your feedback was submitted successfully.</p> : null}
        </div>
      </div>
      <FeedbackForm />
    </section>
  );
}
