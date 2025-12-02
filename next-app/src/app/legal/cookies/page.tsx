'use client';

import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      title: 'Essential Cookies',
      description:
        'These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services.',
      examples: [
        'Session management',
        'Security features',
        'Load balancing',
        'Shopping cart functionality',
      ],
      duration: 'Session or up to 1 year',
    },
    {
      title: 'Performance Cookies',
      description:
        'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.',
      examples: [
        'Google Analytics',
        'Page load time tracking',
        'Error tracking',
        'Traffic source analysis',
      ],
      duration: 'Up to 2 years',
    },
    {
      title: 'Functional Cookies',
      description:
        'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.',
      examples: [
        'Language preferences',
        'Theme selection (dark/light mode)',
        'Region selection',
        'User preferences',
      ],
      duration: 'Up to 1 year',
    },
    {
      title: 'Targeting/Advertising Cookies',
      description:
        'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other sites.',
      examples: [
        'Facebook Pixel',
        'Google Ads',
        'Retargeting campaigns',
        'Interest-based advertising',
      ],
      duration: 'Up to 2 years',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Cookie className="w-16 h-16" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Learn how we use cookies and similar technologies on our website
            </p>
            <p className="text-sm text-orange-200 mt-4">
              Last updated: December 2, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What Are Cookies?
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when
              you visit a website. They are widely used to make websites work more efficiently and
              provide information to the website owners.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website and
              store certain information. This Cookie Policy explains what cookies are, how we use
              them, and your choices regarding their use.
            </p>
          </motion.div>

          {/* Cookie Types */}
          <div className="space-y-8">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {type.description}
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {type.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Duration:</span> {type.duration}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Managing Cookies */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 md:p-12 mt-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Managing Your Cookie Preferences
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Browser Settings
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Most web browsers allow you to control cookies through their settings. You can
                  typically:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>View what cookies you have and delete them on an individual basis</li>
                  <li>Block third-party cookies</li>
                  <li>Block cookies from particular sites</li>
                  <li>Block all cookies from being set</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Third-Party Opt-Out Tools
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  You can also opt out of some third-party cookies through these industry-standard
                  tools:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Network Advertising Initiative (NAI) - networkadvertising.org/choices</li>
                  <li>Digital Advertising Alliance (DAA) - optout.aboutads.info</li>
                  <li>European Interactive Digital Advertising Alliance (EDAA) - youronlinechoices.eu</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">Important:</span> Deleting or blocking cookies may
                  impact your user experience and some features of our website may not function
                  properly.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg shadow-lg p-8 md:p-12 mt-12"
          >
            <h2 className="text-3xl font-bold mb-4">Questions About Cookies?</h2>
            <p className="text-orange-100 mb-6 leading-relaxed">
              If you have any questions about our use of cookies or this Cookie Policy, please
              contact us:
            </p>
            <div className="space-y-2 text-orange-100">
              <p>
                <span className="font-semibold">Email:</span> privacy@ecommerce.com
              </p>
              <p>
                <span className="font-semibold">Address:</span> 123 Business Ave, Suite 100, City,
                State 12345, United States
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
