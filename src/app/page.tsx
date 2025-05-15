import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
      <div className="text-center space-y-6 bg-card p-10 rounded-xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <Icons.StockPilotLogo className="h-16 w-16" />
        </div>
        <h1 className="text-5xl font-bold text-primary">Welcome to StockPilot</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Your simple solution for market management. Track inventory, log sales, and control your finances with ease.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
          <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-lg transition-shadow">
            <Link href="/dashboard">Go to Dashboard (Demo)</Link>
          </Button>
        </div>
         <p className="text-sm text-muted-foreground pt-4">
          New user? <Link href="/register" className="text-primary hover:underline">Register here</Link>.
        </p>
      </div>
    </div>
  );
}
