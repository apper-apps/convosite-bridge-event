import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const NavItem = ({ to, icon, children, className = "" }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-white border-l-2 border-primary"
            : "text-slate-300 hover:text-white hover:bg-surface"
        } ${className}`
      }
    >
      {({ isActive }) => (
        <motion.div
          className="flex items-center w-full"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          {icon && (
            <ApperIcon 
              name={icon} 
              size={18} 
              className={`mr-3 ${isActive ? "text-primary" : ""}`} 
            />
          )}
          {children}
        </motion.div>
      )}
    </NavLink>
  );
};

export default NavItem;