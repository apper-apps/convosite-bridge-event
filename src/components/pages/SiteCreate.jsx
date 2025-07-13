import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import sitesService from "@/services/api/sitesService";
import pagesService from "@/services/api/pagesService";

const SiteCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    aiPrompt: "",
    aiContext: "",
    theme: {
      primaryColor: "#6366F1",
      secondaryColor: "#8B5CF6",
      fontFamily: "Inter"
    }
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Site name is required";
    }

    if (!formData.domain.trim()) {
      newErrors.domain = "Domain is required";
    } else if (!/^[a-zA-Z0-9-]+$/.test(formData.domain)) {
      newErrors.domain = "Domain can only contain letters, numbers, and hyphens";
    }

    if (!formData.aiPrompt.trim()) {
      newErrors.aiPrompt = "AI prompt is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      // Create site
      const newSite = await sitesService.create({
        ...formData,
        domain: `${formData.domain}.convosite.com`
      });

      // Create default home page
      await pagesService.create({
        siteId: newSite.Id,
        title: "Home",
        slug: "home"
      });

      toast.success("Site created successfully!");
      navigate(`/builder/${newSite.Id}`);
    } catch (err) {
      toast.error("Failed to create site. Please try again.");
      console.error("Error creating site:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-xl p-8 border border-slate-700"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-4">
              Create New Conversational Site
            </h1>
            <p className="text-slate-400">
              Set up your AI-powered website that engages visitors through natural conversation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Site Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Site Details</h3>
              
              <FormField
                label="Site Name"
                required
                placeholder="My Awesome Site"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                error={errors.name}
              />

              <div>
                <FormField
                  label="Domain"
                  required
                  placeholder="my-site"
                  value={formData.domain}
                  onChange={(e) => handleInputChange("domain", e.target.value)}
                  error={errors.domain}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Your site will be available at: {formData.domain}.convosite.com
                </p>
              </div>
            </div>

            {/* AI Configuration */}
            <div className="space-y-4 border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white">AI Assistant Configuration</h3>
              
              <FormField
                label="AI Prompt"
                required
                multiline
                placeholder="You are a helpful assistant representing [Your Business]. Guide visitors through our services and answer questions about our products."
                value={formData.aiPrompt}
                onChange={(e) => handleInputChange("aiPrompt", e.target.value)}
                error={errors.aiPrompt}
              />

              <FormField
                label="Business Context"
                multiline
                placeholder="Provide context about your business, services, target audience, and key information the AI should know."
                value={formData.aiContext}
                onChange={(e) => handleInputChange("aiContext", e.target.value)}
              />
            </div>

            {/* Theme Settings */}
            <div className="space-y-4 border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white">Theme Settings</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Primary Color"
                  type="color"
                  value={formData.theme.primaryColor}
                  onChange={(e) => handleInputChange("theme", {
                    ...formData.theme,
                    primaryColor: e.target.value
                  })}
                />

                <FormField
                  label="Secondary Color"
                  type="color"
                  value={formData.theme.secondaryColor}
                  onChange={(e) => handleInputChange("theme", {
                    ...formData.theme,
                    secondaryColor: e.target.value
                  })}
                />
              </div>

              <FormField
                label="Font Family"
                value={formData.theme.fontFamily}
                onChange={(e) => handleInputChange("theme", {
                  ...formData.theme,
                  fontFamily: e.target.value
                })}
                placeholder="Inter"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                disabled={loading}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                disabled={loading}
                className="gradient-bg"
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Rocket" size={16} className="mr-2" />
                    Create Site
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default SiteCreate;