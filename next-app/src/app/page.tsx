import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/layout/Hero';
import { StatsGrid } from '@/components/layout/StatsGrid';
import { ProductGrid } from '@/components/layout/ProductGrid';
import { Footer } from '@/components/layout/Footer';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { TestimonialSlider } from '@/components/sections/TestimonialSlider';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { TrustBadges } from '@/components/sections/TrustBadges';

const categories = [
  { 
    title: 'Electronics', 
    iconName: 'Smartphone', 
    productCount: 2500, 
    href: '/category/electronics',
    color: 'from-brand-500 to-brand-600'
  },
  { 
    title: 'Home & Living', 
    iconName: 'Home', 
    productCount: 1800, 
    href: '/category/home',
    color: 'from-accent-500 to-accent-600'
  },
  { 
    title: 'Audio', 
    iconName: 'Headphones', 
    productCount: 890, 
    href: '/category/audio',
    color: 'from-success-500 to-success-600'
  },
  { 
    title: 'Photography', 
    iconName: 'Camera', 
    productCount: 650, 
    href: '/category/photography',
    color: 'from-premium-500 to-premium-600'
  },
  { 
    title: 'Wearables', 
    iconName: 'Watch', 
    productCount: 1200, 
    href: '/category/wearables',
    color: 'from-warning-500 to-warning-600'
  },
  { 
    title: 'Fashion', 
    iconName: 'Shirt', 
    productCount: 3500, 
    href: '/category/fashion',
    color: 'from-brand-700 to-brand-800'
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      <main className="space-y-24 pb-24">
        {/* Hero Section */}
        <Hero />

        {/* Trust Badges */}
        <section className="mx-auto max-w-7xl px-6">
          <TrustBadges />
        </section>

        {/* Categories Section */}
        <section className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-extrabold text-slate-900 lg:text-5xl">
              Shop by{' '}
              <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="mt-4 text-xl text-slate-600">
              Explore our wide range of premium products
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard key={category.title} {...category} index={index} />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-extrabold text-slate-900 lg:text-5xl">
              Featured{' '}
              <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="mt-4 text-xl text-slate-600">
              Handpicked bestsellers and trending items just for you
            </p>
          </div>
          <ProductGrid />
        </section>

        {/* Stats Section */}
        <StatsGrid />

        {/* Testimonials */}
        <section className="mx-auto max-w-7xl px-6">
          <TestimonialSlider />
        </section>

        {/* Newsletter */}
        <section className="mx-auto max-w-7xl px-6">
          <NewsletterSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
