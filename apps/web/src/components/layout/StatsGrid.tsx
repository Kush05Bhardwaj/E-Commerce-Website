import { mockStats } from "@/utils/mockData";
import { motion } from "framer-motion";

export const StatsGrid = () => (
  <section className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
    {mockStats.map((stat, index) => (
      <motion.div 
        key={stat.label} 
        className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-soft"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          ease: [0.25, 0.4, 0.25, 1]
        }}
        whileHover={{
          y: -8,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.3 }
        }}
      >
        <motion.p 
          className="text-3xl font-bold text-slate-900"
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
        >
          {stat.value}
        </motion.p>
        <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
      </motion.div>
    ))}
  </section>
);

