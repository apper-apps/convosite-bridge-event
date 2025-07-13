import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ChatMessage = ({ 
  message, 
  isUser = false, 
  timestamp,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 ${className}`}
    >
      <div className={`flex items-start space-x-2 max-w-[80%] ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-primary" : "bg-surface"
        }`}>
          <ApperIcon 
            name={isUser ? "User" : "Bot"} 
            size={16} 
            className={isUser ? "text-white" : "text-slate-400"} 
          />
        </div>
        
        <div className={`rounded-2xl px-4 py-2 ${
          isUser 
            ? "bg-gradient-to-r from-primary to-secondary text-white" 
            : "bg-surface text-slate-200 border border-slate-600"
        }`}>
          <p className="text-sm">{message}</p>
          {timestamp && (
            <p className={`text-xs mt-1 ${isUser ? "text-blue-100" : "text-slate-500"}`}>
              {timestamp}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;