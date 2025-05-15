import { MainLayout } from "@/components/layout/main-layout";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ProfitChart } from "@/components/dashboard/profit-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockProducts, mockCurrentUser } from "@/types"; // Assuming mockCurrentUser for role check
import { DollarSign, Package, TrendingUp, AlertTriangle, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const lowStockItems = mockProducts.filter(
    (product) => product.quantity < (product.lowStockThreshold || 10)
  );

  // Placeholder data for metrics
  const totalCash = 12530.75;
  const stockValue = mockProducts.reduce((acc, p) => acc + (p.cost * p.quantity), 0);
  const dailyProfit = 475.20;
  const weeklyProfit = 2890.50;

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Cash" value={`$${totalCash.toLocaleString()}`} icon={DollarSign} description="Current cash on hand" />
          <MetricCard title="Stock Value" value={`$${stockValue.toLocaleString()}`} icon={Package} description="Total cost value of inventory" />
          <MetricCard title="Daily Profit" value={`$${dailyProfit.toLocaleString()}`} icon={TrendingUp} description="Profit made today" accent="positive" />
          <MetricCard title="Weekly Profit" value={`$${weeklyProfit.toLocaleString()}`} icon={TrendingUp} description="Profit made this week" accent="positive" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Last 7 days sales trend (Placeholder)</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfitChart />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                Low Stock Items
              </CardTitle>
              <CardDescription>Products needing attention.</CardDescription>
            </CardHeader>
            <CardContent>
              {lowStockItems.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStockItems.slice(0, 5).map((product) => ( // Show top 5
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="destructive">{product.quantity}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">No items are currently low on stock. Great job!</p>
              )}
              {mockCurrentUser.role === 'admin' && (
                 <Button asChild variant="link" className="mt-4 p-0 h-auto">
                    <Link href="/products">Manage All Products</Link>
                 </Button>
              )}
            </CardContent>
          </Card>
        </div>
        
        {mockCurrentUser.role === 'admin' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Admin Actions
              </CardTitle>
              <CardDescription>Quick access to administrative tasks.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Button asChild size="lg" className="w-full">
                <Link href="/products">Manage Products</Link>
              </Button>
              <Button asChild size="lg" className="w-full">
                <Link href="/sales">Record New Sale</Link>
              </Button>
              <Button disabled size="lg" className="w-full">Manage Users (Coming Soon)</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
