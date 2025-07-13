import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "@/components/pages/Dashboard";
import Builder from "@/components/pages/Builder";
import SiteCreate from "@/components/pages/SiteCreate";
import Templates from "@/components/pages/Templates";
import Settings from "@/components/pages/Settings";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/builder/:siteId" element={<Builder />} />
        <Route path="/sites/new" element={<SiteCreate />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: "#1E293B",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          color: "#F8FAFC"
        }}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;