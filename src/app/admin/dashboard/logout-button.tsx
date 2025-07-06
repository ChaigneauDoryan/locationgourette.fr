'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // Import the client-side supabase instance

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Déconnexion
    </button>
  );
}
