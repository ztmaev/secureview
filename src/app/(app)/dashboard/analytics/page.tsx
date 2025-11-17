import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AnalyticsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect analytics route to dashboard (analytics removed)
    router.replace('/dashboard');
  }, [router]);

  return null;
}
