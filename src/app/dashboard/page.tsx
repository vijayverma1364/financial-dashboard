'use client';

import ChartContainer from '@/common/ChartContainer';
import DataCards from '@/common/DataCards';
import Modal from '@/common/FormModal';
import { useCopilotReadable } from '@copilotkit/react-core';
import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    month: '',
    sales: '',
    purchase: '',
  });
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Purchase',
        data: [45, 39, 60, 50, 45, 30, 20],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Profit',
        data: [20, 20, 20, 31, 11, 25, 20],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  });

  useCopilotReadable({
    description: 'Data about the Sales, Purchase, and Profit in particular month or as whole',
    value: chartData,
  });

  const [activeTab, setActiveTab] = useState<'charts' | 'cards'>('charts');

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const sales = Number(formData.sales);
    const purchase = Number(formData.purchase);
    const profit = sales - purchase;
  
    const existingMonth = chartData.labels.find(month => month === formData.month);
  
    if (existingMonth) {
      const monthIndex = chartData.labels.indexOf(existingMonth);
      const updatedSales = [...chartData.datasets[0].data];
      const updatedPurchase = [...chartData.datasets[1].data];
      const updatedProfit = [...chartData.datasets[2].data];
  
      updatedSales[monthIndex] = sales;
      updatedPurchase[monthIndex] = purchase;
      updatedProfit[monthIndex] = profit;
  
      setChartData(prev => ({
        ...prev,
        datasets: [
          { ...prev.datasets[0], data: updatedSales },
          { ...prev.datasets[1], data: updatedPurchase },
          { ...prev.datasets[2], data: updatedProfit },
        ],
      }));
    } else {
      setChartData(prev => ({
        labels: [...prev.labels, formData.month],
        datasets: [
          { ...prev.datasets[0], data: [...prev.datasets[0].data, sales] },
          { ...prev.datasets[1], data: [...prev.datasets[1].data, purchase] },
          { ...prev.datasets[2], data: [...prev.datasets[2].data, profit] },
        ],
      }));
    }
  
    setFormData({ month: '', sales: '', purchase: '' });
    toggleModal();
  };
  
  return (
    <div className="p-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Financial Dashboard</h1>
        <div className="sm:text-right">
          <button
            onClick={toggleModal}
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-semibold">Add Financial Entry</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 mb-6">
        <button
          className={`flex-1 px-4 py-2 rounded ${activeTab === 'charts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('charts')}
        >
          Charts
        </button>
        <button
          className={`flex-1 px-4 py-2 rounded ${activeTab === 'cards' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('cards')}
        >
          Data Cards
        </button>
      </div>

      {activeTab === 'charts' && <ChartContainer chartData={chartData} />}
      {activeTab === 'cards' && <DataCards labels={chartData.labels} datasets={chartData.datasets} />}

      <Modal
        isOpen={isOpen}
        toggleModal={toggleModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Dashboard;
