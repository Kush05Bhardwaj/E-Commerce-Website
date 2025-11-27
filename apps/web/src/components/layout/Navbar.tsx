import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User, Moon, Sun } from "lucide-react";
import { useAppSelector } from "@/hooks/redux";
import { useTheme } from "@/app/useTheme";
import { motion } from "framer-motion";

const navLinks = [
  { path: "/shop", label: "Shop" },
  { path: "/orders", label: "Orders" },
  { path: "/profile", label: "Profile" },
];

export const Navbar = () => {
  const { items } = useAppSelector((state) => state.cart);
  const { mode, toggle } = useTheme();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <motion.header 
      className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold text-brand hover:scale-105 transition-transform">
          MERN Commerce
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-brand ${isActive ? "text-brand" : "text-slate-600"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <motion.button
            className="rounded-full border border-slate-200 p-2"
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {mode === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>
          <Link to="/cart">
            <motion.div 
              className="relative rounded-full border border-slate-200 p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={18} />
              {items.length > 0 && (
                <motion.span 
                  className="absolute -right-2 -top-1 rounded-full bg-accent px-2 text-xs text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {items.length}
                </motion.span>
              )}
            </motion.div>
          </Link>
          <Link to={user ? "/profile" : "/auth/login"}>
            <motion.div
              className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium"
              whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={18} />
              <span>{user ? user.name : "Login"}</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

