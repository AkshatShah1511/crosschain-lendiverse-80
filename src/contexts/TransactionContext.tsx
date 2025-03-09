
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

  // Generate portfolio data points from transactions with improved accuracy
  const getPortfolioChartData = useCallback(() => {
    console.log("Generating portfolio chart data from", transactions.length, "transactions");
    
    // If there are no transactions, return some initial data
    if (transactions.length === 0) {
      const initialData: PortfolioDataPoint[] = [];
      const now = new Date();
      
      // Generate data for the last 30 days
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        initialData.push({
          name: date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
          value: 0,
          timestamp: new Date(date)
        });
      }
      
      return initialData;
    }

    // Sort transactions by date
    const sortedTransactions = [...transactions]
      .filter(tx => tx.status === 'completed')
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    if (sortedTransactions.length === 0) {
      // If all transactions are pending/failed, return empty data
      const initialData: PortfolioDataPoint[] = [];
      const now = new Date();
      
      for (let i = 7; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        initialData.push({
          name: date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
          value: 0,
          timestamp: new Date(date)
        });
      }
      
      return initialData;
    }
    
    // Get the first transaction date and current date
    const firstDate = new Date(sortedTransactions[0].timestamp);
    firstDate.setDate(firstDate.getDate() - 1); // Start from day before first transaction
    
    const lastDate = new Date(); // Current date
    
    const dataPoints: PortfolioDataPoint[] = [];
    let runningTotal = 0;
    
    // Process all transactions chronologically to calculate running total at each day
    const currentDate = new Date(firstDate);
    const processedTxIds = new Set<string>();
    
    while (currentDate <= lastDate) {
      const dayStart = new Date(currentDate);
      dayStart.setHours(0, 0, 0, 0);
      
      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999);
      
      // Process all transactions that occurred on or before this day
      sortedTransactions.forEach(tx => {
        const txDate = new Date(tx.timestamp);
        
        // If transaction happened on or before this day and hasn't been processed yet
        if (txDate <= dayEnd && !processedTxIds.has(tx.id)) {
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
          
          processedTxIds.add(tx.id);
        }
      });
      
      // Add data point for this day
      dataPoints.push({
        name: currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
        value: Math.max(0, runningTotal), // Ensure not negative
        timestamp: new Date(currentDate)
      });
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
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
