import React from "react";
import { cn } from "@/utils/cn";

const Label = React.forwardRef(({ 
  className, 
  required = false,
  ...props 
}, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-slate-200 leading-none",
        className
      )}
      {...props}
    >
      {props.children}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  );
});

Label.displayName = "Label";

export default Label;