import { Hero } from "@/components/layout/Hero";
import { StatsGrid } from "@/components/layout/StatsGrid";
import { ProductCard } from "@/components/cards/ProductCard";
import { mockProducts } from "@/utils/mockData";
import { useAppDispatch } from "@/hooks/redux";
import { addItem } from "@/features/cart/cartSlice";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/ScrollAnimations";

const HomePage = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Hero />
      <StatsGrid />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <FadeIn delay={0.1}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">Trending</p>
              <h2 className="text-2xl font-semibold text-slate-900">Trending products</h2>
            </div>
            <button type="button" className="text-sm font-medium text-brand hover:underline transition-all">
              View all
            </button>
          </div>
        </FadeIn>
        
        <StaggerContainer staggerChildren={0.1} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {mockProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={(item) => dispatch(addItem(item))}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </>
  );
};

export default HomePage;

