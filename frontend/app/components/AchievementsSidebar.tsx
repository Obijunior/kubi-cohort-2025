import React from 'react';
import { Award, Star } from 'lucide-react';

export default function AchievementsSidebar() {
  const achievements = [
    { title: 'First Search', icon: '🔍', unlocked: true },
    { title: 'Market Explorer', icon: '🗺️', unlocked: true },
    { title: 'Trend Spotter', icon: '📈', unlocked: false },
    { title: 'Investment Pro', icon: '💎', unlocked: false },
  ];

  return (
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
  );
}