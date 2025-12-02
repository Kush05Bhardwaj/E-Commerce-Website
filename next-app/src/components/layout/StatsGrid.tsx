'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { mockStats } from '@/utils/mockData';

// Counter animation hook
const useCountUp = (end: number, duration: number, shouldStart: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
};

export const StatsGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-brand-50 px-6 py-20">
      {/* Background Decoration */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent-200/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl font-extrabold text-slate-900 lg:text-5xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Trusted by{' '}
            <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
              Thousands
            </span>
          </motion.h2>
          <motion.p
            className="mt-4 text-xl text-slate-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Join our growing community of satisfied customers worldwide
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {mockStats.map((stat, index) => {
            // Extract number from value string (e.g., "12k+" -> 12000)
            const numericValue = parseInt(
              stat.value.replace(/[^0-9]/g, '')
            );
            const suffix = stat.value.replace(/[0-9]/g, '');
            const multiplier = stat.value.includes('k')
              ? 1000
              : stat.value.includes('M')
              ? 1000000
              : 1;
            const endValue = numericValue * (multiplier / 1000); // Adjust for display

            return (
              <StatCard
                key={stat.label}
                stat={stat}
                index={index}
                endValue={endValue}
                suffix={suffix.replace('k', 'k+')}
                isInView={isInView}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  stat: { label: string; value: string; icon: string };
  index: number;
  endValue: number;
  suffix: string;
  isInView: boolean;
}

const StatCard = ({ stat, index, endValue, suffix, isInView }: StatCardProps) => {
  const count = useCountUp(endValue, 2000, isInView);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border-2 border-white bg-white/80 backdrop-blur-sm p-8 text-center shadow-soft-lg"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{
        y: -12,
        scale: 1.05,
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.15)',
      }}
    >
      {/* Gradient Background on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-accent-500/10 to-success-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={false}
      />

      {/* Animated Circle */}
      <motion.div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-brand-400/20 to-accent-400/20"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="mb-4 text-6xl"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {stat.icon}
        </motion.div>

        {/* Animated Counter */}
        <motion.div
          className="text-5xl font-extrabold bg-gradient-to-r from-brand-600 via-accent-600 to-brand-700 bg-clip-text text-transparent lg:text-6xl"
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
        >
          {count}
          {suffix}
        </motion.div>

        {/* Label */}
        <motion.div
          className="mt-4 text-base font-bold text-slate-600 uppercase tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.5 }}
        >
          {stat.label}
        </motion.div>

        {/* Progress Bar */}
        <motion.div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-500 to-accent-500"
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.8, duration: 1.5, ease: 'easeOut' }}
          />
        </motion.div>
      </div>

      {/* Corner Accent */}
      <div className="absolute bottom-0 right-0 h-16 w-16 translate-x-8 translate-y-8 rounded-full bg-gradient-to-tl from-accent-500/20 to-transparent" />
      <div className="absolute top-0 left-0 h-16 w-16 -translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-brand-500/20 to-transparent" />
    </motion.div>
  );
};
