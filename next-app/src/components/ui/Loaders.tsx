'use client';

import { motion } from 'framer-motion';

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-4 inline-block h-16 w-16 rounded-full border-4 border-brand-200 border-t-brand-600"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-semibold text-slate-600"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export const ComponentLoader = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="h-12 w-12 rounded-full border-4 border-brand-200 border-t-brand-600"
      />
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-6 shadow-soft">
      <div className="mb-4 h-48 rounded-xl bg-slate-200" />
      <div className="mb-2 h-6 w-3/4 rounded bg-slate-200" />
      <div className="mb-4 h-4 w-1/2 rounded bg-slate-200" />
      <div className="flex items-center justify-between">
        <div className="h-8 w-24 rounded bg-slate-200" />
        <div className="h-10 w-32 rounded bg-slate-200" />
      </div>
    </div>
  );
};

export const SkeletonList = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-white p-6 shadow-soft">
          <div className="flex gap-4">
            <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-slate-200" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-5/6 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PageLoader;
