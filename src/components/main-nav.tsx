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
import { LayoutDashboard, Upload, Settings, LifeBuoy, Briefcase, FileText, GanttChartSquare, CreditCard } from 'lucide-react';
import { useUser } from '@/firebase/provider'; 

// Admin UID - this is hardcoded for now since env vars aren't working reliably
// TODO: Replace with your actual admin UID
const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_USER_ID || ''; 

// Navigation links
const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
  { href: '/dashboard/content-manager', label: 'Content Manager', icon: Upload, adminOnly: true },
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