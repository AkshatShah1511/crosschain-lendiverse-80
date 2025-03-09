
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Transaction types
export type TransactionType = 'deposit' | 'withdraw' | 'lend' | 'borrow' | 'repay';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  asset: string;
  timestamp: Date;
  address: string;
  status: 'pending' | 'completed' | 'failed';
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  getTotalDeposited: () => number;
  getTotalBorrowed: () => number;
  getRecentTransactions: (limit?: number) => Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load transactions from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      try {
        // Need to convert string dates back to Date objects
        const parsed = JSON.parse(savedTransactions);
        const formattedTransactions = parsed.map((tx: any) => ({
          ...tx,
          timestamp: new Date(tx.timestamp)
        }));
        setTransactions(formattedTransactions);
      } catch (error) {
        console.error('Failed to parse saved transactions', error);
      }
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date(),
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    return newTransaction;
  };

  const getTotalDeposited = () => {
    return transactions
      .filter(tx => tx.type === 'deposit' && tx.status === 'completed')
      .reduce((total, tx) => total + tx.amount, 0);
  };

  const getTotalBorrowed = () => {
    return transactions
      .filter(tx => tx.type === 'borrow' && tx.status === 'completed')
      .reduce((total, tx) => total + tx.amount, 0);
  };

  const getRecentTransactions = (limit = 5) => {
    return [...transactions]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  };

  const value = {
    transactions,
    addTransaction,
    getTotalDeposited,
    getTotalBorrowed,
    getRecentTransactions,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
