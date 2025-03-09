
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
      .filter(tx => (tx.type === 'deposit' || tx.type === 'lend') && tx.status === 'completed')
      .reduce((total, tx) => total + tx.amount, 0);
  };

  const getTotalBorrowed = () => {
    return transactions
      .filter(tx => tx.type === 'borrow' && tx.status === 'completed')
      .reduce((total, tx) => total + tx.amount, 0);
  };

  const getTotalWithdrawn = () => {
    return transactions
      .filter(tx => tx.type === 'withdraw' && tx.status === 'completed')
      .reduce((total, tx) => total + tx.amount, 0);
  };

  const getTotalRepaid = () => {
    return transactions
      .filter(tx => tx.type === 'repay' && tx.status === 'completed')
      .reduce((total, tx) => total + tx.amount, 0);
  };

  const getNetPortfolioValue = () => {
    const deposited = getTotalDeposited();
    const withdrawn = getTotalWithdrawn();
    const borrowed = getTotalBorrowed();
    const repaid = getTotalRepaid();
    
    // Net portfolio = (deposited - withdrawn) + (borrowed - repaid)
    return (deposited - withdrawn) + (borrowed - repaid);
  };

  const getRecentTransactions = (limit = 5) => {
    return [...transactions]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  };

  // Generate portfolio data points from transactions with improved accuracy
  const getPortfolioChartData = () => {
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
    
    // Get the first and last date
    const firstDate = new Date(sortedTransactions[0].timestamp);
    firstDate.setDate(firstDate.getDate() - 1); // Start from one day before the first transaction
    
    const lastDate = new Date();
    
    const dataPoints: PortfolioDataPoint[] = [];
    
    // Initialize a running total
    let runningTotal = 0;
    const processedTxIds = new Set<string>(); // Track processed transactions
    
    // Fill in data for every day between first and last date
    const currentDate = new Date(firstDate);
    while (currentDate <= lastDate) {
      const dateString = currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
      
      // Process all transactions that occurred on or before this date
      for (const tx of sortedTransactions) {
        const txDate = new Date(tx.timestamp);
        // Check if transaction is on or before current date and hasn't been processed
        if (txDate <= currentDate && !processedTxIds.has(tx.id)) {
          // Add to running total based on transaction type
          switch (tx.type) {
            case 'deposit':
            case 'lend':
              runningTotal += tx.amount;
              break;
            case 'withdraw':
              runningTotal -= tx.amount;
              break;
            case 'borrow':
              runningTotal += tx.amount;
              break;
            case 'repay':
              runningTotal -= tx.amount;
              break;
          }
          processedTxIds.add(tx.id); // Mark as processed
        }
      }
      
      // Add data point for this day
      dataPoints.push({
        name: dateString,
        value: Math.max(runningTotal, 0), // Ensure we don't show negative values
        timestamp: new Date(currentDate)
      });
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dataPoints;
  };

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
