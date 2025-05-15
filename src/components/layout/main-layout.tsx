import type React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import { UserNav } from "./user-nav";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { mockCurrentUser } from '@/types'; // For demo purposes

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  // In a real app, currentUser would come from an auth context/hook
  const currentUser = mockCurrentUser; 

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="p-4 flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Icons.StockPilotLogo className="h-8 w-8" />
            <h1 className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              StockPilot
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav currentUser={currentUser} />
        </SidebarContent>
        <SidebarFooter className="p-2">
          {/* Optional: Footer content like app version or quick links */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-auto sm:bg-transparent sm:px-6 sm:backdrop-blur-none">
          <div className="flex items-center gap-2 sm:hidden">
             <SidebarTrigger />
             <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Icons.StockPilotLogo className="h-6 w-6" />
                <span>StockPilot</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <UserNav user={currentUser} />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
        <footer className="border-t p-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} StockPilot. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
