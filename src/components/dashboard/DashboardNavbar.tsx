
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircuitBoard, Wallet } from 'lucide-react';

interface DashboardNavbarProps {
  walletAddress: string;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ walletAddress }) => {
  const navigate = useNavigate();
  
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="py-4 px-6 border-b dark:border-lending-border light:border-gray-200">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <CircuitBoard className="h-8 w-8 text-lending-primary mr-2" />
              <span className="text-xl font-bold text-foreground">LenDiverse.ai</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full dark:bg-lending-card/70 light:bg-white/90 border dark:border-lending-border light:border-gray-200">
              <Wallet className="h-4 w-4 text-lending-primary" />
              <span className="font-medium">{truncateAddress(walletAddress)}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
