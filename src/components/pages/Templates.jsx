import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Templates = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const templates = [
    {
      id: 1,
      name: "Business Landing",
      description: "Professional landing page for businesses with AI-powered lead generation",
      category: "Business",
      preview: "/api/placeholder/400/300",
      features: ["Hero Section", "Services Grid", "Contact Form", "Testimonials"],
      aiUseCase: "Qualified leads and customer inquiries"
    },
    {
      id: 2,
      name: "Restaurant Menu",
      description: "Interactive restaurant website with AI menu recommendations",
      category: "Food & Beverage",
      preview: "/api/placeholder/400/300",
      features: ["Menu Display", "Reservation Form", "Gallery", "Location Info"],
      aiUseCase: "Menu recommendations and reservations"
    },
    {
      id: 3,
      name: "Portfolio Showcase",
      description: "Creative portfolio with AI-guided project exploration",
      category: "Creative",
      preview: "/api/placeholder/400/300",
      features: ["Project Gallery", "About Section", "Skills Display", "Contact"],
      aiUseCase: "Project explanations and client inquiries"
    },
    {
      id: 4,
      name: "E-commerce Store",
      description: "Product showcase with AI shopping assistant",
      category: "E-commerce",
      preview: "/api/placeholder/400/300",
      features: ["Product Grid", "Featured Items", "Shopping Cart", "Reviews"],
      aiUseCase: "Product recommendations and support"
    },
    {
      id: 5,
      name: "SaaS Landing",
      description: "Software product page with AI-powered feature explanations",
      category: "Technology",
      preview: "/api/placeholder/400/300",
      features: ["Feature Highlights", "Pricing", "Demo Request", "FAQ"],
      aiUseCase: "Feature demos and pricing guidance"
    },
    {
      id: 6,
      name: "Healthcare Clinic",
      description: "Medical practice website with AI appointment scheduling",
      category: "Healthcare",
      preview: "/api/placeholder/400/300",
      features: ["Services List", "Doctor Profiles", "Appointment Form", "Insurance"],
      aiUseCase: "Service information and appointments"
    }
  ];

  const categories = ["All", "Business", "Food & Beverage", "Creative", "E-commerce", "Technology", "Healthcare"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template) => {
    // In a real app, this would create a new site from the template
    navigate("/sites/new", { state: { template } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">
            Conversational Templates
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Choose from our collection of AI-powered website templates designed for different industries and use cases.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar
            placeholder="Search templates..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="max-w-md"
          />
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-surface border border-slate-700 rounded-xl overflow-hidden group"
            >
              <div className="aspect-video bg-slate-800 relative overflow-hidden">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
                    {template.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {template.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {template.description}
                </p>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">
                      Includes:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-1">
                      AI Use Case:
                    </h4>
                    <p className="text-xs text-slate-400">
                      {template.aiUseCase}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <ApperIcon name="Eye" size={16} className="mr-2" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 gradient-bg"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <ApperIcon name="Download" size={16} className="mr-2" />
                    Use Template
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Search" size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-300 mb-2">
              No templates found
            </h3>
            <p className="text-slate-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Templates;