'use client';

import React from 'react';
import { BookOpen, Award, Target, Zap } from 'lucide-react';

export default function EducationSection() {
  const lessons = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Real Estate Basics',
      description: 'Learn fundamental concepts of real estate investing and market analysis',
      xp: '50 XP',
      duration: '15 min',
      status: 'available'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Market Analysis',
      description: 'Understand trends, pricing, and how to evaluate different markets',
      xp: '100 XP',
      duration: '20 min',
      status: 'available'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Tokenized Futures',
      description: 'How blockchain technology enables fractional real estate investment',
      xp: '150 XP',
      duration: '25 min',
      status: 'locked'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Advanced Trading',
      description: 'Portfolio management, risk mitigation, and advanced strategies',
      xp: '200 XP',
      duration: '30 min',
      status: 'locked'
    },
  ];

  return (
    <section id="learn" className="px-6 py-20 bg-tertiary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent-tertiary/10 text-accent-tertiary px-4 py-2 rounded-full text-sm font-medium mb-4 border border-accent-tertiary/20">
            📚 Learn & Earn
          </div>
          <h2 className="text-4xl font-bold text-primary mb-4">
            Educational Pathway
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Complete lessons to unlock trading features and earn XP. Learn at your own pace in our lofi study environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {lessons.map((lesson, idx) => (
            <div
              key={idx}
              className={`bg-secondary rounded-theme-xl p-6 border-2 transition ${
                lesson.status === 'locked' 
                  ? 'border-default opacity-60' 
                  : 'border-default hover:border-accent-secondary/50 hover:shadow-theme-md cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-theme-md flex items-center justify-center ${
                  lesson.status === 'locked' 
                    ? 'bg-tertiary text-muted' 
                    : 'bg-accent-secondary/10 text-accent-secondary'
                }`}>
                  {lesson.status === 'locked' ? '🔒' : lesson.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-secondary mb-4">
                    {lesson.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="inline-flex items-center gap-1 text-accent-secondary font-medium">
                      <Award className="w-4 h-4" />
                      {lesson.xp}
                    </span>
                    <span className="text-muted">
                      ⏱️ {lesson.duration}
                    </span>
                  </div>
                </div>
              </div>
              
              {lesson.status === 'locked' && (
                <div className="mt-4 pt-4 border-t border-default">
                  <p className="text-sm text-muted text-center">
                    Complete previous lessons to unlock
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}