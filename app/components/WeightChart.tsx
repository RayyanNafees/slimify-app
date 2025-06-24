import type { weightRec } from '@/routes/weightDashboard';
// import type { WeightRecord } from 'data/weightData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
// import { WeightRecord } from "@/data/weightData";

// interface WeightChartProps {
//   data: WeightRecord[];
// }

export const WeightChart = () => {
  const data = [
  { date: "9-june", time: "8:56 AM", weight: 75.40, dayOfWeek: "Sun" },
  { date: "10-june", time: "9:18 AM", weight: 76.35, dayOfWeek: "Mon" },
  { date: "11-june", time: "9:01 AM", weight: 74.85, dayOfWeek: "Tue" },
  { date: "12-june", time: "7:43 AM", weight: 74.85, dayOfWeek: "Wed" },
  { date: "13-june", time: "9:03 AM", weight: 73.40, dayOfWeek: "Thu" },
  { date: "14-june", time: "9:18 AM", weight: 73.10, dayOfWeek: "Fri" },
  { date: "15-june", time: "9:16 AM", weight: 73.05, dayOfWeek: "Sat" },
  { date: "16-june", time: "9:19 AM", weight: 73.05, dayOfWeek: "Sun" },
  { date: "17-june", time: "9:15 AM", weight: 73.05, dayOfWeek: "Mon" },
  { date: "18-june", time: "8:57 AM", weight: 72.55, dayOfWeek: "Tue" },
];
  const chartData = data.map((record, index) => ({
    ...record,
    day: `Day ${index + 1}`,
    shortDate: record.date.split('-')[0],
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 text-sm">{data.date}</p>
          <p className="text-xs text-gray-600">{data.time}</p>
          <p className="text-base sm:text-lg font-bold text-orange-600">{data.weight} KG</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ea580c" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="shortDate" 
            tick={{ fontSize: 10, fill: '#666' }}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis 
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
            tick={{ fontSize: 10, fill: '#666' }}
            axisLine={{ stroke: '#e0e0e0' }}
            label={{ 
              value: 'Weight (KG)', 
              angle: -90, 
              position: 'insideLeft', 
              style: { textAnchor: 'middle', fontSize: '12px' } 
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="weight"
            stroke="#ea580c"
            strokeWidth={2}
            fill="url(#weightGradient)"
            dot={{ fill: '#ea580c', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, stroke: '#ea580c', strokeWidth: 2, fill: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}