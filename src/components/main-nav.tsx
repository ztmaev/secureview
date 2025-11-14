'use client';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BarChart2, LayoutDashboard, Upload, Settings, LifeBuoy, Briefcase, FileText, GanttChartSquare, CreditCard } from 'lucide-react';
// IMPORT THE USER HOOK: This is needed to check who is logged in
import { useUser } from '@/firebase/provider'; 


// Read the Admin ID from the environment variable (must be added to Vercel!)
const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_USER_ID; 

// 1. ADD: isRestricted property to control visibility
const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, isRestricted: false },
  { href: '/analytics', label: 'Analytics', icon: BarChart2, isRestricted: true },       // Restricted
  { href: '/upload', label: 'Content Manager', icon: Upload, isRestricted: true },      // Restricted
  { href: '/timeline', label: 'Timeline', icon: GanttChartSquare, isRestricted: false },
  { href: '/pricing', label: 'Pricing', icon: CreditCard, isRestricted: false },
];

// 2. ADD: isRestricted property to control visibility
const creationLinks = [
  { href: '/projects', label: 'New Project', icon: Briefcase, isRestricted: true },     // Restricted
  { href: '/proposals', label: 'New Proposal', icon: FileText, isRestricted: true },   // Restricted
];

export default function MainNav() {
  const pathname = usePathname();
  
  // 3. GET USER AND CHECK ADMIN ROLE
  const { user } = useUser();
  const isAdmin = user && user.uid === ADMIN_UID; 

  return (
    <>
      <SidebarHeader className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Logo className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-headline text-xl font-bold group-data-[collapsible=icon]:hidden">
            SecureView
          </h1>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="flex-grow px-3 py-4">
        <SidebarMenu className="space-y-1">
          {/* 4. APPLY FILTER to the main links: Show only public links OR if the user is Admin */}
          {links
            .filter(link => !link.isRestricted || isAdmin) 
            .map(link => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href}>
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  tooltip={link.label}
                  className="group/item"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="h-5 w-5 transition-transform group-hover/item:scale-110" />
                    <span className="font-medium">{link.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <SidebarSeparator className="my-4" />
        
        {/* 5. WRAP the entire 'Create' section in the isAdmin check */}
        {isAdmin && (
          <div className="space-y-1">
            <p className="px-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3 group-data-[collapsible=icon]:hidden">
              Create
            </p>
            <SidebarMenu className="space-y-1">
              {/* 6. APPLY FILTER to the creation links */}
              {creationLinks
                .filter(link => !link.isRestricted || isAdmin) 
                .map(link => (
                  <SidebarMenuItem key={link.href}>
                    <Link href={link.href}>
                      <SidebarMenuButton
                        isActive={pathname === link.href}
                        tooltip={link.label}
                        className="group/item"
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className="h-5 w-5 transition-transform group-hover/item:scale-110" />
                          <span className="font-medium">{link.label}</span>
                        </div>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </div>
        )}
        
      </SidebarContent>
      
      <SidebarSeparator />
      
      <SidebarFooter className="p-3 border-t">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <Link href="/settings">
              <SidebarMenuButton className="group/item" tooltip="Settings">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 transition-transform group-hover/item:rotate-90" />
                  <span className="font-medium">Settings</span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="group/item" tooltip="Help">
              <div className="flex items-center gap-3">
                <LifeBuoy className="h-5 w-5 transition-transform group-hover/item:rotate-12" />
                <span className="font-medium">Help</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}