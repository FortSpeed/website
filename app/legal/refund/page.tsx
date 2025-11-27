export const metadata = {
  title: "Refund & Cancellation Policy | FortSpeed",
  description: "Read FortSpeed's Refund & Cancellation Policy",
};

import Link from "next/link";

export default function RefundPage() {
  return (
    <main className="relative overflow-hidden bg-neutral-950">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-gray-300 md:px-10">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-neutral-300 transition hover:text-white"
        >
          ← Back to Home
        </Link>

        <header className="mt-8 space-y-4 text-left">
          <p className="text-sm uppercase tracking-[0.4em] text-violet-300/80">FortSpeed</p>
          <h1 className="text-3xl font-semibold text-white md:text-5xl">Refund & Cancellation Policy</h1>
          <p className="text-sm text-neutral-400">Last Updated: 2025-11-26</p>
          <p className="max-w-3xl text-base leading-relaxed text-neutral-300">
            This Refund & Cancellation Policy outlines how payments, refunds, and cancellations are handled at FortSpeed.
          </p>
        </header>

        <article className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-10 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.9)] backdrop-blur">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">1. Deposits</h2>
            <p>Most projects require a non-refundable deposit to reserve production time and begin work.</p>
            <p>This deposit covers initial planning, research, and preparation.</p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">2. Cancellations</h2>
            <p>If you choose to cancel a project:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">All completed work up to the cancellation date must be paid for</li>
              <li className="list-disc">Deposits remain non-refundable</li>
              <li className="list-disc">If you paid more than the value of completed work, the unused balance may be refunded</li>
              <li className="list-disc">If FortSpeed cancels a project for reasons not related to client misconduct (e.g., internal issues), all unused funds will be refunded</li>
            </ul>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">3. Refunds</h2>
            <p>Refunds are generally not provided for:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">Completed work</li>
              <li className="list-disc">Time spent on research, planning, design, development, or consultation</li>
              <li className="list-disc">Delays caused by the client (e.g., late content or approvals)</li>
            </ul>
            <p>Refunds will only be considered if:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">No meaningful work has started</li>
              <li className="list-disc">A billing or transaction error occurred</li>
              <li className="list-disc">Both parties mutually agree in writing</li>
            </ul>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">4. Scope Changes</h2>
            <p>Any new features, revisions, or changes requested after project approval are considered out of scope and billed separately.</p>
            <p>If scope changes cause the project to be paused or abandoned, no refunds will apply.</p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">5. Digital Products</h2>
            <p>
              Any digital deliverables—such as code, design files, templates, or systems—are non-refundable once delivered due to
              the nature of digital goods.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">6. Final Deliverables</h2>
            <p>Once final deliverables are handed over and approved:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">The project is considered complete</li>
              <li className="list-disc">Additional revisions fall under separate billing</li>
              <li className="list-disc">No refunds apply after approval</li>
            </ul>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">7. Contact</h2>
            <p>
              For any questions regarding refunds or billing, contact us at:
              <br />
              <a href="mailto:hello@fortspeed.com" className="text-violet-200 underline decoration-violet-200/40 underline-offset-4">
                hello@fortspeed.com
              </a>
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
