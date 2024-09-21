import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart, registerables } from 'chart.js';
import { RootState } from "../types/types";

// Register all components
Chart.register(...registerables);

interface AnalyticsProps {
  darkMode: boolean; // Specify the type for darkMode prop
}

const Analytics: React.FC<AnalyticsProps> = ({ darkMode }) => {
  const transactions = useSelector((state: RootState) => state.expenses.transactions);

  const data = {
    labels: transactions.map(t => new Date(t.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Income',
        data: transactions.filter(t => t.type === 'income').map(t => t.amount),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Expenses',
        data: transactions.filter(t => t.type === 'expense').map(t => t.amount),
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  return (
    <div className={`mt-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4 rounded-lg shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-4`}>Analytics</h2>
      <Line data={data} options={{
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: darkMode ? 'white' : 'black',
            },
          },
        },
      }} />
    </div>
  );
};

export default Analytics;
