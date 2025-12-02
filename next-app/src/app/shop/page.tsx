'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/cards/ProductCard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  Search,
  SlidersHorizontal,
  Grid3x3,
  List,
  ChevronDown,
  X,
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

const categories = [
  'All Products',
  'Electronics',
  'Fashion',
  'Home & Living',
  'Audio',
  'Photography',
  'Wearables',
];

const priceRanges = [
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200 - $500', min: 200, max: 500 },
  { label: 'Above $500', min: 500, max: Infinity },
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedPriceRange, setSelectedPriceRange] = useState<any>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Load products (placeholder - replace with API call)
  useEffect(() => {
    const mockProducts: Product[] = Array.from({ length: 24 }, (_, i) => ({
      id: String(i + 1),
      title: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 500) + 50,
      originalPrice: Math.floor(Math.random() * 600) + 100,
      discount: Math.floor(Math.random() * 30) + 10,
      image: `https://images.unsplash.com/photo-${1505740420928 + i}?w=500`,
      rating: 3.5 + Math.random() * 1.5,
      reviews: Math.floor(Math.random() * 500),
      badge: i % 4 === 0 ? 'Best Seller' : i % 4 === 1 ? 'Hot Deal' : undefined,
      inStock: Math.random() > 0.2,
    }));
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All Products') {
      // In real app, filter by category
    }

    // Price range filter
    if (selectedPriceRange) {
      filtered = filtered.filter(
        (p) =>
          p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
      );
    }

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter((p) => p.rating >= selectedRating);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    selectedPriceRange,
    selectedRating,
    sortBy,
    products,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Products');
    setSelectedPriceRange(null);
    setSelectedRating(0);
    setSortBy('featured');
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory !== 'All Products' ? 1 : 0) +
    (selectedPriceRange ? 1 : 0) +
    (selectedRating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-4 text-4xl font-extrabold text-slate-900 lg:text-5xl">
            Shop{' '}
            <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
              All Products
            </span>
          </h1>
          <p className="text-xl text-slate-600">
            Discover our complete collection of premium products
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-soft lg:flex-row lg:items-center"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 py-3 pl-12 pr-4 transition-all focus:border-brand-500 focus:outline-none"
            />
          </div>

          {/* Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-200"
          >
            <SlidersHorizontal size={20} />
            Filters
            {activeFiltersCount > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border-2 border-slate-200 px-6 py-3 font-semibold transition-all focus:border-brand-500 focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Mode */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-xl p-3 transition-all ${
                viewMode === 'grid'
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Grid3x3 size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-xl p-3 transition-all ${
                viewMode === 'list'
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden rounded-2xl bg-white p-6 shadow-soft"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <X size={16} />
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Categories */}
                <div>
                  <h4 className="mb-3 font-semibold text-slate-900">Category</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full rounded-lg px-4 py-2 text-left transition-all ${
                          selectedCategory === cat
                            ? 'bg-brand-500 text-white'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="mb-3 font-semibold text-slate-900">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() =>
                          setSelectedPriceRange(
                            selectedPriceRange?.label === range.label ? null : range
                          )
                        }
                        className={`block w-full rounded-lg px-4 py-2 text-left transition-all ${
                          selectedPriceRange?.label === range.label
                            ? 'bg-brand-500 text-white'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="mb-3 font-semibold text-slate-900">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() =>
                          setSelectedRating(selectedRating === rating ? 0 : rating)
                        }
                        className={`block w-full rounded-lg px-4 py-2 text-left transition-all ${
                          selectedRating === rating
                            ? 'bg-brand-500 text-white'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {rating}+ Stars
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div className="mb-6 text-slate-600">
          Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} of{' '}
          {filteredProducts.length} products
        </div>

        {/* Products Grid */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'space-y-6'
          }
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex justify-center gap-2"
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-xl bg-white px-4 py-2 font-semibold text-slate-700 shadow-soft transition-all hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-xl px-4 py-2 font-semibold transition-all ${
                  currentPage === page
                    ? 'bg-brand-500 text-white shadow-soft'
                    : 'bg-white text-slate-700 shadow-soft hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-xl bg-white px-4 py-2 font-semibold text-slate-700 shadow-soft transition-all hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
