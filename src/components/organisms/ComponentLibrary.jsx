import { useState } from "react";
import SearchBar from "@/components/molecules/SearchBar";
import ComponentCard from "@/components/molecules/ComponentCard";

const ComponentLibrary = ({ onAddComponent }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const componentTypes = [
    {
      type: "hero",
      title: "Hero Section",
      description: "Large banner with title, subtitle, and call-to-action",
      icon: "Monitor"
    },
    {
      type: "text",
      title: "Text Block",
      description: "Rich text content with formatting options",
      icon: "Type"
    },
    {
      type: "image",
      title: "Image",
      description: "Single image with caption and alt text",
      icon: "Image"
    },
    {
      type: "features",
      title: "Features Grid",
      description: "Grid of features with icons and descriptions",
      icon: "Grid3X3"
    },
    {
      type: "cta",
      title: "Call to Action",
      description: "Prominent button or form for user action",
      icon: "MousePointer"
    },
    {
      type: "contact",
      title: "Contact Form",
      description: "Form for collecting user inquiries",
      icon: "Mail"
    },
    {
      type: "testimonial",
      title: "Testimonial",
      description: "Customer reviews and social proof",
      icon: "Quote"
    },
    {
      type: "gallery",
      title: "Image Gallery",
      description: "Collection of images in grid layout",
      icon: "Images"
    }
  ];

  const filteredComponents = componentTypes.filter(component =>
    component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 bg-surface border-r border-slate-700 h-full flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-white mb-4">Components</h2>
        <SearchBar
          placeholder="Search components..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredComponents.map((component) => (
            <ComponentCard
              key={component.type}
              {...component}
              onAdd={() => onAddComponent(component)}
            />
          ))}
        </div>
        
        {filteredComponents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-400">No components found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentLibrary;