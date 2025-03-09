
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, TrendingUp } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import { CustomTooltip } from './CustomTooltip';

const PortfolioCard: React.FC = () => {
  const { getTotalDeposited, getTotalBorrowed, getPortfolioChartData } = useTransactions();
  const [portfolioData, setPortfolioData] = useState(getPortfolioChartData());
  const totalDeposited = getTotalDeposited();
  const totalBorrowed = getTotalBorrowed();
  const totalAssets = totalDeposited;
  
  // Update chart data when transactions change
  useEffect(() => {
    setPortfolioData(getPortfolioChartData());
  }, [getTotalDeposited, getTotalBorrowed, getPortfolioChartData]);
  
  // Calculate percentage change
  const calculatePercentChange = () => {
    if (portfolioData.length < 2) return 0;
    
    const currentValue = portfolioData[portfolioData.length - 1].value;
    const previousValue = portfolioData[portfolioData.length - 2].value;
    
    if (previousValue === 0) return 0;
    return ((currentValue - previousValue) / previousValue) * 100;
  };
  
  const percentChange = calculatePercentChange();

  return (
    <Card className="col-span-1 dark:bg-lending-card/70 backdrop-blur-sm border dark:border-lending-border light:border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl">Portfolio</CardTitle>
        <CardDescription>Total assets</CardDescription>
        <div className="flex items-baseline mt-2">
          <span className="text-4xl font-bold">${totalAssets.toFixed(2)}</span>
          <div className="ml-4 flex items-center gap-1">
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${percentChange >= 0 ? 'bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-red-500/20 text-red-700 dark:text-red-400'}`}>
              {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
            </span>
            <span className="text-sm text-muted-foreground">24h</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm">Currently lending</span>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                stroke="#888888" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <YAxis 
                type="number"
                stroke="#888888"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                width={40}
                tickCount={5}
                domain={[0, 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
                activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }}
                animationDuration={1000}
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
  );
};

export default PortfolioCard;
