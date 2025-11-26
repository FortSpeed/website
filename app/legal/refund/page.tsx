export const metadata = {
  title: "Refund & Cancellation Policy | FortSpeed",
  description: "Read FortSpeed's Refund & Cancellation Policy",
};

import Link from "next/link";

export default function RefundPage() {
  return (
    <div className="px-6 py-16 text-gray-300 max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-neutral-300 hover:text-white underline underline-offset-4">
          ← Back to Home
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Refund & Cancellation Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last Updated: 2025-11-26</p>

      <div className="prose prose-invert prose-p:leading-relaxed prose-headings:text-white max-w-none">
        <p>
          FortSpeed provides professional digital services. This policy explains our payment, refund, and cancellation terms.
        </p>

        <h3>1. Deposits</h3>
        <p>Most projects require a non-refundable deposit to secure scheduling and begin work.</p>

        <h3>2. Cancellations</h3>
        <ul>
          <li>All completed work up to the cancellation date must be paid for.</li>
          <li>Deposits are non-refundable.</li>
          <li>
            If advanced payments exceed the value of completed work, the remaining balance may be refunded.
          </li>
          <li>
            If FortSpeed cancels a project for reasons other than client misconduct, unused funds will be refunded.
          </li>
        </ul>

        <h3>3. Refunds</h3>
        <p>We generally do not offer refunds for:</p>
        <ul>
          <li>Completed work</li>
          <li>Time invested in research, design, development, or consulting</li>
          <li>Missed deadlines caused by client delays</li>
        </ul>
        <p>Refunds are only considered if:</p>
        <ul>
          <li>No significant work has started</li>
          <li>There is a billing error</li>
          <li>There is a mutual agreement in writing</li>
        </ul>

        <h3>4. Scope Changes</h3>
        <p>
          Any new features or changes after approval are billed separately. If scope changes cause a project to be paused or abandoned, no refunds will apply.
        </p>

        <h3>5. Digital Products</h3>
        <p>
          If we provide digital assets (code, designs, systems, templates), these are non-refundable once delivered due to the nature of digital goods.
        </p>

        <h3>6. Final Deliverables</h3>
        <ul>
          <li>Once deliverables are sent and approved: the project is considered complete</li>
          <li>Revisions outside the agreed scope will be billed separately</li>
          <li>No refunds apply</li>
        </ul>

        <h3>7. Contact</h3>
        <p>
          For refund or billing questions: <a href="mailto:hello@fortspeed.com">hello@fortspeed.com</a>
        </p>
      </div>
      <div className="mt-10">
        <Link href="/" className="inline-flex items-center text-sm text-neutral-300 hover:text-white underline underline-offset-4">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
