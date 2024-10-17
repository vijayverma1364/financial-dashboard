import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  formData: { month: string; sales: string; purchase: string };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  toggleModal,
  formData,
  handleChange,
  handleSubmit,
}) => {
  const [profit, setProfit] = useState('');

  useEffect(() => {
    const sales = parseFloat(formData.sales) || 0;
    const purchase = parseFloat(formData.purchase) || 0;
    const calculatedProfit = sales - purchase;
    setProfit(calculatedProfit.toString());
  }, [formData.sales, formData.purchase]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-800 opacity-70"
        onClick={toggleModal}
      ></div>
      <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 z-10 w-full max-w-lg transition-transform transform scale-95 md:scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Financial Overview</h2>
          <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select Month
            </option>
            {[
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December',
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="sales"
            value={formData.sales}
            onChange={handleChange}
            placeholder="Sales Amount"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="purchase"
            value={formData.purchase}
            onChange={handleChange}
            placeholder="Purchase Amount"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={profit}
            placeholder="Profit Amount"
            readOnly
            className="w-full p-4 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
