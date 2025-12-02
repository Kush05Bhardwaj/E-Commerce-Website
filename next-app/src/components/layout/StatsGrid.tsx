'use client';

import { motion } from 'framer-motion';
import { mockStats } from '@/utils/mockData';

export const StatsGrid = () => {
  return (
    <section className="bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-slate-900">
            Trusted by Thousands
          </h2>
          <p className="mt-4 text-slate-600">
            Join our growing community of satisfied customers
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mockStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="text-4xl font-bold text-brand">{stat.value}</div>
              <div className="mt-2 text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
