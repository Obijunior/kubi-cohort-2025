import React from 'react';
import { Target, TrendingUp, Trophy, Zap } from 'lucide-react';

export default function FeaturesGrid() {
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
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Why You&apos;ll Love [ project name ]
        </h2>
        <p className="text-xl text-gray-600">
          Real estate investing shouldn&apos;t be boring. We made it awesome. ✨
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