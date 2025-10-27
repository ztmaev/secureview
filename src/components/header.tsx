'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { usePathname } from 'next/navigation';

function getPageTitle(pathname: string): string {
    switch (pathname) {
        case '/dashboard':
            return 'Dashboard';
        case '/profile':
            return 'Profile';
        case '/upload':
            return 'Content Manager';
        case '/projects':
            return 'Projects';
        case '/proposals':
            return 'Proposals';
        default:
            return 'SecureView';
    }
}

export default function Header() {
    const pathname = usePathname();
    const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
      <h1 className="font-headline text-lg font-semibold md:text-2xl">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  );
}
