import { redirect } from 'next/navigation';

export default function ServicesRedirect() {
  // Redirect legacy /services to the marketing landing
  redirect('/');
}
