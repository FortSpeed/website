export const metadata = {
  title: "Privacy Policy | FortSpeed",
  description: "Read FortSpeed's Privacy Policy",
};

import Link from "next/link";

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-semibold text-white md:text-5xl">Privacy Policy</h1>
          <p className="text-sm text-neutral-400">Last Updated: 2025</p>
          <p className="max-w-3xl text-base leading-relaxed text-neutral-300">
            FortSpeed (“we,” “us,” or “our”) is committed to protecting your personal information and maintaining
            transparency about how we handle your data. This Privacy Policy explains what we collect, how we use it,
            and the choices you have.
          </p>
        </header>

        <article className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-10 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.9)] backdrop-blur">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
            <div className="space-y-6 text-base leading-relaxed">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-200/80">Information You Provide to Us</h3>
                <p>We may collect information when you contact us, request a quote, or work with us. This can include:</p>
                <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
                  <li className="list-disc">Name</li>
                  <li className="list-disc">Email address</li>
                  <li className="list-disc">Phone number</li>
                  <li className="list-disc">Company details</li>
                  <li className="list-disc">Project information</li>
                  <li className="list-disc">Files, documents, or assets you choose to share</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-200/80">Information Collected Automatically</h3>
                <p>When you browse our website, we may automatically collect:</p>
                <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
                  <li className="list-disc">IP address</li>
                  <li className="list-disc">Browser and device details</li>
                  <li className="list-disc">Pages viewed and actions taken</li>
                  <li className="list-disc">Cookies and tracking data (see our Cookie Policy)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-200/80">Information from Third Parties</h3>
                <p>
                  If you reach out to us through social platforms or integrated tools, we may receive information from those
                  services.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">Respond to messages and inquiries</li>
              <li className="list-disc">Prepare proposals or project documentation</li>
              <li className="list-disc">Deliver, maintain, and improve our services</li>
              <li className="list-disc">Communicate updates related to your project</li>
              <li className="list-disc">Process payments (if applicable)</li>
              <li className="list-disc">Ensure our website operates securely</li>
              <li className="list-disc">Detect and prevent misuse or fraudulent activity</li>
            </ul>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">3. How We Share Your Information</h2>
            <p>We do not sell or trade your personal data — ever.</p>
            <p>We may share your information with:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">Verified third-party service providers (hosting, analytics, payment processors, etc.)</li>
              <li className="list-disc">Team members directly involved in your project</li>
              <li className="list-disc">Legal authorities, only if required by law</li>
            </ul>
            <p>All third parties we work with are expected to keep your information secure and confidential.</p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">4. Data Retention</h2>
            <p>We keep your information only for as long as necessary to:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">Deliver your project</li>
              <li className="list-disc">Meet legal or regulatory obligations</li>
              <li className="list-disc">Maintain internal records</li>
            </ul>
            <p>After that, your data is securely deleted or anonymized.</p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">5. Security</h2>
            <p>
              We use appropriate technical and organizational measures to safeguard your data. However, no digital system is
              completely risk-free, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">6. Your Rights</h2>
            <p>Depending on your country or region, you may have the right to:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">Access the personal data we hold</li>
              <li className="list-disc">Request corrections or updates</li>
              <li className="list-disc">Ask for deletion of your information</li>
              <li className="list-disc">Restrict or object to certain processing</li>
              <li className="list-disc">Opt out of marketing communications</li>
            </ul>
            <p>
              To make a data request, email us at: <a href="mailto:hello@fortspeed.com" className="text-violet-200 underline decoration-violet-200/40 underline-offset-4">hello@fortspeed.com</a>
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">7. External Links</h2>
            <p>
              Our website may include links to other websites or services. We are not responsible for how those platforms handle
              your data.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">8. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy occasionally. Continued use of our website means you agree to the most recent
              version.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">9. Contact Us</h2>
            <p>
              If you have questions about this policy or how your data is handled, reach out at:
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
