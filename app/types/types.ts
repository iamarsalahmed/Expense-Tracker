// types.ts

// // Define the Transaction interface
// export interface Transaction {
//     id: number;                   // Unique identifier for the transaction
//     description: string;          // Description of the transaction
//     amount: number;               // Amount of the transaction
//     type: 'income' | 'expense';   // Type of transaction (either income or expense)
//     date: string;                 // Date of the transaction, stored as a string (e.g., ISO format)
//   }
  
//   // Define the RootState interface for the Redux state
//   export interface RootState {
//     expenses: {
//       transactions: Transaction[]; // Array of transactions
//     };
//   }
  
//   // Define the ExpenseState interface for the Redux state
//   export interface ExpenseState {
//     transactions: Transaction[];
//   }
 // types.ts

// Define the Transaction interface
// types.ts
// types.ts
export interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: Date; // Keep as Date
    isRecurring: boolean;
    type: 'income' | 'expense'; 
  }
  

// Define the RootState interface for the Redux state
export interface RootState {
    expenses: {
        transactions: Transaction[]; // Array of transactions
    };
}

export interface ExpenseState {
    transactions: Transaction[];
}
 