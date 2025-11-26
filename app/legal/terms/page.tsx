export const metadata = {
  title: "Terms & Conditions | FortSpeed",
  description: "Read FortSpeed's Terms & Conditions",
};

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="px-6 py-16 text-gray-300 max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-neutral-300 hover:text-white underline underline-offset-4">
          ← Back to Home
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Terms & Conditions</h1>
      <p className="text-sm text-gray-400 mb-8">Last Updated: 2025-11-26</p>

      <div className="prose prose-invert prose-p:leading-relaxed prose-headings:text-white max-w-none">
        <p>
          Welcome to FortSpeed. By accessing or using our website (the “Site”), services, or contacting us for any project (the “Services”), you agree to the following Terms & Conditions. If you do not agree, please do not use this Site or engage with our Services.
        </p>

        <h3>1. Acceptance of Terms</h3>
        <p>
          By visiting our Site, submitting an inquiry, or entering into a service agreement with FortSpeed, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
        </p>

        <h3>2. Company Information</h3>
        <p>
          FortSpeed (“we”, “us”, “our”) is a digital agency specializing in software development, design, and performance engineering.
        </p>
        <p>
          For any questions, contact us at:<br />
          Email: <a href="mailto:hello@fortspeed.com">hello@fortspeed.com</a><br />
          Phone: +1 (555) 123-4567
        </p>

        <h3>3. Use of the Website</h3>
        <p>You agree not to:</p>
        <ul>
          <li>Misuse or interfere with the Site’s functionality</li>
          <li>Attempt to access restricted areas or servers</li>
          <li>Use the Site for illegal, fraudulent, or harmful purposes</li>
          <li>Copy or redistribute any content without permission</li>
        </ul>
        <p>We reserve the right to restrict access or block users who violate these rules.</p>

        <h3>4. Project Engagement</h3>
        <ul>
          <li>A written proposal is approved</li>
          <li>A signed contract or email confirmation is received</li>
          <li>A deposit or initial payment is made (if required)</li>
        </ul>
        <p>Deliverables, timelines, and project scope will be clearly outlined in your proposal.</p>

        <h3>5. Payments & Billing</h3>
        <ul>
          <li>Payments must be made according to the agreed schedule.</li>
          <li>Late payments may result in paused work or delayed delivery.</li>
          <li>Deposits are typically non-refundable unless stated otherwise.</li>
          <li>Additional requests or scope changes may incur extra fees.</li>
          <li>We reserve the right to adjust pricing for future projects.</li>
        </ul>

        <h3>6. Revisions & Modifications</h3>
        <p>
          Projects include a set number of revisions listed in your agreement. Any additional revisions or feature changes outside the original scope may be billed at our hourly rate.
        </p>

        <h3>7. Client Responsibilities</h3>
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate, complete information</li>
          <li>Supply necessary materials (content, assets, credentials, etc.) on time</li>
          <li>Review and approve deliverables promptly</li>
        </ul>
        <p>Delays in providing required materials may extend the project timeline.</p>

        <h3>8. Intellectual Property</h3>
        <p><strong>Our Rights</strong></p>
        <p>Until the project is fully paid for, all designs, code, and materials remain the property of FortSpeed.</p>
        <p><strong>Your Rights</strong></p>
        <p>
          After full payment, you receive the rights to use the final deliverables for your business purposes. FortSpeed may showcase completed work in our portfolio unless a non-disclosure agreement (NDA) is signed.
        </p>

        <h3>9. Third-Party Services</h3>
        <p>Some services may rely on third-party providers (hosting, APIs, software tools, etc.). We are not responsible for:</p>
        <ul>
          <li>Downtime</li>
          <li>Errors</li>
          <li>Pricing changes</li>
          <li>Security issues caused by third-party platforms</li>
        </ul>
        <p>We will notify you if a project depends on such services.</p>

        <h3>10. Confidentiality</h3>
        <p>Both parties agree to keep confidential any non-public business, technical, or personal information shared during the engagement.</p>

        <h3>11. Limitation of Liability</h3>
        <p>
          To the maximum extent permitted by law, FortSpeed is not responsible for lost revenue, data loss, business interruptions, security breaches caused by external factors, or improper use of deliverables. Our liability will never exceed the amount paid by the client for the specific project.
        </p>

        <h3>12. No Guarantees</h3>
        <p>
          We do not guarantee specific revenue results, search engine rankings, third-party platform performance, or that software will be 100% error-free. We do guarantee a professional, high-quality service aligned with industry best practices.
        </p>

        <h3>13. Termination</h3>
        <p>
          Either party may terminate an ongoing project with written notice.
        </p>
        <ul>
          <li>Work completed up to that point must be paid for</li>
          <li>Deposits are non-refundable</li>
          <li>Files or deliverables may not be released until outstanding invoices are paid</li>
        </ul>

        <h3>14. Changes to Terms</h3>
        <p>We may update these Terms & Conditions at any time. Continued use of the Site means you accept the updated terms.</p>

        <h3>15. Governing Law</h3>
        <p>These Terms are governed by the laws of your local jurisdiction, without regard to conflict of law principles.</p>

        <h3>16. Contact Us</h3>
        <p>
          For questions about these Terms & Conditions, reach us at: <a href="mailto:hello@fortspeed.com">hello@fortspeed.com</a> or +1 (555) 123-4567.
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
