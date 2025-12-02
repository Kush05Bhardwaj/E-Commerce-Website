'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Smartphone, 
  Home, 
  Headphones, 
  Camera, 
  Watch, 
  Shirt,
  Package
} from 'lucide-react';

interface CategoryCardProps {
  title: string;
  iconName: string;
  productCount: number;
  href: string;
  color: string;
  index: number;
}

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Home,
  Headphones,
  Camera,
  Watch,
  Shirt,
  Package,
};

export const CategoryCard = ({
  title,
  iconName,
  productCount,
  href,
  color,
  index,
}: CategoryCardProps) => {
  const Icon = iconMap[iconName] || Package;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={href}>
        <motion.div
          className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-soft-lg transition-all duration-300 hover:shadow-soft-xl"
          whileHover={{
            y: -8,
            transition: { duration: 0.3 },
          }}
        >
          {/* Background Gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
            initial={false}
          />

          {/* Animated Icon Background */}
          <motion.div
            className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${color} opacity-10`}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
            {/* Icon */}
            <motion.div
              className={`rounded-2xl bg-gradient-to-br ${color} p-6 shadow-lg`}
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
              <Icon size={40} className="text-white" />
            </motion.div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-brand-600">
              {title}
            </h3>

            {/* Product Count */}
            <motion.p
              className="text-sm font-semibold text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {productCount}+ Products
            </motion.p>

            {/* Hover Arrow */}
            <motion.div
              className="flex items-center gap-2 text-sm font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              <span>Explore</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          </div>

          {/* Corner Accent */}
          <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-12 translate-y-12 rounded-full bg-gradient-to-tl from-brand-500/20 to-transparent" />
        </motion.div>
      </Link>
    </motion.div>
  );
};
