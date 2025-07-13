import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import ComponentLibrary from "@/components/organisms/ComponentLibrary";
import BuilderCanvas from "@/components/organisms/BuilderCanvas";
import ChatPreview from "@/components/organisms/ChatPreview";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import sitesService from "@/services/api/sitesService";
import pagesService from "@/services/api/pagesService";
import componentsService from "@/services/api/componentsService";

const Builder = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  
  const [site, setSite] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBuilderData = async () => {
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
        const componentsData = await componentsService.getByPageId(defaultPage.Id);
        setComponents(componentsData);
      }
    } catch (err) {
      setError("Failed to load builder data. Please try again.");
      console.error("Error loading builder data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuilderData();
  }, [siteId]);

  const handlePageChange = async (page) => {
    try {
      setCurrentPage(page);
      const componentsData = await componentsService.getByPageId(page.Id);
      setComponents(componentsData);
    } catch (err) {
      toast.error("Failed to load page components");
      console.error("Error loading page components:", err);
    }
  };

const handleAddComponent = async (componentData) => {
    if (!currentPage) {
      toast.error("No page selected");
      return;
    }
    
    try {
      const newComponent = await componentsService.create({
        pageId: currentPage.Id,
        ...componentData
      });
      setComponents(prev => [...prev, newComponent]);
      toast.success("Component added successfully");
    } catch (err) {
      toast.error(`Failed to add component: ${err.message}`);
      console.error("Error adding component:", err);
    }
  };

const handleUpdateComponent = async (componentId, updates) => {
    try {
      const updatedComponent = await componentsService.update(componentId, updates);
      setComponents(prev => 
        prev.map(c => c.Id === componentId ? updatedComponent : c)
      );
      toast.success("Component updated successfully");
    } catch (err) {
      toast.error(`Failed to update component: ${err.message}`);
      console.error("Error updating component:", err);
    }
  };

const handleDeleteComponent = async (componentId) => {
    try {
      await componentsService.delete(componentId);
      setComponents(prev => prev.filter(c => c.Id !== componentId));
      toast.success("Component deleted successfully");
    } catch (err) {
      toast.error(`Failed to delete component: ${err.message}`);
      console.error("Error deleting component:", err);
    }
  };

  const handlePublishSite = async () => {
    try {
      await sitesService.publish(siteId);
      setSite(prev => ({ ...prev, published: true }));
      toast.success("Site published successfully!");
    } catch (err) {
      toast.error("Failed to publish site");
      console.error("Error publishing site:", err);
    }
  };

  const handlePreviewSite = () => {
    window.open(`/preview/${siteId}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="h-[calc(100vh-4rem)]">
          <Loading type="builder" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
          <Error message={error} onRetry={loadBuilderData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Builder Header */}
      <div className="bg-surface/50 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
            >
              <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
              Back to Dashboard
            </Button>
            
            <div className="h-6 w-px bg-slate-600"></div>
            
            <div>
              <h1 className="text-lg font-semibold text-white">
                {site?.name}
              </h1>
              <p className="text-sm text-slate-400">
                {currentPage?.title || "Select a page"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {pages.length > 1 && (
              <select
                value={currentPage?.Id || ""}
                onChange={(e) => {
                  const page = pages.find(p => p.Id === parseInt(e.target.value));
                  if (page) handlePageChange(page);
                }}
                className="bg-surface border border-slate-600 text-white px-3 py-2 rounded-lg text-sm"
              >
                {pages.map(page => (
                  <option key={page.Id} value={page.Id}>
                    {page.title}
                  </option>
                ))}
              </select>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviewSite}
            >
              <ApperIcon name="Eye" size={16} className="mr-2" />
              Preview
            </Button>
            
            <Button
              size="sm"
              onClick={handlePublishSite}
              className={site?.published ? "bg-success" : "gradient-bg"}
            >
              <ApperIcon name="Globe" size={16} className="mr-2" />
              {site?.published ? "Published" : "Publish"}
            </Button>
          </div>
        </div>
      </div>

      {/* Builder Interface */}
      <div className="flex h-[calc(100vh-8rem)]">
        <ComponentLibrary onAddComponent={handleAddComponent} />
        
        <BuilderCanvas
          components={components}
          onAddComponent={handleAddComponent}
          onUpdateComponent={handleUpdateComponent}
          onDeleteComponent={handleDeleteComponent}
        />
        
        <ChatPreview
          site={site}
          currentPage={currentPage}
          components={components}
        />
      </div>
    </div>
  );
};

export default Builder;