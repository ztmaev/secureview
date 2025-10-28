'use client';

import { FirebaseClientProvider } from '@/firebase/client-provider';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        {children}
      </div>
    </FirebaseClientProvider>
  );
}
