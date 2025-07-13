import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import NavItem from "@/components/molecules/NavItem";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Sites", href: "/sites", icon: "Globe" },
    { name: "Templates", href: "/templates", icon: "Layout" },
    { name: "Settings", href: "/settings", icon: "Settings" }
  ];

  return (
    <header className="bg-surface/80 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="MessageSquare" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">
              ConvoSite
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <NavItem
                key={item.name}
                to={item.href}
                icon={item.icon}
                className="px-4 py-2"
              >
                {item.name}
              </NavItem>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button size="sm" variant="outline">
              <ApperIcon name="HelpCircle" size={16} className="mr-2" />
              Help
            </Button>
            <Button size="sm" className="gradient-bg">
              <ApperIcon name="Plus" size={16} className="mr-2" />
              New Site
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-700/50"
          >
            <div className="py-4 space-y-2">
              {navigation.map((item) => (
                <NavItem
                  key={item.name}
                  to={item.href}
                  icon={item.icon}
                  className="block px-3 py-2"
                >
                  {item.name}
                </NavItem>
              ))}
              
              <div className="pt-4 border-t border-slate-700/50 space-y-2">
                <Button size="sm" variant="outline" className="w-full">
                  <ApperIcon name="HelpCircle" size={16} className="mr-2" />
                  Help
                </Button>
                <Button size="sm" className="w-full gradient-bg">
                  <ApperIcon name="Plus" size={16} className="mr-2" />
                  New Site
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;