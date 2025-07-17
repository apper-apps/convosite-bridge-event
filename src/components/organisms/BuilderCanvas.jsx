import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { AnimatePresence, motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import ComponentRenderer from "@/components/organisms/ComponentRenderer";
import ComponentEditor from "@/components/organisms/ComponentEditor";
import Button from "@/components/atoms/Button";

const BuilderCanvas = ({ 
  components = [], 
  onAddComponent, 
  onUpdateComponent, 
  onDeleteComponent,
  onReorderComponents 
}) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);

const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item, monitor) => {
      if (monitor.didDrop()) return;
      
      const newComponent = {
        type: item.type,
        content: getDefaultContent(item.type)
      };
      
      onAddComponent(newComponent);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  }));

  const getDefaultContent = (type) => {
    const defaults = {
      hero: {
        title: "Your Amazing Title",
        subtitle: "Compelling Subtitle",
        description: "Brief description that engages your visitors.",
        buttonText: "Get Started",
        backgroundImage: ""
      },
      text: {
        content: "Your text content goes here. Edit this to add your message."
      },
      image: {
        src: "/api/placeholder/600/400",
        alt: "Placeholder image",
        caption: "Image caption"
      },
features: {
        title: "Key Features",
        features: [
          { icon: "Star", title: "Feature 1", description: "Description of feature 1" },
          { icon: "Zap", title: "Feature 2", description: "Description of feature 2" },
          { icon: "Shield", title: "Feature 3", description: "Description of feature 3" }
        ]
      },
      gallery: {
        title: "Gallery",
        images: [
          { src: "/api/placeholder/300/200", alt: "Gallery image 1" },
          { src: "/api/placeholder/300/200", alt: "Gallery image 2" },
          { src: "/api/placeholder/300/200", alt: "Gallery image 3" }
        ]
      }
    };
    
    return defaults[type] || {};
  };

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  const handleComponentUpdate = (componentId, updates) => {
    onUpdateComponent(componentId, updates);
    setSelectedComponent(prev => prev ? { ...prev, ...updates } : null);
  };

const handleDeleteComponent = (componentId) => {
    onDeleteComponent(componentId);
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null);
    }
  };
  return (
    <div className="flex-1 flex">
      {/* Canvas Area */}
      <div 
        ref={drop} 
        className={`flex-1 bg-slate-900/50 overflow-y-auto transition-colors ${
          isOver ? "bg-primary/10 border-primary/50" : ""
        }`}
      >
        <div className="min-h-full p-6">
          {components.length === 0 ? (
            <Empty
              title="Start Building Your Page"
              description="Drag components from the library to start creating your conversational website"
              icon="MousePointer"
              className="min-h-[60vh]"
            />
          ) : (
<AnimatePresence>
              <div className="space-y-4">
                {components.map((component, index) => (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className={`relative group border-2 border-transparent rounded-lg transition-all duration-200 ${
                      selectedComponent?.id === component.id 
                        ? "border-primary shadow-lg shadow-primary/20" 
                        : "hover:border-slate-600"
                    }`}
                    onClick={() => handleComponentClick(component)}
                  >
                    {/* Component Toolbar */}
                    <div className="absolute -top-3 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1 bg-surface border border-slate-600 rounded-lg p-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedComponent(component);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <ApperIcon name="Settings" size={14} />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteComponent(component.id);
                          }}
                          className="h-8 w-8 p-0 hover:text-error"
                        >
                          <ApperIcon name="Trash2" size={14} />
                        </Button>
                      </div>
                    </div>

                    <ComponentRenderer component={component} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Component Editor Sidebar */}
      {selectedComponent && (
        <ComponentEditor
          component={selectedComponent}
          onUpdate={handleComponentUpdate}
          onClose={() => setSelectedComponent(null)}
        />
      )}
</div>
  );
};

export default BuilderCanvas;