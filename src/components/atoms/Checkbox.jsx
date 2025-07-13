import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className, 
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange && onChange(!checked)}
      disabled={disabled}
      className={cn(
        "flex h-4 w-4 items-center justify-center rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
        checked
          ? "bg-primary border-primary text-white focus:ring-primary/50"
          : "border-slate-600 hover:border-slate-500 focus:ring-primary/50",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {checked && <ApperIcon name="Check" size={12} />}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;