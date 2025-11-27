import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export const Hero = () => (
  <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 text-white overflow-hidden">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 md:flex-row md:items-center md:justify-between">
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.p 
          className="text-sm uppercase tracking-[0.3em] text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          New season
        </motion.p>
        <motion.h1 
          className="text-4xl font-semibold leading-tight md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Discover curated collections loved by millions.
        </motion.h1>
        <motion.p 
          className="text-lg text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Shop trending products, enjoy lightning checkout, and manage orders seamlessly with our all-in-one
          commerce experience.
        </motion.p>
        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/shop">
            <AnimatedButton variant="secondary" size="lg">
              Shop now
            </AnimatedButton>
          </Link>
          <Link to="/dashboard">
            <motion.button
              className="rounded-full border-2 border-white/20 px-6 py-3 font-medium text-white"
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(255, 255, 255, 0.4)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Admin portal
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        className="grid w-full max-w-md grid-cols-2 gap-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        {["New Arrivals", "Top Rated", "Limited Drops", "AI Picks"].map((label, index) => (
          <motion.div 
            key={label} 
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              transition: { duration: 0.2 }
            }}
          >
            <p className="text-sm text-slate-200">{label}</p>
            <p className="mt-3 text-2xl font-bold">+120</p>
            <p className="text-xs text-slate-400">Items</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

