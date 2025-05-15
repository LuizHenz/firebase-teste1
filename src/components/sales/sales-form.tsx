"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import type { Product, SaleItem } from "@/types";
import { mockProducts, mockCurrentUser } from "@/types";
import { PlusCircle, Trash2, ShoppingCart } from 'lucide-react';

const saleItemSchema = z.object({
  productId: z.string().min(1, "Product is required."),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1."),
  // priceAtSale and costAtSale will be populated when product is selected
});

const salesFormSchema = z.object({
  items: z.array(saleItemSchema).min(1, "At least one item is required for a sale."),
});

type SalesFormValues = z.infer<typeof salesFormSchema>;

export function SalesForm() {
  const { toast } = useToast();
  const [availableProducts, setAvailableProducts] = useState<Product[]>(mockProducts); // In real app, fetch from API

  const form = useForm<SalesFormValues>({
    resolver: zodResolver(salesFormSchema),
    defaultValues: {
      items: [{ productId: "", quantity: 1 }],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const currentSaleItems = form.watch("items");

  const enrichedSaleItems = useMemo(() => {
    return currentSaleItems.map(item => {
      const product = availableProducts.find(p => p.id === item.productId);
      return {
        ...item,
        productName: product?.name || "N/A",
        priceAtSale: product?.price || 0,
        costAtSale: product?.cost || 0,
        lineTotal: product ? product.price * item.quantity : 0,
        lineProfit: product ? (product.price - product.cost) * item.quantity : 0,
      };
    });
  }, [currentSaleItems, availableProducts]);

  const saleTotals = useMemo(() => {
    return enrichedSaleItems.reduce(
      (acc, item) => {
        acc.totalAmount += item.lineTotal;
        acc.totalProfit += item.lineProfit;
        return acc;
      },
      { totalAmount: 0, totalProfit: 0 }
    );
  }, [enrichedSaleItems]);


  function onSubmit(values: SalesFormValues) {
    console.log("Sale submitted:", values);
    // In a real app:
    // 1. Validate stock levels
    // 2. Update product quantities in DB
    // 3. Create Sale record in DB
    
    // Update mock product quantities
    const updatedProducts = [...availableProducts];
    values.items.forEach(item => {
      const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
      if (productIndex !== -1) {
        updatedProducts[productIndex].quantity -= item.quantity;
      }
    });
    setAvailableProducts(updatedProducts); // This would be a backend update

    toast({
      title: "Sale Recorded Successfully!",
      description: `Total: $${saleTotals.totalAmount.toFixed(2)}, Profit: $${saleTotals.totalProfit.toFixed(2)}`,
    });
    form.reset({ items: [{ productId: "", quantity: 1 }] }); // Reset form
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          {fields.map((field, index) => {
            const selectedProduct = availableProducts.find(p => p.id === currentSaleItems[index]?.productId);
            return (
            <div key={field.id} className="flex items-end gap-4 p-4 border rounded-md mb-4 relative bg-card/50">
              <FormField
                control={form.control}
                name={`items.${index}.productId`}
                render={({ field: selectField }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Product</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        selectField.onChange(value);
                        const product = availableProducts.find(p => p.id === value);
                        if (product) {
                           // Optional: update price/cost fields if they were part of the form item
                        }
                      }}
                      defaultValue={selectField.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableProducts.filter(p => p.quantity > 0).map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} (Stock: {product.quantity}, Price: ${product.price.toFixed(2)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`items.${index}.quantity`}
                render={({ field: quantityField }) => (
                  <FormItem className="w-24">
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        max={selectedProduct?.quantity ?? 1}
                        placeholder="1" 
                        {...quantityField} 
                       />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="text-destructive hover:bg-destructive/10"
                disabled={fields.length <= 1}
              >
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Remove item</span>
              </Button>
            </div>
          )})}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ productId: "", quantity: 1 })}
            className="mt-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>

        {enrichedSaleItems.length > 0 && enrichedSaleItems[0].productId && (
          <Card className="mt-6 shadow-md">
            <CardHeader>
              <CardTitle>Current Sale Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Line Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrichedSaleItems.map((item, index) => (
                    item.productId && item.productName !== "N/A" ? ( // Only render if product is selected
                    <TableRow key={index}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">${item.priceAtSale.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${item.lineTotal.toFixed(2)}</TableCell>
                    </TableRow>
                    ) : null
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow className="font-semibold text-lg">
                    <TableCell colSpan={3} className="text-right">Total Amount</TableCell>
                    <TableCell className="text-right">${saleTotals.totalAmount.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow className="text-sm text-green-600 dark:text-green-400">
                    <TableCell colSpan={3} className="text-right">Estimated Profit</TableCell>
                    <TableCell className="text-right">${saleTotals.totalProfit.toFixed(2)}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-end pt-6">
          <Button type="submit" size="lg" className="min-w-[200px]" disabled={enrichedSaleItems.length === 0 || !enrichedSaleItems[0].productId}>
            <ShoppingCart className="mr-2 h-5 w-5" /> Complete Sale
          </Button>
        </div>
      </form>
    </Form>
  );
}
