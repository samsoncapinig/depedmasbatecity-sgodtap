import { createFeedback } from '@/app/actions';

export function FeedbackForm() {
  return (
    <form action={createFeedback} className="form card form-stack">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} required placeholder="Type your feedback or inquiry" />
      </div>
      <button className="button" type="submit">Submit feedback</button>
    </form>
  );
}
