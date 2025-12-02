'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-brand-500 to-brand-600 p-4">
              <Shield className="text-white" size={40} />
            </div>
          </div>

          <h1 className="mb-4 text-center text-5xl font-extrabold text-slate-900">
            Privacy{' '}
            <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-center text-lg text-slate-600">
            Last updated: December 2, 2025
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8 rounded-2xl bg-white p-8 shadow-soft"
        >
          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">1. Information We Collect</h2>
            <p className="mb-4 text-slate-600">
              We collect information you provide directly to us, including name, email address,
              shipping address, payment information, and any other information you choose to provide.
            </p>
            <p className="text-slate-600">
              We also automatically collect certain information about your device when you use our
              services, including IP address, browser type, operating system, and usage data.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">2. How We Use Your Information</h2>
            <ul className="list-disc space-y-2 pl-6 text-slate-600">
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and updates</li>
              <li>Respond to your comments and questions</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our services and develop new features</li>
              <li>Detect and prevent fraud or unauthorized activity</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">3. Information Sharing</h2>
            <p className="mb-4 text-slate-600">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-slate-600">
              <li>Service providers who assist in our operations</li>
              <li>Payment processors to complete transactions</li>
              <li>Shipping partners to deliver your orders</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">4. Data Security</h2>
            <p className="text-slate-600">
              We implement appropriate technical and organizational measures to protect your personal
              information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">5. Your Rights</h2>
            <p className="mb-4 text-slate-600">You have the right to:</p>
            <ul className="list-disc space-y-2 pl-6 text-slate-600">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to processing of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">6. Cookies</h2>
            <p className="text-slate-600">
              We use cookies and similar tracking technologies to improve your browsing experience,
              analyze site traffic, and personalize content. You can control cookies through your
              browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">7. Contact Us</h2>
            <p className="text-slate-600">
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@merncommerce.com" className="font-semibold text-brand-600 hover:text-brand-700">
                privacy@merncommerce.com
              </a>
            </p>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
