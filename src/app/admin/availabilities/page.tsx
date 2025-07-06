import { createClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';

export default async function AvailabilitiesPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const { data: profile, error: profileError } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();

  if (profileError || !profile || !profile.is_admin) {
    redirect('/admin/login'); // Or redirect to a non-admin page
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Gérer les disponibilités</h1>
        <p>Contenu de la gestion des disponibilités...</p>
        {/* Calendrier ou formulaire pour gérer les disponibilités */}
      </div>
    </div>
  );
}
