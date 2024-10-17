import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  TooltipProps,
} from 'recharts';

interface ChartContainerProps {
  chartData: {
    labels: string[];
    datasets: {
      data: number[];
    }[];
  };
}


const CustomTooltip: React.FC<TooltipProps<any, any>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { label, sales, purchase, profit } = payload[0].payload;
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-xs">
        <h4 className="font-semibold text-lg text-gray-800">{label}</h4>
        <p className="text-gray-600">Sales: <span className="font-bold">${sales}</span></p>
        <p className="text-gray-600">Purchase: <span className="font-bold">${purchase}</span></p>
        <p className="text-gray-600">Profit: <span className="font-bold">${profit}</span></p>
      </div>
    );
  }
  return null;
};


const ChartContainer: React.FC<ChartContainerProps> = ({ chartData }) => {
  const barData = chartData.labels.map((label, index) => ({
    label,
    sales: chartData.datasets[0].data[index],
    purchase: chartData.datasets[1]?.data[index] || 0,
    profit: chartData.datasets[2]?.data[index] || 0,
  }));

  const pieData = [
    { name: 'Sales', value: chartData.datasets[0].data.reduce((a, b) => a + b, 0) },
    { name: 'Purchase', value: chartData.datasets[1].data.reduce((a, b) => a + b, 0) },
    { name: 'Profit', value: chartData.datasets[2].data.reduce((a, b) => a + b, 0) },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 p-4">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-xl shadow-lg">
        <h2 className="text-white text-lg font-semibold mb-4">Sales, Purchase, and Profit (Bar Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="label" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="sales" fill="rgba(255, 255, 255, 0.7)" isAnimationActive />
            <Bar dataKey="purchase" fill="rgba(255, 255, 255, 0.4)" isAnimationActive />
            <Bar dataKey="profit" fill="rgba(75, 192, 192, 0.6)" isAnimationActive />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gradient-to-r from-green-400 to-teal-400 p-6 rounded-xl shadow-lg">
        <h2 className="text-white text-lg font-semibold mb-4">Sales, Purchase, and Profit (Line Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={barData}>
            <XAxis dataKey="label" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth={2}
              isAnimationActive
            />
            <Line
              type="monotone"
              dataKey="purchase"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth={2}
              isAnimationActive
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="rgba(75, 192, 192, 1)"
              strokeWidth={2}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gradient-to-r from-red-400 to-pink-400 p-6 rounded-xl shadow-lg">
        <h2 className="text-white text-lg font-semibold mb-4">Sales, Purchase, and Profit (Pie Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              isAnimationActive
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={
                  entry.name === 'Sales' ? 'rgba(255, 255, 255, 0.7)' :
                  entry.name === 'Purchase' ? 'rgba(255, 255, 255, 0.4)' :
                  'rgba(75, 192, 192, 0.6)'
                } />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl shadow-lg">
        <h2 className="text-white text-lg font-semibold mb-4">Sales, Purchase, and Profit (Area Chart)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={barData}>
            <XAxis dataKey="label" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="rgba(255, 255, 255, 0.9)"
              fill="rgba(255, 255, 255, 0.3)"
              isAnimationActive
            />
            <Area
              type="monotone"
              dataKey="purchase"
              stroke="rgba(255, 255, 255, 0.6)"
              fill="rgba(255, 255, 255, 0.2)"
              isAnimationActive
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="rgba(75, 192, 192, 1)"
              fill="rgba(75, 192, 192, 0.3)"
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartContainer;
