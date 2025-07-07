import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartData } from '../../types';
import DataCard from './DataCard';

interface ChartCardProps {
  title: string;
  data: ChartData[];
  type: 'bar' | 'pie';
  className?: string;
}

const COLORS = ['#7C3AED', '#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#EC4899'];

const formatNumber = (value: number) => {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;
};

const ChartCard: React.FC<ChartCardProps> = ({ title, data, type, className = '' }) => {
  return (
    <DataCard title={title} className={className}>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={formatNumber}
              />
              <Tooltip
                formatter={(value: number) => [`KES ${value.toLocaleString()}`, 'Amount']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar 
                dataKey="value" 
                fill="#7C3AED" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                animationDuration={1500}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`KES ${value.toLocaleString()}`, 'Amount']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </DataCard>
  );
};

export default ChartCard;