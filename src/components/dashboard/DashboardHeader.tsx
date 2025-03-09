
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ArrowUp, 
  ArrowDown, 
  HandCoins, 
  CircuitBoard, 
  ChevronsRight,
  Send
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTransactions, TransactionType } from '@/contexts/TransactionContext';

type ActionType = 'deposit' | 'withdraw' | 'lend' | 'borrow';

interface DashboardHeaderProps {
  walletAddress: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ walletAddress }) => {
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [amount, setAmount] = useState('');
  const [asset, setAsset] = useState('ETH');
  const { addTransaction } = useTransactions();

  const handleActionSubmit = () => {
    if (!activeAction) return;
    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    const parsedAmount = parseFloat(amount);
    
    // Add the transaction
    addTransaction({
      type: activeAction as TransactionType,
      amount: parsedAmount,
      asset,
      address: walletAddress,
      status: 'completed'
    });

    toast({
      title: "Transaction Successful",
      description: `${activeAction.charAt(0).toUpperCase() + activeAction.slice(1)} ${parsedAmount} ${asset} processed`,
    });

    // Reset the form
    setAmount('');
    setActiveAction(null);
  };

  return (
    <div className="w-full mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 cursor-pointer hover:shadow-md transition-all dark:bg-lending-primary/20 dark:hover:bg-lending-primary/30 light:hover:bg-indigo-50 border dark:border-lending-primary/30 light:border-indigo-200">
              <CardContent className="p-2 flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <ArrowUp className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-bold text-lg">Deposit</h3>
                <p className="text-sm text-muted-foreground">Add funds to your account</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">Deposit Funds</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="asset">Select Asset</Label>
                <select 
                  id="asset" 
                  className="w-full p-2 rounded-md border dark:border-lending-border dark:bg-lending-card"
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                >
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="USDC">USD Coin (USDC)</option>
                  <option value="USDT">Tether (USDT)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <Input 
                    id="amount" 
                    className="pr-16" 
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                    {asset}
                  </div>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-lending-primary to-lending-secondary"
                onClick={() => {
                  setActiveAction('deposit');
                  handleActionSubmit();
                }}
              >
                Deposit {amount && asset ? `${amount} ${asset}` : ''}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 cursor-pointer hover:shadow-md transition-all dark:bg-lending-accent/20 dark:hover:bg-lending-accent/30 light:hover:bg-amber-50 border dark:border-lending-accent/30 light:border-amber-200">
              <CardContent className="p-2 flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <ArrowDown className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="font-bold text-lg">Withdraw</h3>
                <p className="text-sm text-muted-foreground">Withdraw your funds</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">Withdraw Funds</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="asset-withdraw">Select Asset</Label>
                <select 
                  id="asset-withdraw" 
                  className="w-full p-2 rounded-md border dark:border-lending-border dark:bg-lending-card"
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                >
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="USDC">USD Coin (USDC)</option>
                  <option value="USDT">Tether (USDT)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount-withdraw">Amount</Label>
                <div className="relative">
                  <Input 
                    id="amount-withdraw" 
                    className="pr-16" 
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                    {asset}
                  </div>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600"
                onClick={() => {
                  setActiveAction('withdraw');
                  handleActionSubmit();
                }}
              >
                Withdraw {amount && asset ? `${amount} ${asset}` : ''}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 cursor-pointer hover:shadow-md transition-all dark:bg-blue-500/20 dark:hover:bg-blue-500/30 light:hover:bg-blue-50 border dark:border-blue-500/30 light:border-blue-200">
              <CardContent className="p-2 flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <HandCoins className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-bold text-lg">Lend</h3>
                <p className="text-sm text-muted-foreground">Lend assets for interest</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">Lend Assets</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="asset-lend">Select Asset</Label>
                <select 
                  id="asset-lend" 
                  className="w-full p-2 rounded-md border dark:border-lending-border dark:bg-lending-card"
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                >
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="USDC">USD Coin (USDC)</option>
                  <option value="USDT">Tether (USDT)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount-lend">Amount</Label>
                <div className="relative">
                  <Input 
                    id="amount-lend" 
                    className="pr-16" 
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                    {asset}
                  </div>
                </div>
              </div>
              <div className="border dark:border-lending-border light:border-gray-200 p-3 rounded-md">
                <p className="text-sm font-medium">Lending Rate:</p>
                <p className="text-lg font-bold text-green-500">3.2% APY</p>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
                onClick={() => {
                  setActiveAction('lend');
                  handleActionSubmit();
                }}
              >
                Lend {amount && asset ? `${amount} ${asset}` : ''}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Card className="p-4 cursor-pointer hover:shadow-md transition-all dark:bg-purple-500/20 dark:hover:bg-purple-500/30 light:hover:bg-purple-50 border dark:border-purple-500/30 light:border-purple-200">
              <CardContent className="p-2 flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Send className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-bold text-lg">Borrow</h3>
                <p className="text-sm text-muted-foreground">Borrow against your assets</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">Borrow Assets</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="asset-borrow">Select Asset</Label>
                <select 
                  id="asset-borrow" 
                  className="w-full p-2 rounded-md border dark:border-lending-border dark:bg-lending-card"
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                >
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="USDC">USD Coin (USDC)</option>
                  <option value="USDT">Tether (USDT)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount-borrow">Amount</Label>
                <div className="relative">
                  <Input 
                    id="amount-borrow" 
                    className="pr-16" 
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                    {asset}
                  </div>
                </div>
              </div>
              <div className="border dark:border-lending-border light:border-gray-200 p-3 rounded-md">
                <p className="text-sm font-medium">Borrowing Rate:</p>
                <p className="text-lg font-bold text-amber-500">5.8% APR</p>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600"
                onClick={() => {
                  setActiveAction('borrow');
                  handleActionSubmit();
                }}
              >
                Borrow {amount && asset ? `${amount} ${asset}` : ''}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DashboardHeader;
