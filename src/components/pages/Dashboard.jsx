import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import SiteGrid from "@/components/organisms/SiteGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import sitesService from "@/services/api/sitesService";

const Dashboard = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadSites = async () => {
    try {
      setLoading(true);
      setError("");
      const sitesData = await sitesService.getAll();
      setSites(sitesData);
    } catch (err) {
      setError("Failed to load sites. Please try again.");
      console.error("Error loading sites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSites();
  }, []);

  const handleSiteClick = (site) => {
    navigate(`/builder/${site.Id}`);
  };

  const handleCreateSite = () => {
    navigate("/sites/new");
  };

  const handleDeleteSite = async (siteId) => {
    if (!window.confirm("Are you sure you want to delete this site?")) {
      return;
    }

    try {
      await sitesService.delete(siteId);
      setSites(prev => prev.filter(site => site.Id !== siteId));
      toast.success("Site deleted successfully");
    } catch (err) {
      toast.error("Failed to delete site");
      console.error("Error deleting site:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading type="dashboard" />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadSites} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">
            Your Conversational Websites
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Create and manage AI-powered websites that engage visitors through natural conversation.
          </p>
        </div>

        {sites.length === 0 ? (
          <Empty
            title="No sites yet"
            description="Create your first conversational website to get started"
            actionText="Create Site"
            onAction={handleCreateSite}
            icon="Globe"
          />
        ) : (
          <SiteGrid
            sites={sites}
            onSiteClick={handleSiteClick}
            onCreateSite={handleCreateSite}
            onDeleteSite={handleDeleteSite}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;