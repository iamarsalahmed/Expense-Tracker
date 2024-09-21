import React from 'react';
import { useSelector } from 'react-redux';
import { Parser } from 'json2csv';
import { RootState } from '../types/types';

const ExpenseControls = () => {
  const transactions = useSelector((state: RootState) => state.expenses.transactions);

  const exportToCSV = () => {
    const fields = ['id', 'description', 'amount', 'type', 'date'];
    const parser = new Parser({ fields });
    const csv = parser.parse(transactions);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    link.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      // reader.onload = () => {
      //   // const csvData = event.target?.result as string;
      //   // Parse and dispatch actions to add transactions
      // };
      reader.readAsText(file);
    }
  };

  return (
    <div className="mb-4">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button onClick={exportToCSV} className="bg-green-500 text-white p-2 rounded">Export Transactions</button>
    </div>
  );
};

export default ExpenseControls;
