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
import { BarChart2, User, Upload, Settings, LifeBuoy, Briefcase, FileText, GanttChartSquare, CreditCard } from 'lucide-react';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: User },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/upload', label: 'Content Manager', icon: Upload },
  { href: '/timeline', label: 'Timeline', icon: GanttChartSquare },
  { href: '/pricing', label: 'Pricing', icon: CreditCard },
];

const creationLinks = [
  { href: '/projects', label: 'New Project', icon: Briefcase },
  { href: '/proposals', label: 'New Proposal', icon: FileText },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
            <Logo className="size-8 text-primary" />
            <h1 className="font-headline text-xl font-bold">SecureView</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
          {links.map(link => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href}>
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  tooltip={link.label}
                >
                  <div>
                    <link.icon className="size-5" />
                    <span>{link.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
            <p className="px-4 text-xs text-muted-foreground font-semibold uppercase mb-2 group-data-[collapsible=icon]:hidden">Create</p>
          {creationLinks.map(link => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href}>
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  tooltip={link.label}
                >
                  <div>
                    <link.icon className="size-5" />
                    <span>{link.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <Settings className="size-5" />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <LifeBuoy className="size-5" />
                    <span>Help</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
