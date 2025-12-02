'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, 
  User, 
  Moon, 
  Sun, 
  Search, 
  Menu, 
  X,
  Package,
  Heart,
  Settings,
  LogOut,
  TrendingUp,
  Sparkles,
  Info,
  HelpCircle,
  ChevronDown,
  Scale,
  Truck,
  RotateCcw,
  MessageSquare
} from 'lucide-react';
import { useAppSelector } from '@/hooks/redux';
import { useTheme } from '@/components/theme/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navLinks = [
  { path: '/shop', label: 'Shop', icon: Package },
  { path: '/trending', label: 'Trending', icon: TrendingUp },
  { path: '/deals', label: 'Deals', icon: Sparkles },
  { path: '/about', label: 'About', icon: Info },
];

const supportLinks = [
  { path: '/support/help', label: 'Help Center', icon: HelpCircle },
  { path: '/support/shipping', label: 'Shipping Info', icon: Truck },
  { path: '/support/returns', label: 'Returns', icon: RotateCcw },
  { path: '/support/contact', label: 'Contact Us', icon: MessageSquare },
];

const legalLinks = [
  { path: '/legal/privacy', label: 'Privacy Policy', icon: Settings },
  { path: '/legal/terms', label: 'Terms of Service', icon: Scale },
  { path: '/legal/cookies', label: 'Cookie Policy', icon: Package },
];

export const Navbar = () => {
  const { items } = useAppSelector((state) => state.cart);
  const { mode, toggle } = useTheme();
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSupportMenu, setShowSupportMenu] = useState(false);
  const [showLegalMenu, setShowLegalMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 shadow-lg">
                  <ShoppingCart size={20} className="text-white" />
                </div>
                <span className="text-xl font-extrabold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                  ShopSmart
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.path;
                return (
                  <Link key={link.path} href={link.path}>
                    <motion.div
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-300'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={16} />
                      {link.label}
                    </motion.div>
                  </Link>
                );
              })}

              {/* Support Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowSupportMenu(true)}
                onMouseLeave={() => setShowSupportMenu(false)}
              >
                <motion.button
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HelpCircle size={16} />
                  Support
                  <ChevronDown size={14} className={`transition-transform ${showSupportMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {showSupportMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 top-full mt-2 w-48 rounded-xl bg-white shadow-xl border border-slate-200 overflow-hidden"
                    >
                      {supportLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link key={link.path} href={link.path}>
                            <div className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                              <Icon size={16} />
                              {link.label}
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Legal Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowLegalMenu(true)}
                onMouseLeave={() => setShowLegalMenu(false)}
              >
                <motion.button
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Scale size={16} />
                  Legal
                  <ChevronDown size={14} className={`transition-transform ${showLegalMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {showLegalMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 top-full mt-2 w-52 rounded-xl bg-white shadow-xl border border-slate-200 overflow-hidden"
                    >
                      {legalLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link key={link.path} href={link.path}>
                            <div className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition-colors">
                              <Icon size={16} />
                              {link.label}
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <motion.button
                onClick={() => setShowSearch(!showSearch)}
                className="hidden rounded-xl border-2 border-slate-200 bg-white p-2.5 transition-all hover:border-brand-300 hover:bg-brand-50 md:block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Search"
              >
                <Search size={20} className="text-slate-700" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                className="rounded-xl border-2 border-slate-200 bg-white p-2.5 transition-all hover:border-brand-300 hover:bg-brand-50"
                type="button"
                onClick={toggle}
                aria-label="Toggle theme"
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                title="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: mode === 'light' ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {mode === 'light' ? <Moon size={20} className="text-slate-700" /> : <Sun size={20} className="text-slate-700" />}
                </motion.div>
              </motion.button>

              {/* Cart with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShowCartPreview(true)}
                onMouseLeave={() => setShowCartPreview(false)}
              >
                <Link href="/cart">
                  <motion.div
                    className="relative rounded-xl border-2 border-slate-200 bg-white p-2.5 transition-all hover:border-brand-300 hover:bg-brand-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart size={20} className="text-slate-700" />
                    {items.length > 0 && (
                      <motion.span
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-accent-500 to-accent-600 text-xs font-bold text-white shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        {items.length}
                      </motion.span>
                    )}
                  </motion.div>
                </Link>

                {/* Cart Preview Dropdown */}
                <AnimatePresence>
                  {showCartPreview && items.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-80 rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-2xl"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900">Shopping Cart</h3>
                        <span className="text-sm text-slate-500">{items.length} items</span>
                      </div>
                      <div className="max-h-64 space-y-3 overflow-y-auto">
                        {items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex gap-3 rounded-lg bg-slate-50 p-2">
                            <div className="h-16 w-16 rounded-lg bg-slate-200" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                              <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                              <p className="text-sm font-bold text-brand-600">${item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 border-t pt-3">
                        <div className="mb-3 flex justify-between">
                          <span className="font-semibold text-slate-700">Total:</span>
                          <span className="text-lg font-extrabold text-brand-600">
                            ${cartTotal.toFixed(2)}
                          </span>
                        </div>
                        <Link href="/cart">
                          <motion.button
                            className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 py-3 font-bold text-white shadow-lg transition-all hover:from-brand-700 hover:to-brand-800"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            View Cart
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu with Dropdown */}
              <div
                className="relative hidden md:block"
                onMouseEnter={() => setShowUserMenu(true)}
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <motion.div
                  className="flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 cursor-pointer transition-all hover:border-brand-300 hover:bg-brand-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User size={18} className="text-slate-700" />
                  <span className="text-sm font-semibold text-slate-700">
                    {user ? user.name.split(' ')[0] : 'Account'}
                  </span>
                </motion.div>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-64 rounded-2xl border-2 border-slate-200 bg-white p-2 shadow-2xl"
                    >
                      {user ? (
                        <>
                          <Link href="/profile">
                            <motion.div
                              className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                              whileHover={{ x: 5 }}
                            >
                              <User size={18} className="text-slate-600" />
                              <span className="text-sm font-semibold text-slate-700">Profile</span>
                            </motion.div>
                          </Link>
                          <Link href="/orders">
                            <motion.div
                              className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                              whileHover={{ x: 5 }}
                            >
                              <Package size={18} className="text-slate-600" />
                              <span className="text-sm font-semibold text-slate-700">Orders</span>
                            </motion.div>
                          </Link>
                          <Link href="/wishlist">
                            <motion.div
                              className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                              whileHover={{ x: 5 }}
                            >
                              <Heart size={18} className="text-slate-600" />
                              <span className="text-sm font-semibold text-slate-700">Wishlist</span>
                            </motion.div>
                          </Link>
                          <Link href="/settings">
                            <motion.div
                              className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                              whileHover={{ x: 5 }}
                            >
                              <Settings size={18} className="text-slate-600" />
                              <span className="text-sm font-semibold text-slate-700">Settings</span>
                            </motion.div>
                          </Link>
                          <hr className="my-2" />
                          <motion.button
                            className="flex w-full items-center gap-3 rounded-xl p-3 transition-colors hover:bg-red-50"
                            whileHover={{ x: 5 }}
                          >
                            <LogOut size={18} className="text-red-600" />
                            <span className="text-sm font-semibold text-red-600">Logout</span>
                          </motion.button>
                        </>
                      ) : (
                        <>
                          <Link href="/auth/login">
                            <motion.button
                              className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 py-3 font-bold text-white shadow-lg transition-all hover:from-brand-700 hover:to-brand-800"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Sign In
                            </motion.button>
                          </Link>
                          <Link href="/auth/register">
                            <motion.button
                              className="mt-2 w-full rounded-xl border-2 border-brand-300 py-3 font-bold text-brand-700 transition-all hover:bg-brand-50"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Sign Up
                            </motion.button>
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="rounded-xl border-2 border-slate-200 bg-white p-2.5 lg:hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-slate-200"
            >
              <div className="mx-auto max-w-7xl px-6 py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 transition-all focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl lg:hidden"
          >
            <div className="flex h-full flex-col p-6">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-slate-900">Menu</h2>
                <motion.button
                  onClick={() => setShowMobileMenu(false)}
                  className="rounded-xl border-2 border-slate-200 p-2"
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <nav className="space-y-2">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={link.path} onClick={() => setShowMobileMenu(false)}>
                        <motion.div
                          className={`flex items-center gap-3 rounded-xl p-4 transition-all ${
                            pathname === link.path
                              ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg'
                              : 'hover:bg-slate-100'
                          }`}
                          whileHover={{ x: 5 }}
                        >
                          <Icon size={20} />
                          <span className="font-semibold">{link.label}</span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileMenu(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};
