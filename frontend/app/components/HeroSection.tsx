import React from 'react';
import { Search, Trophy } from 'lucide-react';
import AchievementsSidebar from './AchievementsSidebar';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  scrollY: number;
  userLevel: number;
  userXP: number;
}

export default function HeroSection({ 
  searchQuery, 
  setSearchQuery, 
  scrollY,
  userLevel,
  userXP 
}: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            className="space-y-6"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* User Progress Badge */}
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-lg">
              <div className="w-10 h-10 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-600">Level {userLevel} Investor</div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-linear-to-r from-green-400 to-blue-500" style={{ width: `${(userXP % 500) / 5}%` }} />
                  </div>
                  <span className="text-xs font-bold text-gray-700">{userXP} XP</span>
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              Your Real Estate
              <span className="block bg-linear-to-r from-blue-300 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Adventure Starts Here
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore markets worldwide, track trends, and level up your investment game. It&apos;s real estate investing, but make it fun! 🚀
            </p>

            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center bg-white rounded-2xl shadow-2xl p-2 hover:shadow-3xl transition">
                <Search className="w-6 h-6 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search cities, neighborhoods, or markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-4 text-lg outline-none"
                />
                <button className="px-8 py-3 bg-linear-to-r from-green-500 to-blue-500 text-white rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition">
                  Go!
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="bg-white rounded-2xl px-6 py-3 shadow-lg">
                <div className="text-2xl font-black text-gray-900">500K+</div>
                <div className="text-sm text-gray-600">Active Investors</div>
              </div>
              <div className="bg-white rounded-2xl px-6 py-3 shadow-lg">
                <div className="text-2xl font-black text-gray-900">2.5M+</div>
                <div className="text-sm text-gray-600">Properties Tracked</div>
              </div>
            </div>
          </div>

          <AchievementsSidebar />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-green-300 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-300 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
}
