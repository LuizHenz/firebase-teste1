import type React from 'react';
import { Icons } from '@/components/icons';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <Icons.StockPilotLogo className="h-12 w-12 mb-4" />
          <h1 className="text-3xl font-bold tracking-tight text-primary">{title}</h1>
          {description && <p className="text-muted-foreground mt-2">{description}</p>}
        </div>
        <div className="bg-card p-8 shadow-xl rounded-lg border">
          {children}
        </div>
      </div>
    </div>
  );
}
