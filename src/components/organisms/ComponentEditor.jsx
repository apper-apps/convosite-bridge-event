import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Checkbox from "@/components/atoms/Checkbox";
import ApperIcon from "@/components/ApperIcon";

const ComponentEditor = ({ component, onUpdate, onClose }) => {
  const [content, setContent] = useState(component.content);
  const [aiEnabled, setAiEnabled] = useState(component.aiEnabled);
  const [aiRules, setAiRules] = useState(component.aiTriggerRules || {
    showWhen: "",
    keywords: [],
    priority: 1
  });

  const handleContentChange = (field, value) => {
    const newContent = { ...content, [field]: value };
    setContent(newContent);
    onUpdate(component.Id, { content: newContent });
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...(content.features || [])];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    handleContentChange("features", newFeatures);
  };

  const handleAiEnabledChange = (enabled) => {
    setAiEnabled(enabled);
    onUpdate(component.Id, { aiEnabled: enabled });
  };

  const handleAiRulesChange = (field, value) => {
    const newRules = { ...aiRules, [field]: value };
    setAiRules(newRules);
    onUpdate(component.Id, { aiTriggerRules: newRules });
  };

  const handleKeywordsChange = (value) => {
    const keywords = value.split(",").map(k => k.trim()).filter(k => k);
    handleAiRulesChange("keywords", keywords);
  };

  const renderContentEditor = () => {
    switch (component.type) {
      case "hero":
        return (
          <div className="space-y-4">
            <FormField
              label="Title"
              value={content.title || ""}
              onChange={(e) => handleContentChange("title", e.target.value)}
            />
            <FormField
              label="Subtitle"
              value={content.subtitle || ""}
              onChange={(e) => handleContentChange("subtitle", e.target.value)}
            />
            <FormField
              label="Description"
              multiline
              value={content.description || ""}
              onChange={(e) => handleContentChange("description", e.target.value)}
            />
            <FormField
              label="Button Text"
              value={content.buttonText || ""}
              onChange={(e) => handleContentChange("buttonText", e.target.value)}
            />
            <FormField
              label="Background Image URL"
              value={content.backgroundImage || ""}
              onChange={(e) => handleContentChange("backgroundImage", e.target.value)}
            />
          </div>
        );

      case "text":
        return (
          <FormField
            label="Content"
            multiline
            value={content.content || ""}
            onChange={(e) => handleContentChange("content", e.target.value)}
          />
        );

      case "image":
        return (
          <div className="space-y-4">
            <FormField
              label="Image URL"
              value={content.src || ""}
              onChange={(e) => handleContentChange("src", e.target.value)}
            />
            <FormField
              label="Alt Text"
              value={content.alt || ""}
              onChange={(e) => handleContentChange("alt", e.target.value)}
            />
            <FormField
              label="Caption"
              value={content.caption || ""}
              onChange={(e) => handleContentChange("caption", e.target.value)}
            />
          </div>
        );

      case "features":
        return (
          <div className="space-y-4">
            <FormField
              label="Title"
              value={content.title || ""}
              onChange={(e) => handleContentChange("title", e.target.value)}
            />
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-200">Features</h4>
              {content.features?.map((feature, index) => (
                <div key={index} className="border border-slate-600 rounded-lg p-3 space-y-3">
                  <FormField
                    label="Icon Name"
                    value={feature.icon || ""}
                    onChange={(e) => handleFeatureChange(index, "icon", e.target.value)}
                  />
                  <FormField
                    label="Title"
                    value={feature.title || ""}
                    onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                  />
                  <FormField
                    label="Description"
                    value={feature.description || ""}
                    onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "cta":
        return (
          <div className="space-y-4">
            <FormField
              label="Title"
              value={content.title || ""}
              onChange={(e) => handleContentChange("title", e.target.value)}
            />
            <FormField
              label="Description"
              multiline
              value={content.description || ""}
              onChange={(e) => handleContentChange("description", e.target.value)}
            />
            <FormField
              label="Button Text"
              value={content.buttonText || ""}
              onChange={(e) => handleContentChange("buttonText", e.target.value)}
            />
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <FormField
              label="Title"
              value={content.title || ""}
              onChange={(e) => handleContentChange("title", e.target.value)}
            />
            <FormField
              label="Description"
              multiline
              value={content.description || ""}
              onChange={(e) => handleContentChange("description", e.target.value)}
            />
          </div>
        );

      case "testimonial":
        return (
          <div className="space-y-4">
            <FormField
              label="Quote"
              multiline
              value={content.quote || ""}
              onChange={(e) => handleContentChange("quote", e.target.value)}
            />
            <FormField
              label="Author"
              value={content.author || ""}
              onChange={(e) => handleContentChange("author", e.target.value)}
            />
            <FormField
              label="Position"
              value={content.position || ""}
              onChange={(e) => handleContentChange("position", e.target.value)}
            />
            <FormField
              label="Avatar URL"
              value={content.avatar || ""}
              onChange={(e) => handleContentChange("avatar", e.target.value)}
            />
          </div>
        );

      default:
        return (
          <p className="text-slate-400">No editor available for this component type.</p>
        );
    }
  };

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      className="w-80 bg-surface border-l border-slate-700 h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Edit Component</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ApperIcon name="X" size={16} />
          </Button>
        </div>
        <p className="text-sm text-slate-400 mt-1 capitalize">
          {component.type} Component
        </p>
      </div>

      {/* Content Editor */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h4 className="text-sm font-medium text-slate-200 mb-4">Content</h4>
          {renderContentEditor()}
        </div>

        {/* AI Configuration */}
        <div className="border-t border-slate-700 pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <Checkbox
              checked={aiEnabled}
              onChange={handleAiEnabledChange}
            />
            <div>
              <h4 className="text-sm font-medium text-slate-200">AI Enabled</h4>
              <p className="text-xs text-slate-400">Allow AI to display this component</p>
            </div>
          </div>

          {aiEnabled && (
            <div className="space-y-4 pl-7">
              <FormField
                label="Show When"
                placeholder="e.g., user asks about services"
                value={aiRules.showWhen || ""}
                onChange={(e) => handleAiRulesChange("showWhen", e.target.value)}
              />
              
              <FormField
                label="Keywords"
                placeholder="e.g., services, pricing, contact"
                value={aiRules.keywords?.join(", ") || ""}
                onChange={(e) => handleKeywordsChange(e.target.value)}
              />
              
              <FormField
                label="Priority"
                type="number"
                min="1"
                max="10"
                value={aiRules.priority || 1}
                onChange={(e) => handleAiRulesChange("priority", parseInt(e.target.value))}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ComponentEditor;