export const metadata = {
  title: "Terms & Conditions | FortSpeed",
  description: "Read FortSpeed's Terms & Conditions",
};

import Link from "next/link";

export default function TermsPage() {
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
          <h1 className="text-3xl font-semibold text-white md:text-5xl">Terms & Conditions</h1>
          <p className="text-sm text-neutral-400">Last Updated: 2025-11-26</p>
          <p className="max-w-3xl text-base leading-relaxed text-neutral-300">
            Welcome to FortSpeed. By using our website (the “Site”) or engaging our services (the “Services”), you agree to the
            following Terms & Conditions. If you do not agree, please discontinue use of the Site and our Services.
          </p>
        </header>

        <article className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-10 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.9)] backdrop-blur">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              By visiting the Site, submitting an inquiry, or entering into a service agreement with FortSpeed, you confirm that
              you have read, understood, and accepted these Terms & Conditions.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">2. Company Information</h2>
            <p>
              FortSpeed (“we”, “us”, “our”) is a digital agency specializing in software development, design, and performance
              engineering.
            </p>
            <p>
              Contact:
              <br />
              Email: <a href="mailto:hello@fortspeed.com" className="underline decoration-violet-200/40 underline-offset-4 text-violet-200">hello@fortspeed.com</a>
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">3. Use of the Website</h2>
            <p>You agree not to:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">Interfere with the Site’s functionality</li>
              <li className="list-disc">Attempt unauthorized access to servers or restricted areas</li>
              <li className="list-disc">Use the Site for illegal, harmful, or fraudulent activities</li>
              <li className="list-disc">Copy, redistribute, or misuse our content without permission</li>
            </ul>
            <p>We reserve the right to restrict or block access for violations.</p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">4. Project Engagement</h2>
            <p>A project officially begins when:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">A written proposal is approved</li>
              <li className="list-disc">A contract or email confirmation is received</li>
              <li className="list-disc">A deposit or initial payment is made (if required)</li>
            </ul>
            <p>Deliverables, timelines, and scope will be clearly outlined in your proposal.</p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">5. Payments & Billing</h2>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">Payments must follow the agreed schedule.</li>
              <li className="list-disc">Late payments may pause or delay work.</li>
              <li className="list-disc">Deposits are typically non-refundable unless stated otherwise.</li>
              <li className="list-disc">Scope changes or additional requests may incur extra fees.</li>
              <li className="list-disc">Pricing may change for future projects.</li>
            </ul>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">6. Revisions & Modifications</h2>
            <p>
              Projects include a fixed number of revisions as stated in your agreement. Additional revisions or features outside
              the approved scope may be billed at our hourly rate.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">7. Client Responsibilities</h2>
            <p>Clients must:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">Provide accurate and complete information</li>
              <li className="list-disc">Supply necessary materials (content, assets, credentials, etc.) on time</li>
              <li className="list-disc">Review deliverables promptly</li>
            </ul>
            <p>Delays in providing materials may extend timelines.</p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">8. Intellectual Property</h2>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-200/80">Our Rights</h3>
            <p>Until full payment is received, all designs, code, and deliverables remain the property of FortSpeed.</p>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-200/80">Your Rights</h3>
            <p>
              After full payment, you receive usage rights to the final deliverables for your business. FortSpeed may showcase
              completed work in our portfolio unless an NDA prohibits it.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">9. Third-Party Services</h2>
            <p>Some Services rely on third-party platforms (hosting, APIs, tools, etc.). We are not responsible for:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">Downtime</li>
              <li className="list-disc">Errors or failures</li>
              <li className="list-disc">Pricing changes</li>
              <li className="list-disc">Security issues caused by external platforms</li>
            </ul>
            <p>We will notify you if your project depends on such services.</p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">10. Confidentiality</h2>
            <p>Both parties agree to keep all non-public business, technical, or personal information confidential.</p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">11. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, FortSpeed is not liable for lost revenue, data loss, business
              interruptions, third-party failures, or security breaches outside our control. Our total liability will
              never exceed the amount paid for the specific project.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">12. No Guarantees</h2>
            <p>
              We do not guarantee specific financial results, search rankings, or the performance of third-party platforms. We do
              guarantee professional, high-quality work aligned with industry best practices.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">13. Termination</h2>
            <p>Either party may terminate a project with written notice.</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">Work completed up to that point must be paid for</li>
              <li className="list-disc">Deposits remain non-refundable</li>
              <li className="list-disc">Deliverables may be withheld until all outstanding payments are resolved</li>
            </ul>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">14. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Continued use of the Site or Services indicates acceptance of the updated
              Terms.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">15. Governing Law</h2>
            <p>These Terms are governed by the laws of your local jurisdiction.</p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">16. Contact Us</h2>
            <p>
              For questions about these Terms & Conditions, reach us at:
              <br />
              <a href="mailto:hello@fortspeed.com" className="text-violet-200 underline decoration-violet-200/40 underline-offset-4">
                hello@fortspeed.com
              </a>
              {" "}| +1 (555) 123-4567
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
