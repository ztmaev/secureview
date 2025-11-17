import { redirect } from 'next/navigation';

export default function ProfilePage() {
  // Redirect to dashboard which now contains all the profile content
  redirect('/dashboard');
}
