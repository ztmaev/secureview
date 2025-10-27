import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/header';
import MainNav from '@/components/main-nav';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <Sidebar variant="sidebar" collapsible="icon">
          <MainNav />
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="p-4 sm:p-6 lg:p-8 bg-background flex-1">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
