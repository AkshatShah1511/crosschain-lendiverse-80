import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ArrowRight, ArrowUp, ArrowDown, CircuitBoard, Bitcoin, Wallet, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import TransactionList from '@/components/dashboard/TransactionList';
import { TransactionProvider, useTransactions } from '@/contexts/TransactionContext';

const performanceData = [
  { name: '10-25', value: 120 },
  { name: '10-26', value: 130 },
  { name: '10-27', value: 110 },
  { name: '10-28', value: 150 },
  { name: '10-29', value: 160 },
  { name: '10-30', value: 145 },
  { name: '11-01', value: 170 },
  { name: '11-02', value: 190 },
  { name: '11-03', value: 180 },
  { name: '11-04', value: 210 },
  { name: '11-05', value: 200 },
  { name: '11-06', value: 195 },
  { name: '11-07', value: 220 },
  { name: '11-08', value: 215 },
  { name: '11-09', value: 230 },
  { name: '11-10', value: 225 },
  { name: '11-11', value: 245 },
  { name: '11-12', value: 240 },
  { name: '11-13', value: 260 },
  { name: '11-14', value: 250 },
  { name: '11-15', value: 270 },
  { name: '11-16', value: 280 },
  { name: '11-17', value: 275 },
  { name: '11-18', value: 290 },
  { name: '11-19', value: 285 },
  { name: '11-20', value: 310 },
];

const cryptoAssets = [
  { 
    id: 'bitcoin', 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    amount: 0.264, 
    value: 9767.63, 
    allocation: 19.62, 
    price: 36998.62,
    change: 1.2,
    positive: true,
    icon: Bitcoin
  },
  { 
    id: 'ethereum', 
    name: 'Ethereum', 
    symbol: 'ETH', 
    amount: 3.05, 
    value: 4124.76, 
    allocation: 12.28, 
    price: 2098.12,
    change: 0.8,
    positive: true,
    icon: Zap
  },
  { 
    id: 'cardano', 
    name: 'Cardano', 
    symbol: 'ADA', 
    amount: 21390, 
    value: 10982.45, 
    allocation: 16.10, 
    price: 0.51,
    change: -1.5,
    positive: false,
    icon: CircuitBoard
  },
  { 
    id: 'algorand', 
    name: 'Algorand', 
    symbol: 'ALGO', 
    amount: 44351, 
    value: 8427.32, 
    allocation: 11.66, 
    price: 0.19,
    change: 2.3,
    positive: true,
    icon: TrendingUp
  },
  { 
    id: 'polkadot', 
    name: 'Polkadot', 
    symbol: 'DOT', 
    amount: 1096, 
    value: 6247.89, 
    allocation: 11.24, 
    price: 5.70,
    change: -0.7,
    positive: false,
    icon: Wallet
  },
];

const DashboardContent = () => {
  const [timeFrame, setTimeFrame] = useState('30d');
  const [walletAddress, setWalletAddress] = useState('');
  const navigate = useNavigate();
  const { getTotalDeposited, getTotalBorrowed } = useTransactions();
  
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

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const totalDeposited = getTotalDeposited();
  const totalBorrowed = getTotalBorrowed();
  
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="fixed inset-0 z-[-2] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lending-primary/5 via-transparent to-transparent opacity-70 pointer-events-none dark:opacity-50 light:opacity-20"></div>
      
      <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-[30%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-[50%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-[70%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-[90%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          
          <div className="absolute top-0 left-[10%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-0 left-[30%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-0 left-[50%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-0 left-[70%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          <div className="absolute top-0 left-[90%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
          
          <div className="absolute top-[10%] left-[10%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
          <div className="absolute top-[30%] left-[30%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
          <div className="absolute top-[50%] left-[50%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
          <div className="absolute top-[70%] left-[70%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
          <div className="absolute top-[90%] left-[90%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
        </div>
      </div>
      
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
      
      <main className="py-8 px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-4">Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage your assets and view your transaction history</p>
          
          <DashboardHeader walletAddress={walletAddress} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="col-span-1 dark:bg-lending-card/70 backdrop-blur-sm border dark:border-lending-border light:border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Portfolio</CardTitle>
                <CardDescription>Total assets</CardDescription>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold">${totalDeposited.toFixed(2)}</span>
                  <div className="ml-4 flex items-center gap-1">
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-green-500/20 text-green-700 dark:text-green-400">+1.9%</span>
                    <span className="text-sm text-muted-foreground">24h</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm">Currently lending</span>
                  <ArrowUp className="h-4 w-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Deposited</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xl font-bold text-green-500">${totalDeposited.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-green-500">+15.81% APY</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Borrowed</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xl font-bold text-amber-500">${totalBorrowed.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-amber-500">5.8% APR</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Health Factor</p>
                    <div className="flex items-center mt-1">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-2">
                        A
                      </div>
                      <span className="text-xl font-bold">1.85</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Safe</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Net APY</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xl font-bold">+8.4%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Effective yield</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2 dark:bg-lending-card/70 backdrop-blur-sm border dark:border-lending-border light:border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl">Market Overview</CardTitle>
                <CardDescription>Latest rates and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl dark:bg-lending-dark/50 light:bg-white border dark:border-lending-border light:border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <Bitcoin className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">Bitcoin</p>
                          <p className="text-xs text-muted-foreground">BTC</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Deposit APY</p>
                    <p className="text-2xl font-bold text-green-500">1.2%</p>
                    <p className="text-sm text-muted-foreground mb-1 mt-3">Borrow APR</p>
                    <p className="text-2xl font-bold text-amber-500">4.5%</p>
                  </div>
                  
                  <div className="p-4 rounded-xl dark:bg-lending-dark/50 light:bg-white border dark:border-lending-border light:border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-indigo-500" />
                        </div>
                        <div>
                          <p className="font-medium">Ethereum</p>
                          <p className="text-xs text-muted-foreground">ETH</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Deposit APY</p>
                    <p className="text-2xl font-bold text-green-500">3.2%</p>
                    <p className="text-sm text-muted-foreground mb-1 mt-3">Borrow APR</p>
                    <p className="text-2xl font-bold text-amber-500">5.8%</p>
                  </div>
                  
                  <div className="p-4 rounded-xl dark:bg-lending-dark/50 light:bg-white border dark:border-lending-border light:border-gray-200 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">USD Coin</p>
                          <p className="text-xs text-muted-foreground">USDC</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Deposit APY</p>
                    <p className="text-2xl font-bold text-green-500">5.4%</p>
                    <p className="text-sm text-muted-foreground mb-1 mt-3">Borrow APR</p>
                    <p className="text-2xl font-bold text-amber-500">7.9%</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-xl dark:bg-lending-primary/10 light:bg-indigo-50 border dark:border-lending-primary/30 light:border-indigo-200">
                  <div className="flex items-center gap-3 mb-2">
                    <CircuitBoard className="h-5 w-5 text-lending-primary" />
                    <p className="font-medium">Asset Recommendations</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Based on your current portfolio and market conditions</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg border dark:border-lending-border light:border-gray-200 dark:bg-lending-dark/50 light:bg-white">
                      <p className="font-medium">Top Deposit</p>
                      <div className="flex items-center mt-2">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <p className="font-bold">USDC</p>
                          <p className="text-xs text-green-500">5.4% APY</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border dark:border-lending-border light:border-gray-200 dark:bg-lending-dark/50 light:bg-white">
                      <p className="font-medium">Top Borrow</p>
                      <div className="flex items-center mt-2">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                          <Bitcoin className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-bold">BTC</p>
                          <p className="text-xs text-amber-500">4.5% APR</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border dark:border-lending-border light:border-gray-200 dark:bg-lending-dark/50 light:bg-white">
                      <p className="font-medium">Opportunity</p>
                      <div className="flex items-center mt-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                          <Zap className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-bold">ETH-USDC</p>
                          <p className="text-xs text-blue-500">8.1% Net APY</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <TransactionList />
        </div>
      </main>
      
      <div className="fixed bottom-8 right-8 z-50 dark:bg-lending-card/80 light:bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border dark:border-lending-primary/20 light:border-indigo-200 opacity-80 hover:opacity-100 transition-all duration-300 hover-glow">
        <div className="w-1 h-12 dark:bg-lending-dark light:bg-gray-200 rounded-full overflow-hidden">
          <div className="w-full dark:bg-lending-primary light:bg-indigo-500 rounded-full animate-pulse-slow" style={{
            height: `${Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100, 100)}%`,
            transition: 'height 0.3s ease-out'
          }}></div>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="text-sm font-medium">{`${payload[0].payload.name}`}</p>
        <p className="text-sm text-lending-primary font-medium">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Dashboard = () => {
  return (
    <ThemeProvider>
      <TransactionProvider>
        <DashboardContent />
      </TransactionProvider>
    </ThemeProvider>
  );
};

export default Dashboard;
