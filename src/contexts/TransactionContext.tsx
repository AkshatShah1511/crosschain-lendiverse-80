import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

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

export interface PortfolioDataPoint {
  name: string;
  value: number;
  timestamp: Date;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  getTotalDeposited: () => number;
  getTotalBorrowed: () => number;
  getTotalWithdrawn: () => number;
  getTotalRepaid: () => number;
  getNetPortfolioValue: () => number;
  getRecentTransactions: (limit?: number) => Transaction[];
  getPortfolioChartData: () => PortfolioDataPoint[];
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

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    console.log("Adding new transaction:", transaction);
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date(),
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    return newTransaction;
  }, []);

  const getTotalDeposited = useCallback(() => {
    return transactions
      .filter(tx => (tx.type === 'deposit' || tx.type === 'lend') && tx.status === 'completed')
      .reduce((total, tx) => total + tx.amount, 0);
  }, [transactions]);

  const getTotalBorrowed = useCallback(() => {
    return transactions
      .filter(tx => tx.type === 'borrow' && tx.status === 'completed')
      .reduce((total, tx) => total + tx.amount, 0);
  }, [transactions]);

  const getTotalWithdrawn = useCallback(() => {
    return transactions
      .filter(tx => tx.type === 'withdraw' && tx.status === 'completed')
      .reduce((total, tx) => total + tx.amount, 0);
  }, [transactions]);

  const getTotalRepaid = useCallback(() => {
    return transactions
      .filter(tx => tx.type === 'repay' && tx.status === 'completed')
      .reduce((total, tx) => total + tx.amount, 0);
  }, [transactions]);

  const getNetPortfolioValue = useCallback(() => {
    const deposited = getTotalDeposited();
    const withdrawn = getTotalWithdrawn();
    const borrowed = getTotalBorrowed();
    const repaid = getTotalRepaid();
    
    // Net portfolio = (deposited - withdrawn) + (borrowed - repaid)
    return (deposited - withdrawn) + (borrowed - repaid);
  }, [getTotalDeposited, getTotalWithdrawn, getTotalBorrowed, getTotalRepaid]);

  const getRecentTransactions = useCallback((limit = 5) => {
    return [...transactions]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }, [transactions]);

  // Generate portfolio data points from transactions with transaction count as x-axis
  const getPortfolioChartData = useCallback(() => {
    console.log("Generating portfolio chart data from", transactions.length, "transactions");
    
    // If there are no transactions, return initial empty data
    if (transactions.length === 0) {
      return [{ name: "0", value: 0, timestamp: new Date() }];
    }

    // Sort transactions by date (oldest first)
    const sortedTransactions = [...transactions]
      .filter(tx => tx.status === 'completed')
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    if (sortedTransactions.length === 0) {
      // If all transactions are pending/failed, return empty data
      return [{ name: "0", value: 0, timestamp: new Date() }];
    }
    
    const dataPoints: PortfolioDataPoint[] = [];
    let runningTotal = 0;
    
    // Add a starting point
    dataPoints.push({
      name: "0",
      value: 0,
      timestamp: new Date(sortedTransactions[0].timestamp.getTime() - 86400000) // 1 day before first transaction
    });
    
    // Process all transactions and add a data point for each
    sortedTransactions.forEach((tx, index) => {
      // Update running total based on transaction type
      if (tx.type === 'deposit' || tx.type === 'lend') {
        runningTotal += tx.amount;
      } else if (tx.type === 'withdraw') {
        runningTotal -= tx.amount;
      } else if (tx.type === 'borrow') {
        runningTotal += tx.amount;
      } else if (tx.type === 'repay') {
        runningTotal -= tx.amount;
      }
      
      // Add data point for this transaction
      dataPoints.push({
        name: String(index + 1), // Transaction count (1-indexed)
        value: Math.max(0, runningTotal), // Ensure not negative
        timestamp: new Date(tx.timestamp)
      });
    });
    
    console.log("Generated chart data points:", dataPoints.length);
    return dataPoints;
  }, [transactions]);

  const value = {
    transactions,
    addTransaction,
    getTotalDeposited,
    getTotalBorrowed,
    getTotalWithdrawn,
    getTotalRepaid,
    getNetPortfolioValue,
    getRecentTransactions,
    getPortfolioChartData,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
