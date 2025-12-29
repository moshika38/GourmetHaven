import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated Text Container */}
      <div className="flex items-baseline space-x-1">
        <div className="text-lg md:text-xl font-light tracking-widest text-gray-400 uppercase animate-pulse">
          Loading
        </div>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
