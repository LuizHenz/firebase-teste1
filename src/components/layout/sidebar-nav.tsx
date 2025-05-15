"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import type { User } from '@/types'; // Assuming mockCurrentUser is for demo

interface SidebarNavProps {
  currentUser?: User; // In a real app, this would come from auth context
}

export function SidebarNav({ currentUser }: SidebarNavProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ['admin', 'employee'] },
    { href: "/products", label: "Products", icon: Package, roles: ['admin'] },
    { href: "/sales", label: "Sales", icon: ShoppingCart, roles: ['admin', 'employee'] },
    // Example of another admin-only link
    // { href: "/users", label: "Manage Users", icon: Users, roles: ['admin'] },
  ];

  const userCanView = (itemRoles: string[]) => {
    if (!currentUser) return false; // Or true if public pages are in sidebar
    return itemRoles.includes(currentUser.role);
  };

  return (
    <SidebarMenu>
      {navItems.map((item) =>
        userCanView(item.roles) ? (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard")}
              tooltip={item.label}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : null
      )}
    </SidebarMenu>
  );
}
