'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 px-8 py-16">
      {/* Animated Background Elements */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent-400/20 blur-3xl"
        animate={{
          scale: [1.5, 1, 1.5],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Floating Icons */}
      <motion.div
        className="pointer-events-none absolute right-[15%] top-[20%] text-white/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Mail size={64} />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-6 flex justify-center"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <Mail size={48} className="text-white" />
            </div>
          </motion.div>

          <h2 className="text-4xl font-extrabold text-white lg:text-5xl">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-4 text-xl text-brand-100">
            Get exclusive deals, latest products, and special offers delivered
            to your inbox!
          </p>
        </motion.div>

        {/* Subscription Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {!isSubscribed ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <div className="relative flex-1 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full rounded-full border-2 border-white/30 bg-white/10 px-6 py-4 text-white placeholder-white/60 backdrop-blur-sm transition-all focus:border-white focus:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/20"
                />
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Mail className="text-white/60" size={20} />
                </motion.div>
              </div>

              <AnimatedButton
                type="submit"
                size="lg"
                className="gap-2 rounded-full bg-white px-8 py-4 font-bold text-brand-700 shadow-xl transition-all hover:bg-brand-50 hover:shadow-2xl"
              >
                <Send size={20} />
                Subscribe
              </AnimatedButton>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 rounded-full bg-white/20 px-8 py-6 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <CheckCircle size={32} className="text-success-300" />
              </motion.div>
              <span className="text-xl font-bold text-white">
                Successfully Subscribed! 🎉
              </span>
            </motion.div>
          )}
        </motion.form>

        {/* Trust Badges */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-8 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={16} />
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={16} />
            <span>Unsubscribe anytime</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={16} />
            <span>Privacy protected</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white">50K+</div>
            <div className="mt-1 text-sm text-brand-100">Active Subscribers</div>
          </div>
          <div className="h-12 w-px bg-white/30" />
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white">Weekly</div>
            <div className="mt-1 text-sm text-brand-100">Newsletter</div>
          </div>
          <div className="h-12 w-px bg-white/30" />
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white">Exclusive</div>
            <div className="mt-1 text-sm text-brand-100">Deals & Offers</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
