import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/25 focus:ring-primary/50",
    secondary: "bg-surface text-slate-200 border border-slate-600 hover:bg-slate-700 hover:border-slate-500 focus:ring-primary/50",
    outline: "border border-slate-600 text-slate-200 hover:bg-surface hover:border-slate-500 focus:ring-primary/50",
    ghost: "text-slate-200 hover:bg-surface hover:text-white focus:ring-primary/50",
    danger: "bg-error text-white hover:bg-red-600 hover:shadow-lg hover:shadow-error/25 focus:ring-error/50",
    accent: "bg-gradient-to-r from-accent to-warning text-white hover:shadow-lg hover:shadow-accent/25 focus:ring-accent/50"
  };
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    xl: "h-14 px-8 text-lg"
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;