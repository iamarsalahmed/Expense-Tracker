import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Ensure this package is installed
import 'react-datepicker/dist/react-datepicker.css';
import { Transaction } from '../types/types';

interface ExpenseFormProps {
  onAddTransaction: (transaction: Transaction) => void; // Use Transaction directly
  darkMode: boolean; // Specify the type for darkMode prop
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddTransaction, darkMode }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState<Date>(new Date()); // Ensure date is a Date object
  const [isRecurring, setIsRecurring] = useState(false);
  const [type, setType] = useState<'expense' | 'income'>('expense'); // Use union type

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description || !amount || !date) return;
  
    const newTransaction: Transaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      date, // This should be a Date object
      isRecurring,
      type,
    };
  
    onAddTransaction(newTransaction);
  };
  
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-2">Add Transaction</h2>
      <form 
        onSubmit={handleSubmit} 
        className="space-y-4 border border-gray-300 rounded-lg p-6 shadow-lg"
      >
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          className={`border p-2 w-full rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        />
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Amount" 
          className={`border p-2 w-full rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        />
        <DatePicker 
          selected={date} 
          onChange={(selectedDate) => selectedDate && setDate(selectedDate)} // Ensure selectedDate is not null
          className={`border p-2 w-full rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} 
        />
        <label className="flex items-center">
          <input 
            type="checkbox" 
            checked={isRecurring} 
            onChange={(e) => setIsRecurring(e.target.checked)} 
            className="mr-2"
          />
          Recurring
        </label>
        <div className="flex items-center space-x-4">
          <label className={`cursor-pointer ${type === 'expense' ? 'text-blue-600' : 'text-gray-800'}`}>
            <input 
              type="radio" 
              value="expense" 
              checked={type === 'expense'} 
              onChange={() => setType('expense')} 
              className="hidden" 
            />
            <div className={`flex items-center justify-center w-32 h-12 border-2 rounded-lg transition-colors duration-200 ${type === 'expense' ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
              <span className="text-black font-semibold">Expense</span>
            </div>
          </label>
          <label className={`cursor-pointer ${type === 'income' ? 'text-green-600' : 'text-gray-800'}`}>
            <input 
              type="radio" 
              value="income" 
              checked={type === 'income'} 
              onChange={() => setType('income')} 
              className="hidden" 
            />
            <div className={`flex items-center justify-center w-32 h-12 border-2 rounded-lg transition-colors duration-200 ${type === 'income' ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}>
              <span className="text-black font-semibold">Income</span>
            </div>
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Transaction</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
