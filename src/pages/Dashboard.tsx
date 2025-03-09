
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { TransactionProvider, useTransactions } from '@/contexts/TransactionContext';

// Import the new components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import PortfolioCard from '@/components/dashboard/PortfolioCard';
import MarketOverviewCard from '@/components/dashboard/MarketOverviewCard';
import TransactionList from '@/components/dashboard/TransactionList';
import PageBackground from '@/components/dashboard/PageBackground';
import ScrollIndicator from '@/components/dashboard/ScrollIndicator';

const DashboardContent: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
          } else {
            toast({
              title: "Wallet Not Connected",
              description: "Please connect your wallet to access the dashboard.",
              variant: "destructive"
            });
            navigate('/');
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
          navigate('/');
        }
      } else {
        toast({
          title: "Wallet Not Found",
          description: "Please install MetaMask to use this application.",
          variant: "destructive"
        });
        navigate('/');
      }
    };

    checkWalletConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          navigate('/');
        } else {
          setWalletAddress(accounts[0]);
        }
      });
    }

    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, [navigate]);

  if (!walletAddress) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <PageBackground />
      <DashboardNavbar walletAddress={walletAddress} />
      
      <main className="py-8 px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-4">Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage your assets and view your transaction history</p>
          
          <DashboardHeader walletAddress={walletAddress} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <PortfolioCard />
            <MarketOverviewCard />
          </div>
          
          <TransactionList />
        </div>
      </main>
      
      <ScrollIndicator />
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <ThemeProvider>
      <TransactionProvider>
        <DashboardContent />
      </TransactionProvider>
    </ThemeProvider>
  );
};

export default Dashboard;
