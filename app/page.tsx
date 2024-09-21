'use client';
import React, { useEffect } from 'react';
import ExpenseForm from './(components)/ExpenseForm';
import ExpenseList from './(components)/ExpenseList';
import ExpenseControls from './(components)/ExpenseControls';
import Analytics from './(components)/Analytics';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch } from './store/store';
import { DarkModeProvider, useDarkMode } from './(components)/DarkModeContext';
import { addTransaction } from './store/expenseSlice';
import { RootState,  } from './types/types';

const App = () => {
  interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: Date; // Ensure this is of type Date
    isRecurring: boolean;
    type: 'income' | 'expense'; // Ensure this is a union type
  }
  const { darkMode, toggleDarkMode } = useDarkMode();
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector((state: RootState) => state.expenses.transactions);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    storedTransactions.forEach((transaction: any) => {
      transaction.date = new Date(transaction.date); // Convert string to Date
      dispatch(addTransaction(transaction));
    });
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (transaction: Transaction) => {
    dispatch(addTransaction(transaction));
  };
 
  
  return (
    <div className={`min-h-screen flex flex-col items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} p-6 transition-all`}>
      <h1 className="text-4xl font-extrabold mb-6">Expense Tracker</h1>
      <div className="flex items-center mb-6">
        <span className={`mr-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Dark Mode</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only" checked={darkMode} onChange={toggleDarkMode} />
          <div className="w-12 h-6 bg-gray-300 rounded-full shadow-inner transition duration-200 ease-in-out">
            <div className={`dot w-6 h-6 bg-white rounded-full shadow transform transition duration-200 ease-in-out ${darkMode ? 'translate-x-6 bg-blue-600' : 'translate-x-0'}`}></div>
          </div>
        </label>
      </div>
      <div className="w-full max-w-3xl bg-gray-100 rounded-lg shadow-md p-6 mb-6">
        <ExpenseControls />
        <ExpenseForm onAddTransaction={handleAddTransaction} darkMode={darkMode} />
      </div>
      <div className="w-full max-w-3xl bg-gray-100 rounded-lg shadow-md p-6">
        <ExpenseList darkMode={darkMode} />
        <Analytics darkMode={darkMode} />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </Provider>
  );
};

export default Home;
