'use client';

import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, MapPin, Star, Trophy, Zap, Home, DollarSign, Award, ChevronRight, Target } from 'lucide-react';

export default function GameifiedRealEstateSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(250);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredMarkets = [
    { city: 'Miami', state: 'FL', trend: '+12.5%', icon: '🌴', level: 1, xp: 50 },
    { city: 'Austin', state: 'TX', trend: '+8.3%', icon: '🤠', level: 2, xp: 75 },
    { city: 'Denver', state: 'CO', trend: '+10.1%', icon: '⛰️', level: 2, xp: 75 },
    { city: 'Seattle', state: 'WA', trend: '+6.7%', icon: '☕', level: 3, xp: 100 },
    { city: 'Phoenix', state: 'AZ', trend: '+11.2%', icon: '🌵', level: 1, xp: 50 },
    { city: 'Nashville', state: 'TN', trend: '+9.4%', icon: '🎸', level: 2, xp: 75 },
  ];

  const achievements = [
    { title: 'First Search', icon: '🔍', unlocked: true },
    { title: 'Market Explorer', icon: '🗺️', unlocked: true },
    { title: 'Trend Spotter', icon: '📈', unlocked: false },
    { title: 'Investment Pro', icon: '💎', unlocked: false },
  ];

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Track Your Journey',
      description: 'Level up as you explore markets and make smart investments',
      color: 'bg-green-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Real-Time Trends',
      description: 'Get instant market updates and trending neighborhoods',
      color: 'bg-blue-500'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Earn Rewards',
      description: 'Complete challenges and unlock exclusive market insights',
      color: 'bg-yellow-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Search thousands of properties in seconds',
      color: 'bg-purple-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Navigation */}
        <nav className="relative z-10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center transform rotate-12">
                <Home className="w-6 h-6 text-white -rotate-12" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
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
              <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition">
                Start Quest
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
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
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-600">Level {userLevel} Investor</div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-blue-500" style={{ width: `${(userXP % 500) / 5}%` }} />
                    </div>
                    <span className="text-xs font-bold text-gray-700">{userXP} XP</span>
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                Your Real Estate
                <span className="block bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Adventure Starts Here
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Explore markets worldwide, track trends, and level up your investment game. It's real estate investing, but make it fun! 🚀
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
                  <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition">
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

            {/* Achievements Sidebar */}
            <div className="hidden md:block">
              <div className="bg-white rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-yellow-500" />
                  Your Achievements
                </h3>
                <div className="space-y-3">
                  {achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-xl transition ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-r from-green-100 to-blue-100' 
                          : 'bg-gray-100 opacity-50'
                      }`}
                    >
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">{achievement.title}</div>
                        {achievement.unlocked && (
                          <div className="text-xs text-green-600 font-semibold">✓ Unlocked</div>
                        )}
                      </div>
                      {achievement.unlocked && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition">
                  View All Rewards
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-300 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-300 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Featured Markets Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg mb-4">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-gray-700">Trending Now</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Hot Markets to Explore
          </h2>
          <p className="text-xl text-gray-600">
            Start your quest in these trending cities and earn XP! 🎯
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMarkets.map((market, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition cursor-pointer group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{market.icon}</div>
                <div className="flex items-center gap-1 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-bold text-green-600">{market.trend}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-1">
                {market.city}
              </h3>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{market.state}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {market.level}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">+{market.xp} XP</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Why You'll Love [ project name ]
          </h2>
          <p className="text-xl text-gray-600">
            Real estate investing shouldn't be boring. We made it awesome. ✨
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition"
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s both`
              }}
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 transform rotate-3`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl p-12 text-center shadow-2xl">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Start Your Quest?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 500,000+ investors exploring real estate markets worldwide. Level up, earn rewards, and make smarter investments!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-black text-lg hover:shadow-2xl transform hover:scale-105 transition">
              Start Free Quest
            </button>
            <button className="px-8 py-4 bg-white/20 backdrop-blur text-white rounded-full font-black text-lg hover:bg-white/30 transition border-2 border-white">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center transform rotate-12">
                  <Home className="w-6 h-6 text-white -rotate-12" />
                </div>
                <span className="text-2xl font-bold">[project name]</span>
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
            <p>© 2025 [ project name ] Made with ❤️</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}