import { redirect } from 'next/navigation';

export default function ProfilePage() {
  // This page is no longer used and redirects to the dashboard.
  // The content was moved to the dashboard page.
  redirect('/dashboard');
}
