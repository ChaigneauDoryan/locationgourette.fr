import { redirect } from 'next/navigation';
import { createClient as createServerClient } from '@/lib/supabaseServer';
import UsefulAddressesClientPage from './UsefulAddressesClientPage';
import { getUsefulAddressesServer, addUsefulAddressServer, updateUsefulAddressServer, deleteUsefulAddressServer, updateAddressesOrderServer } from './actions';

export default async function UsefulAddressesServerPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const { data: profile, error: profileError } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();

  if (profileError || !profile || !profile.is_admin) {
    redirect('/admin/login');
  }

  const initialAddresses = await getUsefulAddressesServer();

  return (
    <UsefulAddressesClientPage
      initialAddresses={initialAddresses}
      addUsefulAddress={addUsefulAddressServer}
      updateUsefulAddress={updateUsefulAddressServer}
      deleteUsefulAddress={deleteUsefulAddressServer}
      updateAddressesOrder={updateAddressesOrderServer}
    />
  );
}