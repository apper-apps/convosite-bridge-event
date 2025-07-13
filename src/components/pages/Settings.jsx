import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Checkbox from "@/components/atoms/Checkbox";
import ApperIcon from "@/components/ApperIcon";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    general: {
      companyName: "ConvoSite",
      supportEmail: "support@convosite.com",
      defaultDomain: "convosite.com",
      enableAnalytics: true,
      enableSitemap: true
    },
    ai: {
      defaultModel: "gpt-3.5-turbo",
      maxTokens: 2048,
      temperature: 0.7,
      enableFallback: true,
      fallbackMessage: "I'm sorry, I didn't understand that. Could you please rephrase your question?"
    },
    notifications: {
      emailNotifications: true,
      newSiteAlerts: true,
      publishingAlerts: true,
      errorAlerts: true,
      weeklyReports: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 60,
      allowedDomains: "",
      enforceHttps: true
    }
  });

  const tabs = [
    { id: "general", name: "General", icon: "Settings" },
    { id: "ai", name: "AI Configuration", icon: "Bot" },
    { id: "notifications", name: "Notifications", icon: "Bell" },
    { id: "security", name: "Security", icon: "Shield" }
  ];

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log("Saving settings:", settings);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Company Information</h3>
        <div className="space-y-4">
          <FormField
            label="Company Name"
            value={settings.general.companyName}
            onChange={(e) => handleSettingChange("general", "companyName", e.target.value)}
          />
          <FormField
            label="Support Email"
            type="email"
            value={settings.general.supportEmail}
            onChange={(e) => handleSettingChange("general", "supportEmail", e.target.value)}
          />
          <FormField
            label="Default Domain"
            value={settings.general.defaultDomain}
            onChange={(e) => handleSettingChange("general", "defaultDomain", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={settings.general.enableAnalytics}
              onChange={(checked) => handleSettingChange("general", "enableAnalytics", checked)}
            />
            <div>
              <p className="text-sm font-medium text-white">Enable Analytics</p>
              <p className="text-xs text-slate-400">Track site performance and visitor behavior</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={settings.general.enableSitemap}
              onChange={(checked) => handleSettingChange("general", "enableSitemap", checked)}
            />
            <div>
              <p className="text-sm font-medium text-white">Auto-generate Sitemaps</p>
              <p className="text-xs text-slate-400">Automatically create XML sitemaps for SEO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAiSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">AI Model Configuration</h3>
        <div className="space-y-4">
          <FormField
            label="Default AI Model"
            value={settings.ai.defaultModel}
            onChange={(e) => handleSettingChange("ai", "defaultModel", e.target.value)}
          />
          
          <FormField
            label="Max Tokens"
            type="number"
            value={settings.ai.maxTokens}
            onChange={(e) => handleSettingChange("ai", "maxTokens", parseInt(e.target.value))}
          />
          
          <FormField
            label="Temperature"
            type="number"
            step="0.1"
            min="0"
            max="2"
            value={settings.ai.temperature}
            onChange={(e) => handleSettingChange("ai", "temperature", parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Fallback Behavior</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={settings.ai.enableFallback}
              onChange={(checked) => handleSettingChange("ai", "enableFallback", checked)}
            />
            <div>
              <p className="text-sm font-medium text-white">Enable Fallback Responses</p>
              <p className="text-xs text-slate-400">Show a fallback message when AI can't respond</p>
            </div>
          </div>
          
          {settings.ai.enableFallback && (
            <FormField
              label="Fallback Message"
              multiline
              value={settings.ai.fallbackMessage}
              onChange={(e) => handleSettingChange("ai", "fallbackMessage", e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={settings.notifications.emailNotifications}
              onChange={(checked) => handleSettingChange("notifications", "emailNotifications", checked)}
            />
            <div>
              <p className="text-sm font-medium text-white">Enable Email Notifications</p>
              <p className="text-xs text-slate-400">Receive notifications via email</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={settings.notifications.newSiteAlerts}
              onChange={(checked) => handleSettingChange("notifications", "newSiteAlerts", checked)}
            />
            <div>
              <p className="text-sm font-medium text-white">New Site Alerts</p>
              <p className="text-xs text-slate-400">Get notified when new sites are created</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={settings.notifications.publishingAlerts}
              onChange={(checked) => handleSettingChange("notifications", "publishingAlerts", checked)}
            />
            <div>
              <p className="text-sm font-medium text-white">Publishing Alerts</p>
              <p className="text-xs text-slate-400">Get notified when sites are published</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={settings.notifications.errorAlerts}
              onChange={(checked) => handleSettingChange("notifications", "errorAlerts", checked)}
            />
            <div>
              <p className="text-sm font-medium text-white">Error Alerts</p>
              <p className="text-xs text-slate-400">Get notified about system errors</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={settings.notifications.weeklyReports}
              onChange={(checked) => handleSettingChange("notifications", "weeklyReports", checked)}
            />
            <div>
              <p className="text-sm font-medium text-white">Weekly Reports</p>
              <p className="text-xs text-slate-400">Receive weekly usage and performance reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={settings.security.twoFactorAuth}
              onChange={(checked) => handleSettingChange("security", "twoFactorAuth", checked)}
            />
            <div>
              <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
              <p className="text-xs text-slate-400">Add an extra layer of security to your account</p>
            </div>
          </div>
          
          <FormField
            label="Session Timeout (minutes)"
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange("security", "sessionTimeout", parseInt(e.target.value))}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Domain Security</h3>
        <div className="space-y-4">
          <FormField
            label="Allowed Domains"
            multiline
            placeholder="domain1.com&#10;domain2.com"
            value={settings.security.allowedDomains}
            onChange={(e) => handleSettingChange("security", "allowedDomains", e.target.value)}
          />
          
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={settings.security.enforceHttps}
              onChange={(checked) => handleSettingChange("security", "enforceHttps", checked)}
            />
            <div>
              <p className="text-sm font-medium text-white">Enforce HTTPS</p>
              <p className="text-xs text-slate-400">Redirect all HTTP traffic to HTTPS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "general": return renderGeneralSettings();
      case "ai": return renderAiSettings();
      case "notifications": return renderNotificationSettings();
      case "security": return renderSecuritySettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">
            Settings
          </h1>
          <p className="text-slate-400">
            Configure your ConvoSite platform settings and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-primary/20 text-primary border-l-2 border-primary"
                      : "text-slate-300 hover:bg-surface hover:text-white"
                  }`}
                >
                  <ApperIcon name={tab.icon} size={18} className="mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-surface rounded-xl p-8 border border-slate-700"
            >
              {renderContent()}
              
              <div className="flex justify-end pt-6 border-t border-slate-700 mt-8">
                <Button onClick={handleSave} className="gradient-bg">
                  <ApperIcon name="Save" size={16} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;