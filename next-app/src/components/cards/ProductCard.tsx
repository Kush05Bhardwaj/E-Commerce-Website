'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, Eye, ShoppingCart, Zap } from 'lucide-react';
import type { CartItem } from '@/features/cart/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    rating: number;
    image: string;
    badge?: string;
    discount?: number;
    originalPrice?: number;
  };
  onAddToCart?: (item: CartItem) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart?.({
      id: product.id,
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <motion.div
      className="group relative space-y-3 rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-soft transition-all duration-300 hover:border-brand-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -12,
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.12)',
        transition: { duration: 0.3 },
      }}
    >
      {/* Badges */}
      <AnimatePresence mode="wait">
        {product.badge && (
          <motion.div
            key={`badge-${product.id}`}
            className="absolute left-6 top-6 z-10 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            🔥 {product.badge}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {product.discount && (
          <motion.div
            key={`discount-${product.id}`}
            className="absolute right-6 top-6 z-10 rounded-full bg-gradient-to-r from-success-500 to-success-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            -{product.discount}%
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wishlist & Quick View Buttons */}
      <div className="absolute right-4 top-16 z-10 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <motion.button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`rounded-full p-2.5 shadow-lg transition-all ${
            isWishlisted
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Add to wishlist"
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </motion.button>
        <motion.button
          className="rounded-full bg-white p-2.5 text-slate-600 shadow-lg transition-all hover:bg-slate-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Quick view"
        >
          <Eye size={18} />
        </motion.button>
      </div>

      {/* Product Image */}
      <Link
        href={`/product/${product.id}`}
        className="block overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-50"
      >
        <motion.div
          className="relative h-56 w-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Image
            src={product.image}
            alt={`${product.title} - Product Image`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            priority={false}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-slate-200" />
          )}
          
          {/* Overlay on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            initial={false}
          />
        </motion.div>
      </Link>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: star * 0.05 }}
              >
                <Star
                  size={14}
                  fill={star <= Math.floor(product.rating) ? '#fbbf24' : 'none'}
                  className={
                    star <= Math.floor(product.rating)
                      ? 'text-warning-400'
                      : 'text-slate-300'
                  }
                />
              </motion.div>
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-600">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-slate-400">(128 reviews)</span>
        </div>

        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 text-lg font-bold text-slate-900 transition-colors hover:text-brand-600">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <p className="text-2xl font-extrabold text-brand-600">
            ${product.price.toFixed(2)}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-slate-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2 text-xs">
          <div className="h-2 w-2 animate-pulse rounded-full bg-success-500" />
          <span className="font-semibold text-success-600">In Stock</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <AnimatePresence mode="wait">
        {isAddedToCart ? (
          <motion.div
            key="added"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-success-500 to-success-600 py-3 text-sm font-bold text-white"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              ✓
            </motion.div>
            Added to Cart!
          </motion.div>
        ) : (
          <AnimatedButton
            key="add"
            type="button"
            onClick={handleAddToCart}
            variant="primary"
            size="md"
            className="w-full gap-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-lg shadow-brand-200 transition-all"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <ShoppingCart size={18} />
            </motion.div>
            Add to Cart
          </AnimatedButton>
        )}
      </AnimatePresence>

      {/* Quick Add Badge (appears on hover) */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={false}
      >
        <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-premium-500 to-premium-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
          <Zap size={12} />
          Quick Add
        </div>
      </motion.div>

      {/* Shimmer Effect on Hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-shine opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
  );
};
