'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Search,
  ChevronRight,
  Truck,
  RotateCcw,
  CreditCard,
  Shield,
} from 'lucide-react';

export default function HelpCenterPage() {
  const popularTopics = [
    { icon: Truck, title: 'Shipping & Delivery', href: '/support/shipping', color: 'brand' },
    { icon: RotateCcw, title: 'Returns & Refunds', href: '/support/returns', color: 'accent' },
    { icon: CreditCard, title: 'Payment Options', href: '/support/payment', color: 'success' },
    { icon: Shield, title: 'Privacy & Security', href: '/legal/privacy', color: 'premium' },
  ];

  const faqs = [
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 3-5 business days. Express delivery is available for 1-2 days.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer 30-day returns on most items. Products must be unused and in original packaging.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once shipped, you\'ll receive a tracking number via email. You can also track orders in your account.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes! We ship to over 50 countries. Shipping costs and times vary by location.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-brand-500 to-brand-600 p-4">
              <HelpCircle className="text-white" size={48} />
            </div>
          </div>

          <h1 className="mb-4 text-5xl font-extrabold text-slate-900 lg:text-6xl">
            How Can We{' '}
            <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
              Help You?
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            Find answers to your questions or get in touch with our support team
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-12 max-w-2xl"
        >
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full rounded-2xl border-2 border-slate-200 py-4 pl-16 pr-6 text-lg transition-all focus:border-brand-500 focus:outline-none"
            />
          </div>
        </motion.div>

        {/* Popular Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Popular Topics</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularTopics.map((topic, index) => (
              <Link key={index} href={topic.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`group cursor-pointer rounded-2xl bg-gradient-to-br from-${topic.color}-500 to-${topic.color}-600 p-8 text-white shadow-soft transition-all hover:scale-105 hover:shadow-glow`}
                >
                  <topic.icon className="mb-4" size={40} />
                  <h3 className="flex items-center justify-between font-bold">
                    {topic.title}
                    <ChevronRight className="transition-transform group-hover:translate-x-1" size={20} />
                  </h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="rounded-2xl bg-white p-6 shadow-soft"
              >
                <h3 className="mb-3 text-lg font-bold text-slate-900">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl bg-gradient-to-r from-brand-600 to-accent-600 p-12 text-white"
        >
          <h2 className="mb-6 text-center text-3xl font-bold">Still Need Help?</h2>
          <p className="mb-8 text-center text-lg text-white/90">
            Our support team is here to assist you
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
              <MessageCircle className="mb-4" size={32} />
              <h3 className="mb-2 font-bold">Live Chat</h3>
              <p className="mb-4 text-sm text-white/80">Available 24/7</p>
              <button className="font-semibold hover:underline">Start Chat →</button>
            </div>

            <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
              <Mail className="mb-4" size={32} />
              <h3 className="mb-2 font-bold">Email Us</h3>
              <p className="mb-4 text-sm text-white/80">Response within 24h</p>
              <a href="mailto:support@merncommerce.com" className="font-semibold hover:underline">
                Send Email →
              </a>
            </div>

            <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
              <Phone className="mb-4" size={32} />
              <h3 className="mb-2 font-bold">Call Us</h3>
              <p className="mb-4 text-sm text-white/80">Mon-Fri, 9AM-6PM</p>
              <a href="tel:+1234567890" className="font-semibold hover:underline">
                +1 (234) 567-890 →
              </a>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
