'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import type { CartItem } from '@/features/cart/cartSlice';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    rating: number;
    image: string;
    badge?: string;
  };
  onAddToCart?: (item: CartItem) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => (
  <motion.div
    className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition-all duration-300"
    whileHover={{
      y: -8,
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 },
    }}
  >
    <Link
      href={`/product/${product.id}`}
      className="block overflow-hidden rounded-xl bg-slate-100"
    >
      <motion.div
        className="relative h-48 w-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </motion.div>
    </Link>
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm text-accent">
        <Star size={16} fill="#f97316" className="text-accent" />
        <span>{product.rating.toFixed(1)}</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
      <p className="font-semibold text-brand">${product.price.toFixed(2)}</p>
    </div>
    <AnimatedButton
      type="button"
      onClick={() =>
        onAddToCart?.({
          id: product.id,
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          image: product.image,
        })
      }
      variant="primary"
      size="sm"
      className="w-full"
    >
      Add to cart
    </AnimatedButton>
  </motion.div>
);
