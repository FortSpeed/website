export const metadata = {
  title: "Privacy Policy | FortSpeed",
  description: "Read FortSpeed's Privacy Policy",
};

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="px-6 py-16 text-gray-300 max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-neutral-300 hover:text-white underline underline-offset-4">
          ← Back to Home
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last Updated: 2025-11-26</p>

      <div className="prose prose-invert prose-p:leading-relaxed prose-headings:text-white max-w-none">
        <p>
          FortSpeed (“we”, “us”, “our”) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or work with us.
        </p>

        <h3>1. Information We Collect</h3>
        <p>We may collect the following:</p>
        <p><strong>Information you provide</strong></p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company information</li>
          <li>Project details</li>
          <li>Files or assets you upload</li>
        </ul>
        <p><strong>Automatically collected</strong></p>
        <ul>
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device information</li>
          <li>Pages visited</li>
          <li>Cookies (see Cookie Policy)</li>
        </ul>
        <p><strong>Third-party integrations</strong></p>
        <p>If you contact us through social platforms or forms, we may receive information through those services.</p>

        <h3>2. How We Use Your Information</h3>
        <ul>
          <li>Respond to inquiries</li>
          <li>Create and deliver proposals</li>
          <li>Provide and improve our services</li>
          <li>Communicate updates</li>
          <li>Process payments</li>
          <li>Ensure website functionality</li>
          <li>Prevent fraud or misuse</li>
        </ul>

        <h3>3. How We Share Your Information</h3>
        <p>We do not sell your data.</p>
        <p>We may share your information with:</p>
        <ul>
          <li>Trusted third-party service providers (hosting, analytics, payment processors)</li>
          <li>Legal authorities if required</li>
          <li>Team members involved in your project</li>
        </ul>
        <p>All third parties are obligated to keep your data secure.</p>

        <h3>4. Data Retention</h3>
        <p>We retain your data only as long as necessary for legal obligations, completing your project, and internal record-keeping.</p>

        <h3>5. Security</h3>
        <p>We implement appropriate technical and organizational measures to protect your data, but no system is 100% secure.</p>

        <h3>6. Your Rights</h3>
        <p>Depending on your location, you may have the right to access your data, request deletion or corrections, opt out of marketing, or restrict processing.</p>
        <p>
          To make a request: <a href="mailto:hello@fortspeed.com">hello@fortspeed.com</a>
        </p>

        <h3>7. Third-Party Links</h3>
        <p>Our website may contain external links. We are not responsible for the privacy practices of third-party sites.</p>

        <h3>8. Updates</h3>
        <p>We may revise this Privacy Policy at any time. Continued use of our website indicates acceptance of the updated version.</p>

        <h3>9. Contact</h3>
        <p>
          For privacy concerns, contact us at: <a href="mailto:hello@fortspeed.com">hello@fortspeed.com</a>
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
