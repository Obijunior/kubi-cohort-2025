import React from 'react';
import { Home } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center transform rotate-12">
                <Home className="w-6 h-6 text-white -rotate-12" />
              </div>
              <span className="text-2xl font-bold">[ project name ]</span>
            </div>
            <p className="text-gray-400">
              Making real estate investing fun, accessible, and rewarding for everyone.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Markets</a></li>
              <li><a href="#" className="hover:text-white transition">Trends</a></li>
              <li><a href="#" className="hover:text-white transition">Neighborhoods</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Learn</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition">Investment Guide</a></li>
              <li><a href="#" className="hover:text-white transition">Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p className="mb-2">Trading and investing involve substantial risk. Past performance is not indicative of future results.</p>
          <p>© 2025 [ project name ], Inc. Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
}