import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ComponentRenderer from "@/components/organisms/ComponentRenderer";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import sitesService from "@/services/api/sitesService";
import pagesService from "@/services/api/pagesService";
import componentsService from "@/services/api/componentsService";

const Preview = () => {
  const { siteId } = useParams();
  
  const [site, setSite] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPreviewData = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Load site data
      const siteData = await sitesService.getById(siteId);
      setSite(siteData);
      
      // Load pages
      const pagesData = await pagesService.getBySiteId(siteId);
      setPages(pagesData);
      
      // Set current page to first page or default
      const defaultPage = pagesData.find(p => p.isDefault) || pagesData[0];
      if (defaultPage) {
        setCurrentPage(defaultPage);
        
// Load components for current page
        const componentsData = await componentsService.getByPageId(defaultPage.Id || defaultPage.id);
        setComponents(componentsData || []);
      }
    } catch (err) {
      setError("Failed to load preview data. Please try again.");
      console.error("Error loading preview data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPreviewData();
  }, [siteId]);

  const handlePageChange = async (page) => {
    try {
setCurrentPage(page);
      const componentsData = await componentsService.getByPageId(page.Id || page.id);
      setComponents(componentsData || []);
    } catch (err) {
      console.error("Error loading page components:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-screen flex items-center justify-center">
          <Loading type="preview" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-screen flex items-center justify-center">
          <Error message={error} onRetry={loadPreviewData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Preview Header */}
      <div className="bg-surface/50 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Eye" size={20} className="text-primary" />
              <span className="text-sm font-medium text-slate-400">PREVIEW</span>
            </div>
            
            <div className="h-6 w-px bg-slate-600"></div>
            
            <div>
              <h1 className="text-lg font-semibold text-white">
                {site?.name}
              </h1>
              <p className="text-sm text-slate-400">
                {currentPage?.title || "No page selected"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {pages.length > 1 && (
              <select
value={currentPage?.Id || currentPage?.id || ""}
                onChange={(e) => {
                  const page = pages.find(p => (p.Id || p.id) === parseInt(e.target.value));
                  if (page) handlePageChange(page);
                }}
                className="bg-surface border border-slate-600 text-white px-3 py-2 rounded-lg text-sm"
              >
                {pages.map(page => (
                  <option key={page.Id || page.id} value={page.Id || page.id}>
                    {page.title || 'Untitled Page'}
                  </option>
                ))}
              </select>
            )}
            
            <button
              onClick={() => window.close()}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="max-w-6xl mx-auto p-6">
        {components.length === 0 ? (
          <div className="text-center py-20">
            <ApperIcon name="FileX" size={48} className="text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">
              No Components Found
            </h3>
            <p className="text-slate-500">
              This page doesn't have any components yet. Go back to the builder to add some content.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
{components.map((component) => (
              <div key={component.Id || component.id} className="w-full">
                <ComponentRenderer component={component} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;