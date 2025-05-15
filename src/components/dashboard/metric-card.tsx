import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  accent?: 'positive' | 'negative' | 'neutral';
}

export function MetricCard({ title, value, icon: Icon, description, accent = 'neutral' }: MetricCardProps) {
  const accentColorClass = 
    accent === 'positive' ? 'text-green-600 dark:text-green-400' :
    accent === 'negative' ? 'text-red-600 dark:text-red-400' :
    'text-primary';

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-5 w-5", accentColorClass)} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-3xl font-bold", accentColorClass)}>{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}
