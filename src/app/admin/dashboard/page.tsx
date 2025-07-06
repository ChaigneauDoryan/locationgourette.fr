import { createClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import LogoutButton from './logout-button';
import AdminTabs from '@/components/admin/AdminTabs';

export default async function AdminDashboard() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.log('User not found, redirecting to login');
    redirect('/admin/login');
  }

  console.log('User found:', user.email);

  const { data: profile, error } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();

  if (error) {
    console.error('Error fetching profile:', error);
    redirect('/admin/login');
  }

  if (!profile) {
    console.log('Profile not found for user', user.id, ', redirecting to login');
    redirect('/admin/login');
  }

  if (!profile.is_admin) {
    console.log('User is not an admin, redirecting to login');
    redirect('/admin/login');
  }

  console.log('User is admin, profile:', profile);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord Administrateur</h1>
        <p className="mb-4">Bienvenue, {user.email}!</p>
        <LogoutButton />
        <AdminTabs />
      </div>
    </div>
  );
}