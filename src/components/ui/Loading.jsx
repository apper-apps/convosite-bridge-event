import { motion } from "framer-motion";

const Loading = ({ type = "default", className = "" }) => {
  if (type === "builder") {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="grid grid-cols-12 gap-6 h-screen">
          {/* Component Library Skeleton */}
          <div className="col-span-3 bg-surface/50 rounded-lg p-4 space-y-4">
            <div className="h-6 bg-slate-700 rounded shimmer-bg"></div>
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-700 rounded shimmer-bg"></div>
              ))}
            </div>
          </div>
          
          {/* Canvas Skeleton */}
          <div className="col-span-6 bg-slate-800/50 rounded-lg p-6 space-y-6">
            <div className="h-8 bg-slate-700 rounded shimmer-bg w-1/3"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-700 rounded shimmer-bg"></div>
              ))}
            </div>
          </div>
          
          {/* Preview Skeleton */}
          <div className="col-span-3 bg-surface/50 rounded-lg p-4 space-y-4">
            <div className="h-6 bg-slate-700 rounded shimmer-bg"></div>
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`h-8 rounded shimmer-bg ${i % 2 === 0 ? "bg-primary/20 ml-auto w-3/4" : "bg-slate-700 w-2/3"}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className={`animate-pulse space-y-6 ${className}`}>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-slate-700 rounded shimmer-bg w-48"></div>
          <div className="h-10 bg-primary/20 rounded shimmer-bg w-32"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-surface/50 rounded-lg p-6 space-y-4">
              <div className="h-6 bg-slate-700 rounded shimmer-bg w-3/4"></div>
              <div className="h-4 bg-slate-700 rounded shimmer-bg w-1/2"></div>
              <div className="h-20 bg-slate-700 rounded shimmer-bg"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-slate-700 rounded shimmer-bg w-1/4"></div>
                <div className="h-4 bg-primary/20 rounded shimmer-bg w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;