
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bitcoin, Zap, TrendingUp, CircuitBoard } from 'lucide-react';

const MarketOverviewCard: React.FC = () => {
  return (
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
  );
};

export default MarketOverviewCard;
