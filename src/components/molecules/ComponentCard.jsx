import { motion } from "framer-motion";
import { useDrag } from "react-dnd";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ComponentCard = ({ 
  type, 
  title, 
  description, 
  icon, 
  onAdd,
  className = "" 
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: { type, title, description, icon },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      className={`bg-surface border border-slate-600 rounded-lg p-4 cursor-move hover:border-primary/50 transition-all duration-200 ${
        isDragging ? "opacity-50" : ""
      } ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <ApperIcon name={icon} size={20} className="text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-white mb-1">
            {title}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
      
      <Button
        size="sm"
        variant="ghost"
        onClick={onAdd}
        className="w-full mt-3 text-xs"
      >
        <ApperIcon name="Plus" size={14} className="mr-1" />
        Add
      </Button>
    </motion.div>
  );
};

export default ComponentCard;