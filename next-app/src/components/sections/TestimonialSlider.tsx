'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    content:
      'Absolutely love the quality of products! Fast shipping and excellent customer service. Will definitely shop here again.',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Premium Member',
    content:
      'Best online shopping experience ever! The products exceeded my expectations and the prices are unbeatable.',
    rating: 5,
    avatar: '👨‍💻',
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Regular Customer',
    content:
      'Great variety of products and super easy checkout process. The delivery was faster than expected!',
    rating: 5,
    avatar: '👩‍🎨',
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Verified Buyer',
    content:
      'Outstanding quality and amazing deals! Customer support is top-notch. Highly recommended!',
    rating: 5,
    avatar: '👨‍🔬',
  },
];

export const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return testimonials.length - 1;
      if (nextIndex >= testimonials.length) return 0;
      return nextIndex;
    });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-accent-50 px-8 py-16">
      {/* Background Decoration */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-accent-200/20 blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="mb-4 flex justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Quote size={48} className="text-brand-400" />
          </motion.div>
          <h2 className="text-4xl font-extrabold text-slate-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Join thousands of happy customers worldwide
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative flex items-center justify-center">
          {/* Previous Button */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-0 z-20 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-slate-50 hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} className="text-brand-600" />
          </motion.button>

          {/* Testimonial Card */}
          <div className="relative h-80 w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex items-center justify-center px-16"
              >
                <div className="w-full rounded-2xl bg-white p-10 shadow-soft-xl">
                  {/* Avatar & Info */}
                  <div className="mb-6 flex items-center gap-4">
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-3xl shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      {testimonials[currentIndex].avatar}
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-4 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: star * 0.1 }}
                      >
                        <Star
                          size={20}
                          fill="#fbbf24"
                          className="text-warning-400"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-lg leading-relaxed text-slate-700">
                    "{testimonials[currentIndex].content}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-0 z-20 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-slate-50 hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} className="text-brand-600" />
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-brand-600'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
