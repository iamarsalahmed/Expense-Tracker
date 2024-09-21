import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;  // Add date field
  isRecurring: boolean; // Add recurring field
}

interface ExpenseState {
  transactions: Transaction[];
}

const initialState: ExpenseState = {
  transactions: [],
};

// ... your existing slice code ...

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex((transaction) => transaction.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload; // Update the transaction
      }
    },
    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
});

// Export actions and reducer
export const { addTransaction, removeTransaction, editTransaction, clearTransactions } = expenseSlice.actions;
export default expenseSlice.reducer;
