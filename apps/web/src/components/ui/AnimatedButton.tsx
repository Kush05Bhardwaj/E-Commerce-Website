import { motion } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className = "", variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "font-medium rounded-full transition-all duration-300 ease-out relative overflow-hidden";
    
    const variants = {
      primary: "bg-brand text-white hover:shadow-[0_10px_40px_rgba(30,64,175,0.3)]",
      secondary: "bg-accent text-white hover:shadow-[0_10px_40px_rgba(249,115,22,0.3)]",
      outline: "border-2 border-slate-200 bg-transparent hover:border-brand hover:shadow-[0_10px_40px_rgba(30,64,175,0.1)]",
      ghost: "bg-transparent hover:bg-slate-50 text-slate-700",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        <motion.span
          className="relative z-10 flex items-center justify-center gap-2"
        >
          {children}
        </motion.span>
        
        {/* Ripple effect background */}
        <motion.span
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ borderRadius: "inherit" }}
        />
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
