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

console.log('ADMIN_UID value:', ADMIN_UID);
console.log('Type of ADMIN_UID:', typeof ADMIN_UID); 

// Navigation links - admin only links are restricted to the specified UID
const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2, adminOnly: true },
  { href: '/dashboard/upload', label: 'Content Manager', icon: Upload, adminOnly: true },
  { href: '/dashboard/timeline', label: 'Timeline', icon: GanttChartSquare, adminOnly: false },
  { href: '/dashboard/pricing', label: 'Pricing', icon: CreditCard, adminOnly: false },
  { href: '/dashboard/profile', label: 'Profile', icon: LayoutDashboard, adminOnly: false },
];

// Creation links - admin only
const creationLinks = [
  { href: '/dashboard/projects', label: 'New Project', icon: Briefcase, adminOnly: true },
  { href: '/dashboard/proposals', label: 'New Proposal', icon: FileText, adminOnly: true },
];

export default function MainNav() {
  const pathname = usePathname();
  
  // GET USER AND CHECK ADMIN ROLE
  const { user } = useUser();
  const isAdmin = user && user.uid === ADMIN_UID;
  
  // Test if code is running
  if (typeof window !== 'undefined') {
    (window as any).RBAC_DEBUG = {
      ADMIN_UID,
      userUid: user?.uid,
      isAdmin,
      timestamp: new Date().toISOString()
    };
  }

  return (
    <>
      <SidebarHeader className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Logo className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-headline text-xl font-bold group-data-[collapsible=icon]:hidden">
            SecureView
            {/* Debug indicator */}
            {ADMIN_UID === undefined && <span className="text-xs text-red-500 ml-2">(ENV VAR MISSING)</span>}
          </h1>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="flex-grow px-3 py-4">
        {/* Debug info - TEMPORARY FOR TESTING */}
        <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-xs border border-yellow-400">
          <p className="font-bold">⚙️ Debug:</p>
          <p>Admin UID: {ADMIN_UID || '❌ NOT SET'}</p>
          <p>Your UID: {user?.uid?.substring(0, 8)}...</p>
          <p>Is Admin: {isAdmin ? '✅ YES' : '❌ NO'}</p>
        </div>
        
        <SidebarMenu className="space-y-1">
          {/* Filter links: Show public links to everyone, admin links only to admin */}
          {links
            .filter(link => !link.adminOnly || isAdmin) 
            .map(link => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href}>
                <SidebarMenuButton
                  isActive={pathname === link.href || pathname.startsWith(link.href + '/')}
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
        
        {/* Show 'Create' section only to admin users */}
        {isAdmin && (
          <div className="space-y-1">
            <p className="px-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3 group-data-[collapsible=icon]:hidden">
              Create
            </p>
            <SidebarMenu className="space-y-1">
              {/* Creation links - only visible to admins */}
              {creationLinks.map(link => (
                  <SidebarMenuItem key={link.href}>
                    <Link href={link.href}>
                      <SidebarMenuButton
                        isActive={pathname === link.href || pathname.startsWith(link.href + '/')}
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