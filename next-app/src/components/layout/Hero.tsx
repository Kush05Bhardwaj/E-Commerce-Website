'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShoppingBag, TrendingUp, Award } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { mockStats } from '@/utils/mockData';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-accent-50 px-6 py-24 lg:py-32">
      {/* Animated Background Elements */}
      <motion.div
        className="pointer-events-none absolute left-10 top-20 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute right-10 bottom-20 h-96 w-96 rounded-full bg-accent-200/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating Icons */}
      <motion.div
        className="pointer-events-none absolute right-[15%] top-[20%] text-brand-300"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ShoppingBag size={48} />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[40%] text-accent-300"
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <TrendingUp size={40} />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute right-[20%] bottom-[25%] text-success-300"
        animate={{ y: [0, -25, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Award size={44} />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="flex flex-col justify-center space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles size={18} />
              </motion.div>
              <span>🎉 New Collection Available</span>
            </motion.div>

            <motion.h1 
              className="text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Discover Your{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                Perfect Style
              </span>
              <br />
              <motion.span
                className="bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Shop Smart
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl text-slate-600 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Explore our curated collection of <span className="font-semibold text-brand-700">premium products</span>. 
              From cutting-edge tech gadgets to elegant home essentials, find everything you need with 
              <span className="font-semibold text-accent-600"> free shipping</span> and 
              <span className="font-semibold text-success-600"> 30-day returns</span>.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatedButton
                asChild
                variant="primary"
                size="lg"
                className="gap-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-lg shadow-brand-300 px-8 py-6 text-lg font-semibold"
              >
                <Link href="/shop">
                  <ShoppingBag size={22} />
                  Shop Now
                  <ArrowRight size={22} />
                </Link>
              </AnimatedButton>

              <AnimatedButton 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-brand-300 hover:border-brand-500 hover:bg-brand-50 px-8 py-6 text-lg font-semibold"
              >
                <Link href="/about">Learn More</Link>
              </AnimatedButton>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap gap-6 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-white" />
                  ))}
                </div>
                <span className="font-medium">10,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-warning-400">★</span>
                  ))}
                </div>
                <span className="font-medium">4.9/5 Rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            {mockStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative rounded-3xl border-2 border-white bg-white/80 backdrop-blur-sm p-8 shadow-soft-lg"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 25px 70px rgba(0, 0, 0, 0.15)',
                }}
              >
                {/* Gradient Overlay on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
                
                <div className="relative">
                  <motion.div 
                    className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-br from-brand-600 to-accent-600 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="mt-3 text-sm font-semibold text-slate-600 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};
