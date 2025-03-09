
import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import { CustomTooltip } from './CustomTooltip';

// Performance data for the chart
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

const PortfolioCard: React.FC = () => {
  const { getTotalDeposited, getTotalBorrowed } = useTransactions();
  const totalDeposited = getTotalDeposited();
  const totalBorrowed = getTotalBorrowed();

  return (
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
  );
};

export default PortfolioCard;
