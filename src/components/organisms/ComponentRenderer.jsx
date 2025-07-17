import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ComponentRenderer = ({ component = {} }) => {
  const { type = 'text', content = {} } = component;
const renderComponent = () => {
    switch (type) {
      case "hero":
        return (
          <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-8 md:p-12 text-center">
            {content?.backgroundImage && (
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <img 
                  src={content.backgroundImage} 
                  alt="Hero background"
                  className="w-full h-full object-cover opacity-30"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/1200x600/1e293b/64748b?text=Hero+Background";
                  }}
                />
              </div>
            )}
            <div className="relative z-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
                {content?.title || 'Default Title'}
              </h1>
              {content?.subtitle && (
                <h2 className="text-xl md:text-2xl text-slate-300 mb-6">
                  {content.subtitle}
                </h2>
              )}
              {content?.description && (
                <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                  {content.description}
                </p>
              )}
              {content?.buttonText && (
                <Button size="lg" className="gradient-bg">
                  {content.buttonText}
                </Button>
              )}
            </div>
          </div>
        );

case "text":
        return (
          <div className="bg-surface/50 rounded-lg p-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed">
                {content?.content || 'Default content'}
              </p>
            </div>
          </div>
        );

case "image":
        return (
          <div className="bg-surface/50 rounded-lg p-6">
            <img 
              src={content?.src || "https://via.placeholder.com/800x400/1e293b/64748b?text=Image+Not+Found"} 
              alt={content?.alt || "Image"}
              className="w-full rounded-lg"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x400/1e293b/64748b?text=Image+Not+Found";
              }}
            />
            {content?.caption && (
              <p className="text-sm text-slate-400 mt-3 text-center">
                {content.caption}
              </p>
            )}
          </div>
        );

case "features":
        return (
          <div className="bg-surface/50 rounded-lg p-6">
            {content?.title && (
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {content.title}
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content?.features?.map((feature, index) => (
                <div
                  key={`feature-${feature.title}-${index}`}
                  className="text-center p-6 rounded-lg bg-surface/50 border border-white/10"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                    <ApperIcon name={feature.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              )) || (
                <div className="col-span-full text-center text-slate-400">
                  No features available
                </div>
              )}
            </div>
          </div>
        );

      case "cta":
        return (
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              {content?.title || 'Call to Action'}
            </h3>
            {content?.description && (
              <p className="text-slate-300 mb-6">
                {content.description}
              </p>
            )}
            <Button size="lg" variant={content?.variant || "primary"}>
              {content?.buttonText || 'Get Started'}
            </Button>
          </div>
        );

      case "contact":
        return (
          <div className="bg-surface/50 rounded-lg p-6">
            {content?.title && (
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {content.title}
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
                <div className="space-y-4">
                  {content?.email && (
                    <div className="flex items-center gap-3">
                      <ApperIcon name="mail" className="w-5 h-5 text-primary" />
                      <span className="text-slate-300">{content.email}</span>
                    </div>
                  )}
                  {content?.phone && (
                    <div className="flex items-center gap-3">
                      <ApperIcon name="phone" className="w-5 h-5 text-primary" />
                      <span className="text-slate-300">{content.phone}</span>
                    </div>
                  )}
                  {content?.address && (
                    <div className="flex items-center gap-3">
                      <ApperIcon name="map-pin" className="w-5 h-5 text-primary" />
                      <span className="text-slate-300">{content.address}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Send Message</h4>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 bg-background border border-slate-600 rounded-lg text-white"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 bg-background border border-slate-600 rounded-lg text-white"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-3 bg-background border border-slate-600 rounded-lg text-white resize-none"
                  />
                  <Button className="gradient-bg w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        );

case "testimonial":
        return (
          <div className="bg-surface/50 rounded-lg p-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src={content?.avatar || "https://via.placeholder.com/64x64/1e293b/64748b?text=Avatar"} 
                  alt={content?.author || "Avatar"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/64x64/1e293b/64748b?text=Avatar";
                  }}
                />
              </div>
              <blockquote className="text-lg text-slate-300 italic mb-4">
                "{content?.quote || 'Customer testimonial'}"
              </blockquote>
              <div>
                <p className="font-semibold text-white">{content?.author || 'Anonymous'}</p>
                <p className="text-sm text-slate-400">{content?.position || 'Customer'}</p>
              </div>
            </div>
          </div>
        );

case "gallery":
        return (
          <div className="bg-surface/50 rounded-lg p-6">
            {content?.title && (
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {content.title}
              </h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content?.images?.map((image, index) => (
                <img 
                  key={index}
                  src={image?.src || "https://via.placeholder.com/400x300/1e293b/64748b?text=Gallery+Image"} 
                  alt={image?.alt || `Gallery image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300/1e293b/64748b?text=Gallery+Image";
                  }}
                />
              )) || (
                <div className="col-span-full text-center text-slate-400">
                  No images available
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-surface/50 rounded-lg p-6 text-center">
            <p className="text-slate-400">Unknown component type: {type}</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {renderComponent()}
    </motion.div>
  );
};

export default ComponentRenderer;