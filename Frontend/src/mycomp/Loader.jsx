import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center z-50">
      {/* Container for the spinner */}
      <div className="relative flex items-center justify-center w-24 h-24 mb-8">
        
        {/* Outer Ring - Spinning Gradient */}
        <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-indigo-500 animate-spin blur-[1px]"></div>
        
        {/* Inner Ring - Counter Spin */}
        <div className="absolute inset-2 rounded-full border-b-2 border-r-2 border-zinc-700 animate-[spin_1.5s_linear_infinite_reverse]"></div>
        
        {/* Center Pulsing Core */}
        <div className="w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center animate-pulse">
           <span className="font-bold text-indigo-400 text-xl">P</span>
        </div>
        
        {/* Glow Effect behind */}
        <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full"></div>
      </div>

      {/* Text Loading */}
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-bold text-white tracking-widest uppercase animate-pulse">
          Press-Flix
        </h3>
        <p className="text-zinc-500 text-xs tracking-wider">
          Initializing Engine...
        </p>
      </div>
    </div>
  );
};

export default Loader;