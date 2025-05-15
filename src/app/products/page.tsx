"use client"; // Required for useState, useEffect, and event handlers

import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { ProductFormDialog } from "@/components/products/product-form-dialog";
import { ProductDataTable } from "@/components/products/product-data-table";
import { productColumns } from "@/components/products/product-columns";
import type { Product } from "@/types";
import { mockProducts as initialMockProducts, mockCurrentUser } from "@/types"; // Assuming mockCurrentUser for role check
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialMockProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const router = useRouter();

  // Mock admin check
  useEffect(() => {
    if (mockCurrentUser?.role !== 'admin') {
      // router.push('/dashboard'); // Redirect if not admin
      // For demo purposes, we'll allow access but could show a message or disable actions
      console.warn("Accessing Products page without admin role (demo mode).");
    }
  }, [router]);

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    // Here you would also call an API to delete the product from the database
  };

  const handleFormSubmit = (productData: Omit<Product, 'id'> & { id?: string }) => {
    if (productData.id) { // Editing existing product
      setProducts(prevProducts => 
        prevProducts.map(p => p.id === productData.id ? { ...p, ...productData } as Product : p)
      );
    } else { // Adding new product
      const newProduct: Product = { 
        ...productData, 
        id: `prod-${Date.now()}`, // Simple unique ID for demo
        lowStockThreshold: productData.lowStockThreshold || 10 // Default if not set
      };
      setProducts(prevProducts => [...prevProducts, newProduct]);
    }
    // API call to save/update product in DB would go here
  };

  // For demo, ensure role check doesn't break the page load if currentUser is undefined initially
  if (mockCurrentUser?.role !== 'admin') {
     return (
      <MainLayout>
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You do not have permission to view this page. Please contact an administrator.</p>
            <Button onClick={() => router.push('/dashboard')} className="mt-4">Go to Dashboard</Button>
          </CardContent>
        </Card>
      </MainLayout>
     );
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Products</CardTitle>
              <CardDescription>Add, edit, or remove products from your inventory.</CardDescription>
            </div>
            <Button onClick={handleAddProduct} className="whitespace-nowrap">
              <PlusCircle className="mr-2 h-5 w-5" /> Add Product
            </Button>
          </CardHeader>
          <CardContent>
            <ProductDataTable 
              columns={productColumns({ onEdit: handleEditProduct, onDelete: handleDeleteProduct })} 
              data={products} 
            />
          </CardContent>
        </Card>
      </div>
      <ProductFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        product={editingProduct}
      />
    </MainLayout>
  );
}
