import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/layout/Hero';
import { StatsGrid } from '@/components/layout/StatsGrid';
import { ProductGrid } from '@/components/layout/ProductGrid';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />
      <main>
        <Hero />
        <StatsGrid />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}
