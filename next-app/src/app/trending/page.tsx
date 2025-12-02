'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/cards/ProductCard';
import { TrendingUp, Flame, Zap, Star } from 'lucide-react';

export default function TrendingPage() {
  // Mock trending products
  const trendingProducts = Array.from({ length: 12 }, (_, i) => ({
    id: String(i + 1),
    title: `Trending Product ${i + 1}`,
    price: Math.floor(Math.random() * 500) + 50,
    originalPrice: Math.floor(Math.random() * 600) + 100,
    discount: Math.floor(Math.random() * 30) + 10,
    image: `https://images.unsplash.com/photo-${1505740420928 + i}?w=500`,
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 500) + 100,
    badge: 'Trending',
    inStock: true,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mb-6 flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full bg-gradient-to-r from-accent-500 to-accent-600 p-4"
            >
              <Flame className="text-white" size={48} />
            </motion.div>
          </div>

          <h1 className="mb-4 text-5xl font-extrabold text-slate-900 lg:text-6xl">
            Trending{' '}
            <span className="bg-gradient-to-r from-accent-600 to-brand-600 bg-clip-text text-transparent">
              Right Now
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            Discover what's hot! Shop the most popular products loved by thousands of
            customers
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 grid gap-6 sm:grid-cols-3"
        >
          <div className="rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 p-6 text-white shadow-soft">
            <TrendingUp className="mb-3" size={32} />
            <div className="text-3xl font-bold">240K+</div>
            <div className="text-accent-100">Views This Week</div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-6 text-white shadow-soft">
            <Zap className="mb-3" size={32} />
            <div className="text-3xl font-bold">50K+</div>
            <div className="text-brand-100">Sold This Month</div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-success-500 to-success-600 p-6 text-white shadow-soft">
            <Star className="mb-3" size={32} />
            <div className="text-3xl font-bold">4.8/5</div>
            <div className="text-success-100">Average Rating</div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
