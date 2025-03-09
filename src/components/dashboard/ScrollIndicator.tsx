
import React from 'react';

const ScrollIndicator: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 dark:bg-lending-card/80 light:bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border dark:border-lending-primary/20 light:border-indigo-200 opacity-80 hover:opacity-100 transition-all duration-300 hover-glow">
      <div className="w-1 h-12 dark:bg-lending-dark light:bg-gray-200 rounded-full overflow-hidden">
        <div className="w-full dark:bg-lending-primary light:bg-indigo-500 rounded-full animate-pulse-slow" style={{
          height: `${Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100, 100)}%`,
          transition: 'height 0.3s ease-out'
        }}></div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
