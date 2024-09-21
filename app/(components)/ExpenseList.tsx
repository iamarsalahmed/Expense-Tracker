import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTransaction, editTransaction } from '../store/expenseSlice';
import { RootState, Transaction } from '../types/types';

interface ExpenseListProps {
  darkMode: boolean; // Specify the type for darkMode prop
}

const ExpenseList: React.FC<ExpenseListProps> = ({ darkMode }) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.expenses.transactions);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter((transaction: Transaction) => 
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (transaction: Transaction) => {
    const newDescription = prompt("Enter new description:", transaction.description);
    const newAmount = prompt("Enter new amount:", transaction.amount.toString());
    if (newDescription && newAmount) {
      dispatch(editTransaction({ 
        ...transaction, 
        description: newDescription, 
        amount: parseFloat(newAmount),
        isRecurring: transaction.isRecurring 
      }));
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search Transactions" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className={`border p-2 w-full mb-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
      />
      <ul>
        {filteredTransactions.map((transaction: Transaction) => (
          <li key={transaction.id} className={`flex justify-between p-4 border-b ${transaction.type === 'expense' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} rounded-lg shadow-sm transition`}>
            <span>{transaction.description} - ${transaction.amount} - {new Date(transaction.date).toLocaleDateString()}</span>
            <div>
              <button onClick={() => handleEdit(transaction)} className="bg-yellow-500 text-white rounded px-2 py-1 mx-1 hover:bg-yellow-400 transition">Edit</button>
              <button onClick={() => dispatch(removeTransaction(transaction.id))} className="bg-red-500 text-white rounded px-2 py-1 mx-1 hover:bg-red-400 transition">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
