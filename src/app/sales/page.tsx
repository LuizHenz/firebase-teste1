import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesForm } from "@/components/sales/sales-form";

export default function SalesPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Record New Sale</CardTitle>
            <CardDescription>Add products to the current transaction and complete the sale.</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesForm />
          </CardContent>
        </Card>

        {/* Optional: Display recent sales history here */}
        {/* 
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>A list of the latest transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Sales history will be displayed here.</p>
          </CardContent>
        </Card>
        */}
      </div>
    </MainLayout>
  );
}
