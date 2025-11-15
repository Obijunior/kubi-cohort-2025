// app/components/MarketChart.tsx
'use client';

import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface MarketChartProps {
  data: Array<{
    date: string;
    price: number;
  }>;
  mineralName: string;
}

export default function MarketChart({ data, mineralName }: MarketChartProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
      <h3 className="text-lg font-bold text-stone-900 mb-4">
        {mineralName} - Price History
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis 
            dataKey="date" 
            stroke="#78716c"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#78716c"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e7e5e4',
              borderRadius: '8px',
              fontSize: '14px'
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#10b981" 
            strokeWidth={2}
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-stone-600">Latest data</span>
        <span className="text-emerald-600 font-medium">
          ${data[data.length - 1]?.price.toFixed(2)}/unit
        </span>
      </div>
    </div>
  );
}