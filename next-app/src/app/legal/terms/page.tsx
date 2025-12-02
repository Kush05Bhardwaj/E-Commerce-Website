'use client';

import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function TermsOfServicePage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using this e-commerce platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.`,
    },
    {
      title: '2. Use License',
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose; attempt to decompile or reverse engineer any software contained on our website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server.`,
    },
    {
      title: '3. User Account',
      content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.`,
    },
    {
      title: '4. Product Information',
      content: `We attempt to be as accurate as possible in the description of our products. However, we do not warrant that product descriptions or other content on our site is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition within our return policy guidelines.`,
    },
    {
      title: '5. Pricing and Payment',
      content: `All prices are subject to change without notice. We reserve the right to modify or discontinue any product without notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of any product. Payment must be received by us before shipment of your order. We accept major credit cards, debit cards, and other payment methods as indicated on our checkout page.`,
    },
    {
      title: '6. Shipping and Delivery',
      content: `We will arrange for shipment of the products to you. Please check the individual product pages for specific delivery options. Title and risk of loss pass to you upon our transfer of the products to the carrier. Shipping and delivery dates are estimates only and cannot be guaranteed. We are not liable for any delays in shipments.`,
    },
    {
      title: '7. Returns and Refunds',
      content: `Our return policy allows you to return most items within 30 days of delivery for a full refund. Items must be in their original condition with all tags attached. Some items are not eligible for return. Please see our Returns Policy page for complete details. Refunds will be processed within 5-10 business days after we receive your return.`,
    },
    {
      title: '8. Prohibited Uses',
      content: `You may not use our site: for any unlawful purpose; to solicit others to perform or participate in any unlawful acts; to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; to infringe upon or violate our intellectual property rights or the intellectual property rights of others; to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate; to submit false or misleading information; to upload or transmit viruses or any other type of malicious code.`,
    },
    {
      title: '9. Intellectual Property',
      content: `The service and its original content, features, and functionality are and will remain the exclusive property of our company and its licensors. The service is protected by copyright, trademark, and other laws of both the country and foreign countries. Our trademarks may not be used in connection with any product or service without our prior written consent.`,
    },
    {
      title: '10. Limitation of Liability',
      content: `In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.`,
    },
    {
      title: '11. Indemnification',
      content: `You agree to defend, indemnify and hold harmless our company and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses arising from your use of and access to the service, or your violation of these Terms.`,
    },
    {
      title: '12. Changes to Terms',
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.`,
    },
    {
      title: '13. Governing Law',
      content: `These Terms shall be governed and construed in accordance with the laws of our jurisdiction, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`,
    },
    {
      title: '14. Contact Us',
      content: `If you have any questions about these Terms, please contact us at legal@ecommerce.com or by mail at: Legal Department, 123 Business Ave, Suite 100, City, State 12345, United States.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Scale className="w-16 h-16" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Please read these terms and conditions carefully before using our service
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Last updated: December 2, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 md:p-12"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                These Terms of Service ("Terms", "Terms of Service") govern your use of our
                website and services. By accessing or using our service, you agree to be bound
                by these Terms. If you disagree with any part of the terms, then you may not
                access the service.
              </p>

              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  By using our service, you acknowledge that you have read and understood these
                  Terms of Service and agree to be bound by them.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
