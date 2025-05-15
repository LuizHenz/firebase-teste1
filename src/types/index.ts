
export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  cost: number;
  quantity: number;
  lowStockThreshold?: number; // Optional: for low stock warnings
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  priceAtSale: number;
  costAtSale: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  totalAmount: number;
  totalProfit: number;
  createdAt: Date;
  userId: string; // ID of the employee/admin who made the sale
}

// Mock current user for demonstration purposes
export const mockCurrentUser: User = {
  id: 'user-1',
  email: 'admin@stockpilot.com',
  name: 'Admin User',
  role: 'admin',
};

// Mock product data
export const mockProducts: Product[] = [
  { id: 'prod-1', name: 'Organic Apples', price: 2.99, cost: 1.50, quantity: 100, lowStockThreshold: 20 },
  { id: 'prod-2', name: 'Whole Wheat Bread', price: 3.49, cost: 1.20, quantity: 50, lowStockThreshold: 10 },
  { id: 'prod-3', name: 'Free-Range Eggs (Dozen)', price: 4.99, cost: 2.50, quantity: 75, lowStockThreshold: 15 },
  { id: 'prod-4', name: 'Almond Milk (1L)', price: 2.79, cost: 1.80, quantity: 15, lowStockThreshold: 10 },
  { id: 'prod-5', name: 'Dark Chocolate Bar', price: 3.99, cost: 2.00, quantity: 60, lowStockThreshold: 5 },
];

// Mock sales data (optional, for dashboard if needed)
export const mockSales: Sale[] = [
  {
    id: 'sale-1',
    items: [
      { productId: 'prod-1', productName: 'Organic Apples', quantity: 2, priceAtSale: 2.99, costAtSale: 1.50 },
      { productId: 'prod-2', productName: 'Whole Wheat Bread', quantity: 1, priceAtSale: 3.49, costAtSale: 1.20 },
    ],
    totalAmount: (2 * 2.99) + 3.49,
    totalProfit: (2 * (2.99 - 1.50)) + (3.49 - 1.20),
    createdAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
    userId: 'user-1',
  },
  {
    id: 'sale-2',
    items: [
      { productId: 'prod-3', productName: 'Free-Range Eggs (Dozen)', quantity: 1, priceAtSale: 4.99, costAtSale: 2.50 },
    ],
    totalAmount: 4.99,
    totalProfit: 4.99 - 2.50,
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    userId: 'user-2', // Assuming another employee
  },
];
