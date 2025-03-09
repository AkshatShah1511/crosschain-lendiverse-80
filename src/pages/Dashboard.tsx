
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ArrowRight, ArrowUp, ArrowDown, CircuitBoard, Bitcoin, Search, Bell, User, ChevronDown, Calendar, TrendingUp, Wallet, ExternalLink, Zap, Plus, BarChart3 } from 'lucide-react';

// Sample data for charts
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

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState('30d');
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Background elements */}
        <div className="fixed inset-0 z-[-2] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lending-primary/5 via-transparent to-transparent opacity-70 pointer-events-none dark:opacity-50 light:opacity-20"></div>
        
        {/* Circuit board background pattern */}
        <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Horizontal lines */}
            <div className="absolute top-[10%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
            <div className="absolute top-[30%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
            <div className="absolute top-[50%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
            <div className="absolute top-[70%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
            <div className="absolute top-[90%] left-0 w-full h-px dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
            
            {/* Vertical lines */}
            <div className="absolute top-0 left-[10%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
            <div className="absolute top-0 left-[30%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
            <div className="absolute top-0 left-[50%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
            <div className="absolute top-0 left-[70%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
            <div className="absolute top-0 left-[90%] w-px h-full dark:bg-lending-primary/5 light:bg-indigo-300/5"></div>
            
            {/* Connection dots */}
            <div className="absolute top-[10%] left-[10%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
            <div className="absolute top-[30%] left-[30%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
            <div className="absolute top-[50%] left-[50%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
            <div className="absolute top-[70%] left-[70%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
            <div className="absolute top-[90%] left-[90%] w-2 h-2 rounded-full dark:bg-lending-primary/5 light:bg-indigo-300/10"></div>
          </div>
        </div>
        
        {/* Dashboard header section */}
        <header className="py-4 px-6 border-b dark:border-lending-border light:border-gray-200">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-8">
                <div className="flex items-center">
                  <CircuitBoard className="h-8 w-8 text-lending-primary mr-2" />
                  <span className="text-xl font-bold text-foreground">LenDiverse.ai</span>
                </div>
                <nav className="hidden md:flex space-x-6">
                  <a href="/dashboard" className="px-1 py-2 text-foreground font-medium border-b-2 border-lending-primary">Dashboard</a>
                  <a href="/" className="px-1 py-2 text-muted-foreground hover:text-foreground transition-colors">My Portfolio</a>
                  <a href="/" className="px-1 py-2 text-muted-foreground hover:text-foreground transition-colors">Saved</a>
                  <a href="/" className="px-1 py-2 text-muted-foreground hover:text-foreground transition-colors">Lists</a>
                </nav>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input 
                    type="search" 
                    placeholder="Search assets..." 
                    className="w-64 pl-9 bg-background border-input" 
                  />
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg dark:bg-lending-primary/20 light:bg-indigo-100 border dark:border-lending-primary/30 light:border-indigo-300 text-foreground hover:bg-lending-primary/30 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:inline-block">Generate</span>
                </button>
                <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-lending-primary rounded-full"></span>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-lending-secondary flex items-center justify-center text-white font-medium">
                    WS
                  </div>
                  <span className="hidden md:inline-block font-medium">Wilbur Stroman</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="py-8 px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Evaluation Card */}
              <Card className="col-span-1 dark:bg-lending-card/70 backdrop-blur-sm border dark:border-lending-border light:border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Evaluation</CardTitle>
                  <CardDescription>Total assets</CardDescription>
                  <div className="flex items-baseline mt-2">
                    <span className="text-4xl font-bold">$49,825</span>
                    <span className="text-2xl font-bold text-muted-foreground ml-1">.82</span>
                    <div className="ml-4 flex items-center gap-1">
                      <span className="px-2 py-1 text-xs font-medium rounded-md bg-green-500/20 text-green-700 dark:text-green-400">+1.9%</span>
                      <span className="text-sm text-muted-foreground">$747.29</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm">Strong performance</span>
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
                  
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total profit</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xl font-bold text-green-500">+$6,801.19</span>
                      </div>
                      <p className="text-xs text-green-500">+15.81%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. monthly</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xl font-bold text-red-500">-1.34%</span>
                      </div>
                      <p className="text-xs text-red-500">-$523</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Best token</p>
                      <div className="flex items-center gap-1 mt-1">
                        <CircuitBoard className="h-5 w-5 text-lending-primary" />
                        <span className="text-xl font-bold">Cardano</span>
                      </div>
                      <p className="text-xs text-muted-foreground">ADA</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Portfolio score</p>
                      <div className="flex items-center mt-1">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-2">
                          B
                        </div>
                        <span className="text-xl font-bold">69</span>
                        <span className="text-muted-foreground">/100</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Good</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">AIRA</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xl font-bold">74%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Rebalance accuracy</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">PRI</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xl font-bold">0.45</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Resilience index: Risky</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Allocation Card */}
              <Card className="col-span-1 lg:col-span-2 dark:bg-lending-card/70 backdrop-blur-sm border dark:border-lending-border light:border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Allocation</CardTitle>
                  </div>
                  <div className="relative">
                    <Button variant="outline" className="flex items-center gap-2">
                      <span>Last {timeFrame === '30d' ? '30 days' : timeFrame === '7d' ? '7 days' : '24 hours'}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cryptoAssets.map((asset) => (
                      <div 
                        key={asset.id}
                        className="p-4 rounded-xl dark:bg-lending-dark/50 light:bg-white border dark:border-lending-border light:border-gray-200 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              asset.id === 'bitcoin' ? 'bg-amber-500/20' : 
                              asset.id === 'ethereum' ? 'bg-indigo-500/20' :
                              asset.id === 'cardano' ? 'bg-blue-500/20' :
                              asset.id === 'algorand' ? 'bg-green-500/20' :
                              'bg-purple-500/20'
                            }`}>
                              <asset.icon className={`h-5 w-5 ${
                                asset.id === 'bitcoin' ? 'text-amber-500' : 
                                asset.id === 'ethereum' ? 'text-indigo-500' :
                                asset.id === 'cardano' ? 'text-blue-500' :
                                asset.id === 'algorand' ? 'text-green-500' :
                                'text-purple-500'
                              }`} />
                            </div>
                            <div>
                              <p className="font-medium">{asset.name}</p>
                              <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                            </div>
                          </div>
                          {asset.id === 'cardano' || asset.id === 'polkadot' ? (
                            <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                              <ArrowDown className="h-3 w-3 text-red-500" />
                            </div>
                          ) : null}
                        </div>
                        
                        <div className="flex justify-between items-baseline">
                          <p className="text-2xl font-bold">{asset.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                          <p className="text-sm text-muted-foreground">{asset.allocation.toFixed(2)}%</p>
                        </div>
                        
                        <div className="mt-2 text-sm flex justify-between">
                          <span className="text-muted-foreground">${asset.value.toLocaleString()}</span>
                          <span className={asset.positive ? 'text-green-500' : 'text-red-500'}>
                            {asset.positive ? '+' : ''}{asset.change}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Breakdown</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Token</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Allocation</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cryptoAssets.map((asset) => (
                            <TableRow key={asset.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    asset.id === 'bitcoin' ? 'bg-amber-500/20' : 
                                    asset.id === 'ethereum' ? 'bg-indigo-500/20' :
                                    asset.id === 'cardano' ? 'bg-blue-500/20' :
                                    asset.id === 'algorand' ? 'bg-green-500/20' :
                                    'bg-purple-500/20'
                                  }`}>
                                    <asset.icon className={`h-4 w-4 ${
                                      asset.id === 'bitcoin' ? 'text-amber-500' : 
                                      asset.id === 'ethereum' ? 'text-indigo-500' :
                                      asset.id === 'cardano' ? 'text-blue-500' :
                                      asset.id === 'algorand' ? 'text-green-500' :
                                      'text-purple-500'
                                    }`} />
                                  </div>
                                  <div>
                                    <p className="font-medium">{asset.name}</p>
                                    <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{asset.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                              <TableCell>${asset.value.toLocaleString()}</TableCell>
                              <TableCell>
                                <div className="w-20 bg-muted rounded-full h-2">
                                  <div 
                                    className={`h-full rounded-full ${
                                      asset.id === 'bitcoin' ? 'bg-amber-500' : 
                                      asset.id === 'ethereum' ? 'bg-indigo-500' :
                                      asset.id === 'cardano' ? 'bg-blue-500' :
                                      asset.id === 'algorand' ? 'bg-green-500' :
                                      'bg-purple-500'
                                    }`}
                                    style={{ width: `${asset.allocation}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-muted-foreground mt-1">{asset.allocation.toFixed(2)}%</span>
                              </TableCell>
                              <TableCell>${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        {/* Modern scrolling indicator */}
        <div className="fixed bottom-8 right-8 z-50 dark:bg-lending-card/80 light:bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border dark:border-lending-primary/20 light:border-indigo-200 opacity-80 hover:opacity-100 transition-all duration-300 hover-glow">
          <div className="w-1 h-12 dark:bg-lending-dark light:bg-gray-200 rounded-full overflow-hidden">
            <div className="w-full dark:bg-lending-primary light:bg-indigo-500 rounded-full animate-pulse-slow" style={{
              height: `${Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100, 100)}%`,
              transition: 'height 0.3s ease-out'
            }}></div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

// Custom tooltip component for the chart
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

export default Dashboard;
