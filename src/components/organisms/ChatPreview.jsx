import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ChatMessage from "@/components/molecules/ChatMessage";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const ChatPreview = ({ site, currentPage, components = [] }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hello! I'm here to help you learn about our site. What would you like to know?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    
    // Simple response simulation based on components
    let response = "Thanks for your question! ";
    
    const aiEnabledComponents = components.filter(c => c.aiEnabled);
    if (aiEnabledComponents.length > 0) {
      const matchingComponent = aiEnabledComponents.find(c => 
        c.aiTriggerRules?.keywords?.some(keyword => 
          userMessage.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      
      if (matchingComponent) {
        switch (matchingComponent.type) {
          case "hero":
            response += "Let me tell you about our main offering. " + matchingComponent.content.description;
            break;
          case "features":
            response += "Here are our key features: " + 
              matchingComponent.content.features?.map(f => f.title).join(", ");
            break;
          case "contact":
            response += "I'd love to help you get in touch! You can reach us through our contact form.";
            break;
          default:
            response += "I can show you relevant information about that.";
        }
      } else {
        response += "I have information about our services, features, and how to get in touch. What specific area interests you?";
      }
    } else {
      response += "I'm here to help! While I don't have specific AI-enabled components set up yet, I can still assist you in exploring the site.";
    }
    
    setIsTyping(false);
    
    const newMessage = {
      id: Date.now(),
      message: response,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      message: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    await simulateAIResponse(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-80 bg-background border-l border-slate-700 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 bg-surface/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <ApperIcon name="Bot" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium text-white">AI Assistant</h3>
            <p className="text-xs text-slate-400">
              {site?.name || "Preview Site"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.message}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-surface rounded-full flex items-center justify-center">
                  <ApperIcon name="Bot" size={16} className="text-slate-400" />
                </div>
                <div className="bg-surface border border-slate-600 rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700 bg-surface/30">
        <div className="flex space-x-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="gradient-bg"
          >
            <ApperIcon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;