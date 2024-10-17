import React from 'react';

interface DataCardsProps {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

const DataCards: React.FC<DataCardsProps> = ({ labels, datasets }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {labels.map((month, index) => (
        <div key={month} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-4">
            <h2 className="text-xl font-semibold text-white">{month}</h2>
          </div>
          <div className="p-6">
            <p className="text-xl font-bold text-gray-800 mb-2">
              Sales: <span className="text-green-500">${datasets[0].data[index]}</span>
            </p>
            <p className="text-xl font-bold text-gray-800 mb-2">
              Expenses: <span className="text-red-500">${datasets[1].data[index]}</span>
            </p>
            <p className="text-xl font-bold text-gray-800">
              Profit: <span className="text-blue-500">${datasets[2].data[index]}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataCards;
