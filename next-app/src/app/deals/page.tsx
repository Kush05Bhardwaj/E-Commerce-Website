'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/cards/ProductCard';
import { Tag, Clock, Percent, Gift } from 'lucide-react';

export default function DealsPage() {
  // Mock deal products
  const dealProducts = Array.from({ length: 12 }, (_, i) => ({
    id: String(i + 1),
    title: `Deal Product ${i + 1}`,
    price: Math.floor(Math.random() * 300) + 50,
    originalPrice: Math.floor(Math.random() * 500) + 200,
    discount: Math.floor(Math.random() * 50) + 20,
    image: `https://images.unsplash.com/photo-${1505740420928 + i}?w=500`,
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 300) + 50,
    badge: 'Hot Deal',
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
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full bg-gradient-to-r from-warning-500 to-accent-600 p-4"
            >
              <Tag className="text-white" size={48} />
            </motion.div>
          </div>

          <h1 className="mb-4 text-5xl font-extrabold text-slate-900 lg:text-6xl">
            Amazing{' '}
            <span className="bg-gradient-to-r from-warning-600 to-accent-600 bg-clip-text text-transparent">
              Deals
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">
            Save big on your favorite products with our exclusive deals and limited-time
            offers
          </p>
        </motion.div>

        {/* Deal Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 grid gap-6 sm:grid-cols-3"
        >
          <div className="group cursor-pointer rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 p-8 text-white shadow-soft transition-all hover:scale-105 hover:shadow-glow">
            <Percent className="mb-4" size={40} />
            <h3 className="mb-2 text-2xl font-bold">Up to 70% Off</h3>
            <p className="text-accent-100">Clearance Sale</p>
          </div>

          <div className="group cursor-pointer rounded-2xl bg-gradient-to-br from-warning-500 to-warning-600 p-8 text-white shadow-soft transition-all hover:scale-105 hover:shadow-glow">
            <Clock className="mb-4" size={40} />
            <h3 className="mb-2 text-2xl font-bold">Flash Deals</h3>
            <p className="text-warning-100">Limited Time Only</p>
          </div>

          <div className="group cursor-pointer rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 p-8 text-white shadow-soft transition-all hover:scale-105 hover:shadow-glow">
            <Gift className="mb-4" size={40} />
            <h3 className="mb-2 text-2xl font-bold">Bundle Deals</h3>
            <p className="text-brand-100">Buy More, Save More</p>
          </div>
        </motion.div>

        {/* Deal Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 rounded-2xl bg-gradient-to-r from-accent-600 to-brand-600 p-8 text-center text-white shadow-soft"
        >
          <h2 className="mb-4 text-2xl font-bold">Deal Ends In</h2>
          <div className="flex justify-center gap-4 text-4xl font-extrabold">
            <div>
              <div>23</div>
              <div className="text-sm font-normal text-white/80">Hours</div>
            </div>
            <div>:</div>
            <div>
              <div>45</div>
              <div className="text-sm font-normal text-white/80">Minutes</div>
            </div>
            <div>:</div>
            <div>
              <div>12</div>
              <div className="text-sm font-normal text-white/80">Seconds</div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dealProducts.map((product, index) => (
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
