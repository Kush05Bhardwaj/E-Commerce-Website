'use client';

import { motion } from 'framer-motion';
import { Shield, Truck, CreditCard, Headphones, Award, RefreshCw } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% Protected',
    color: 'from-brand-500 to-brand-600',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50',
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-Day Return Policy',
    color: 'from-success-500 to-success-600',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Multiple Options',
    color: 'from-premium-500 to-premium-600',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated Team',
    color: 'from-warning-500 to-warning-600',
  },
  {
    icon: Award,
    title: 'Best Quality',
    description: 'Guaranteed Products',
    color: 'from-brand-700 to-brand-800',
  },
];

export const TrustBadges = () => {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            ease: 'easeOut',
          }}
          whileHover={{
            y: -8,
            transition: { duration: 0.2 },
          }}
          className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-soft transition-all hover:shadow-soft-lg"
        >
          {/* Background Gradient on Hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
            initial={false}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Animated Icon */}
            <motion.div
              className={`mb-4 rounded-xl bg-gradient-to-br ${badge.color} p-4 shadow-lg`}
              whileHover={{
                scale: 1.1,
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{
                rotate: {
                  duration: 0.5,
                },
              }}
            >
              <badge.icon size={28} className="text-white" />
            </motion.div>

            {/* Title */}
            <h3 className="mb-1 text-base font-bold text-slate-900">
              {badge.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-slate-600">{badge.description}</p>

            {/* Hover Indicator */}
            <motion.div
              className="mt-3 h-1 w-0 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-300 group-hover:w-full"
              initial={false}
            />
          </div>

          {/* Shimmer Effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-shine opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['200% 0', '-200% 0'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
