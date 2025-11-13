import React from 'react';
import { Home } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="relative z-10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-linear-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center transform rotate-12">
            <Home className="w-6 h-6 text-white -rotate-12" />
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            [ project name ]
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button className="text-gray-700 hover:text-gray-900 font-medium transition">
            Explore
          </button>
          <button className="text-gray-700 hover:text-gray-900 font-medium transition">
            Markets
          </button>
          <button className="text-gray-700 hover:text-gray-900 font-medium transition">
            Learn
          </button>
          <button className="px-6 py-2 bg-linear-to-r from-green-500 to-blue-500 text-white rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition">
            Start Quest
          </button>
        </div>
      </div>
    </nav>
  );
}
