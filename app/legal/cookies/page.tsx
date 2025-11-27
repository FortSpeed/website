export const metadata = {
  title: "Cookie Policy | FortSpeed",
  description: "Read FortSpeed's Cookie Policy",
};

import Link from "next/link";

export default function CookiesPage() {
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
          <h1 className="text-3xl font-semibold text-white md:text-5xl">Cookie Policy</h1>
          <p className="text-sm text-neutral-400">Last Updated: 2025-11-26</p>
          <p className="max-w-3xl text-base leading-relaxed text-neutral-300">
            This Cookie Policy explains how FortSpeed uses cookies and similar tracking technologies on our website.
          </p>
        </header>

        <article className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-10 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.9)] backdrop-blur">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">1. What Are Cookies?</h2>
            <p>
              Cookies are small files stored on your device that help improve website functionality, remember your preferences,
              and analyze how visitors use the site.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">2. Types of Cookies We Use</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-200/80">Essential Cookies</h3>
                <p>Necessary for core website functions such as navigation, security, and access to certain features.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-200/80">Analytics Cookies</h3>
                <p>Used to measure performance and understand how visitors interact with the Site (e.g., Google Analytics).</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-200/80">Functional Cookies</h3>
                <p>Remember your settings and preferences to enhance your browsing experience.</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-200/80">Marketing Cookies</h3>
                <p>Used only with your consent. These help deliver relevant ads or track engagement across platforms.</p>
              </div>
            </div>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">3. How You Can Control Cookies</h2>
            <p>You can manage or disable cookies through your browser settings. You may also:</p>
            <ul className="mt-3 space-y-2 pl-5 text-neutral-200">
              <li className="list-disc">Delete existing cookies</li>
              <li className="list-disc">Block cookies entirely</li>
              <li className="list-disc">Opt out of analytics tracking where applicable</li>
            </ul>
            <p className="text-neutral-300">
              Note: Disabling certain cookies may impact website performance or limit functionality.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">4. Third-Party Cookies</h2>
            <p>
              Some third-party services (such as embedded videos, analytics tools, or external integrations) may set their own
              cookies. FortSpeed does not control these cookies or their usage.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold text-white">5. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy periodically. Continued use of the Site means you accept the updated version.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
