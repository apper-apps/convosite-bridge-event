import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ComponentRenderer = ({ component = {} }) => {
  const { type = 'text', content = {}, ...rest } = component;
  
  // Ensure content is always an object with safe defaults
  const safeContent = content || {};
  
  const renderComponent = () => {
    switch (type) {
case 'hero':
        return (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative min-h-[500px] bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-center text-white"
            style={{
              backgroundImage: safeContent.backgroundImage ? `url(${safeContent.backgroundImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">{safeContent.title || 'Welcome'}</h1>
              <p className="text-xl md:text-2xl mb-4 text-gray-200">{safeContent.subtitle || 'Your subtitle here'}</p>
<p className="text-lg mb-8 max-w-2xl mx-auto">{safeContent.description || 'Your description here'}</p>
              {safeContent.buttonText && (
                <Button size="lg" className="gradient-bg">
                  {safeContent.buttonText}
                </Button>
              )}
            </div>
          </motion.section>
        );
case 'text':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-invert max-w-none"
          >
            <div dangerouslySetInnerHTML={{ __html: safeContent.content || '<p>Your text content here</p>' }} />
          </motion.div>
        );

      case 'image':
        return (
          <motion.figure
            initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <img
              src={safeContent.src || '/api/placeholder/600/400'}
              alt={safeContent.alt || 'Image'}
              className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
            />
            {safeContent.caption && (
              <figcaption className="mt-4 text-sm text-gray-400">
                {safeContent.caption}
              </figcaption>
            )}
          </motion.figure>
        );
case 'features':
        return (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{safeContent.title || 'Features'}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(safeContent.features || []).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-surface/50 rounded-lg border border-slate-700"
                >
<div className="mb-4">
                    <ApperIcon 
                      name={feature?.icon || 'Star'} 
                      size={32} 
                      className="mx-auto text-primary" 
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature?.title || 'Feature'}</h3>
                  <p className="text-gray-400">{feature?.description || 'Feature description'}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        );
case 'gallery':
        return (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{safeContent.title || 'Gallery'}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(safeContent.images || []).map((image, index) => (
                <motion.img
                  key={index}
                  src={image?.src || '/api/placeholder/400/300'}
                  alt={image?.alt || `Gallery image ${index + 1}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              ))}
            </div>
          </motion.section>
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