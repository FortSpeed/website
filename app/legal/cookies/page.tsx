export const metadata = {
  title: "Cookie Policy | FortSpeed",
  description: "Read FortSpeed's Cookie Policy",
};

import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="px-6 py-16 text-gray-300 max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-neutral-300 hover:text-white underline underline-offset-4">
          ← Back to Home
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Cookie Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last Updated: 2025-11-26</p>

      <div className="prose prose-invert prose-p:leading-relaxed prose-headings:text-white max-w-none">
        <p>This Cookie Policy explains how FortSpeed uses cookies and similar tracking technologies.</p>

        <h3>1. What Are Cookies?</h3>
        <p>
          Cookies are small files stored on your device to improve functionality, remember preferences, and analyze usage.
        </p>

        <h3>2. Types of Cookies We Use</h3>
        <p><strong>Essential Cookies</strong></p>
        <p>Required for website functionality.</p>
        <p><strong>Analytics Cookies</strong></p>
        <p>Used to track website performance and behavior (e.g., Google Analytics).</p>
        <p><strong>Functional Cookies</strong></p>
        <p>Remember preferences and improve user experience.</p>
        <p><strong>Marketing Cookies</strong></p>
        <p>Used only if you agree — helps deliver relevant ads.</p>

        <h3>3. How You Can Control Cookies</h3>
        <ul>
          <li>Block cookies in your browser settings</li>
          <li>Delete existing cookies</li>
          <li>Opt out of analytics tracking where available</li>
        </ul>
        <p>Disabling certain cookies may affect site performance.</p>

        <h3>4. Third-Party Cookies</h3>
        <p>
          Some services may set their own cookies (e.g., YouTube embeds, analytics tools). We do not control these cookies.
        </p>

        <h3>5. Changes</h3>
        <p>We may update this Cookie Policy periodically.</p>
      </div>
      <div className="mt-10">
        <Link href="/" className="inline-flex items-center text-sm text-neutral-300 hover:text-white underline underline-offset-4">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
