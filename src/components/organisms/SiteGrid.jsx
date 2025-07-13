import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { formatDistance } from "date-fns";

const SiteGrid = ({ sites, onSiteClick, onCreateSite, onDeleteSite }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Create New Site Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-xl p-6 cursor-pointer"
        onClick={onCreateSite}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Plus" size={32} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Create New Site
          </h3>
          <p className="text-slate-400 text-sm">
            Start building your conversational website
          </p>
        </div>
      </motion.div>

      {/* Existing Sites */}
      {sites.map((site) => (
        <motion.div
          key={site.Id}
          whileHover={{ scale: 1.02, y: -4 }}
          className="bg-surface border border-slate-700 rounded-xl p-6 cursor-pointer group"
          onClick={() => onSiteClick(site)}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:gradient-text transition-all">
                {site.name}
              </h3>
              <p className="text-sm text-slate-400 mb-2">
                {site.domain}
              </p>
              
              <div className="flex items-center space-x-4 text-xs text-slate-500">
                <span className={`px-2 py-1 rounded-full ${
                  site.published 
                    ? "bg-success/20 text-success" 
                    : "bg-warning/20 text-warning"
                }`}>
                  {site.published ? "Published" : "Draft"}
                </span>
                <span>
                  Updated {formatDistance(new Date(site.updatedAt), new Date(), { addSuffix: true })}
                </span>
              </div>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSite(site.Id);
                }}
                className="text-slate-400 hover:text-error"
              >
                <ApperIcon name="Trash2" size={16} />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm text-slate-400">
              <ApperIcon name="Bot" size={16} className="mr-2" />
              AI Assistant Configured
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-slate-400">
                <ApperIcon name="Globe" size={16} className="mr-2" />
                <span>View Site</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSiteClick(site);
                }}
              >
                <ApperIcon name="Edit" size={16} className="mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SiteGrid;