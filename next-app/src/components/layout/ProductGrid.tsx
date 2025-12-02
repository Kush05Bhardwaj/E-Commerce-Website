'use client';

import { motion } from 'framer-motion';
import { mockProducts } from '@/utils/mockData';
import { ProductCard } from '@/components/cards/ProductCard';
import { useAppDispatch } from '@/hooks/redux';
import { addItem } from '@/features/cart/cartSlice';

export const ProductGrid = () => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    dispatch(
      addItem({
        id: product.id,
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
      })
    );
  };

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-slate-900">
            Featured Products
          </h2>
          <p className="mt-4 text-slate-600">
            Discover our hand-picked selection of premium items
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mockProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProductCard
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
