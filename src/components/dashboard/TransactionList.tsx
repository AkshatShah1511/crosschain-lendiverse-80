
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  ArrowDown, 
  ArrowUp, 
  HandCoins, 
  Send,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTransactions, Transaction } from '@/contexts/TransactionContext';
import { Badge } from '@/components/ui/badge';

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'deposit':
      return <ArrowUp className="h-4 w-4 text-green-500" />;
    case 'withdraw':
      return <ArrowDown className="h-4 w-4 text-amber-500" />;
    case 'lend':
      return <HandCoins className="h-4 w-4 text-blue-500" />;
    case 'borrow':
      return <Send className="h-4 w-4 text-purple-500" />;
    case 'repay':
      return <ArrowUp className="h-4 w-4 text-indigo-500" />;
    default:
      return <ArrowUp className="h-4 w-4 text-green-500" />;
  }
};

const getTransactionColor = (type: string) => {
  switch (type) {
    case 'deposit':
      return 'text-green-500';
    case 'withdraw':
      return 'text-amber-500';
    case 'lend':
      return 'text-blue-500';
    case 'borrow':
      return 'text-purple-500';
    case 'repay':
      return 'text-indigo-500';
    default:
      return 'text-green-500';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>;
    case 'pending':
      return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending</Badge>;
    case 'failed':
      return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Failed</Badge>;
    default:
      return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>;
  }
};

const TransactionList: React.FC = () => {
  const { getRecentTransactions } = useTransactions();
  const recentTransactions = getRecentTransactions(10);

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  if (recentTransactions.length === 0) {
    return (
      <Card className="mt-8 dark:bg-lending-card/70 backdrop-blur-sm border dark:border-lending-border light:border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl">Recent Transactions</CardTitle>
          <CardDescription>No transactions yet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-16 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full dark:bg-lending-primary/20 light:bg-indigo-100 flex items-center justify-center mb-4">
              <ExternalLink className="h-8 w-8 dark:text-lending-primary light:text-indigo-500" />
            </div>
            <p className="text-muted-foreground text-center">No transactions found. Start by depositing, lending, or borrowing assets.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8 dark:bg-lending-card/70 backdrop-blur-sm border dark:border-lending-border light:border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl">Recent Transactions</CardTitle>
        <CardDescription>Your latest activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((tx: Transaction) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center dark:bg-lending-card light:bg-gray-100">
                        {getTransactionIcon(tx.type)}
                      </div>
                      <span className="font-medium capitalize">{tx.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className={`font-medium ${getTransactionColor(tx.type)}`}>
                    {tx.type === 'withdraw' || tx.type === 'borrow' ? '-' : '+'}{tx.amount.toFixed(4)}
                  </TableCell>
                  <TableCell>{tx.asset}</TableCell>
                  <TableCell>{formatTimestamp(tx.timestamp)}</TableCell>
                  <TableCell>{getStatusBadge(tx.status)}</TableCell>
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
      </CardContent>
    </Card>
  );
};

export default TransactionList;
