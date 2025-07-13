import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "Nothing here yet",
  description = "Get started by creating your first item",
  actionText = "Get Started",
  onAction,
  icon = "Plus",
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={32} className="text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold mb-3 gradient-text">
        {title}
      </h3>
      
      <p className="text-slate-400 mb-8 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          className="gradient-bg hover:scale-105 transition-transform"
        >
          <ApperIcon name={icon} size={16} className="mr-2" />
          {actionText}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;