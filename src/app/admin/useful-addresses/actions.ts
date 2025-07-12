// src/app/admin/useful-addresses/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { createClient as createServerClient } from '@/lib/supabaseServer';

// Define the type for a Useful Address
interface UsefulAddress {
  id: string;
  name: string;
  description: string | null;
  url: string | null;
  position: number;
  icon_name: string | null; // Nouvelle colonne pour le nom de l'icône
}

export async function getUsefulAddressesServer(): Promise<UsefulAddress[]> {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('User not authenticated for getUsefulAddressesServer');
    return [];
  }

  const { data: profile, error: profileError } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();

  if (profileError || !profile || !profile.is_admin) {
    console.error('User is not an admin for getUsefulAddressesServer');
    return [];
  }

  const { data, error } = await supabase
    .from('useful_addresses')
    .select('*')
    .order('position', { ascending: true });

  if (error) {
    console.error('Error fetching useful addresses:', error);
    return [];
  }
  return data as UsefulAddress[];
}

export async function addUsefulAddressServer(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('User not authenticated for addUsefulAddressServer');
    return { success: false, error: 'User not authenticated' };
  }

  const { data: profile, error: profileError } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();

  if (profileError || !profile || !profile.is_admin) {
    console.error('User is not an admin for addUsefulAddressServer');
    return { success: false, error: 'User is not an admin' };
  }

  const name = formData.get('name') as string;
  const description = (formData.get('description') as string)?.trim() || null;
  const url = (formData.get('url') as string)?.trim() || null;
  const icon_name = (formData.get('icon_name') as string)?.trim() || null; // Récupérer le nom de l'icône

  const { data: maxPosData } = await supabase
    .from('useful_addresses')
    .select('position')
    .order('position', { ascending: false })
    .limit(1)
    .single();

  const newPosition = maxPosData ? maxPosData.position + 1 : 0;

  const { error } = await supabase.from('useful_addresses').insert({
    name,
    description,
    url,
    position: newPosition,
    icon_name, // Ajouter le nom de l'icône
  });

  if (error) {
    console.error('Error adding useful address:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/useful-addresses');
  return { success: true };
}

export async function updateUsefulAddressServer(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { data: { user } = {} } = await supabase.auth.getUser();

  if (!user) {
    console.error('User not authenticated for updateUsefulAddressServer');
    return { success: false, error: 'User not authenticated' };
  }

  const { data: profile, error: profileError } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();

  if (profileError || !profile || !profile.is_admin) {
    console.error('User is not an admin for updateUsefulAddressServer');
    return { success: false, error: 'User is not an admin' };
  }

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const description = (formData.get('description') as string)?.trim() || null;
  const url = (formData.get('url') as string)?.trim() || null;
  const icon_name = (formData.get('icon_name') as string)?.trim() || null; // Récupérer le nom de l'icône

  const { error } = await supabase.from('useful_addresses').update({
    name,
    description,
    url,
    icon_name, // Mettre à jour le nom de l'icône
  }).eq('id', id);

  if (error) {
    console.error('Error updating useful address:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/useful-addresses');
  return { success: true };
}

export async function deleteUsefulAddressServer(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { data: { user } = {} } = await supabase.auth.getUser();

  if (!user) {
    console.error('User not authenticated for deleteUsefulAddressServer');
    return { success: false, error: 'User not authenticated' };
  }

  const { data: profile, error: profileError } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();

  if (profileError || !profile || !profile.is_admin) {
    console.error('User is not an admin for deleteUsefulAddressServer');
    return { success: false, error: 'User is not an admin' };
  }

  const { error } = await supabase.from('useful_addresses').delete().eq('id', id);

  if (error) {
    console.error('Error deleting useful address:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/useful-addresses');
  return { success: true };
}

export async function updateAddressesOrderServer(orderedAddresses: UsefulAddress[]): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('User not authenticated for updateAddressesOrderServer');
    return { success: false, error: 'User not authenticated' };
  }

  const { data: profile, error: profileError } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();

  if (profileError || !profile || !profile.is_admin) {
    console.error('User is not an admin for updateAddressesOrderServer');
    return { success: false, error: 'User is not an admin' };
  }

  const updates = orderedAddresses.map((address, index) => ({
    id: address.id,
    name: address.name,
    description: address.description,
    url: address.url,
    position: index,
    icon_name: address.icon_name, // Inclure le nom de l'icône
  }));

  const { error } = await supabase.from('useful_addresses').upsert(updates, { onConflict: 'id' });

  if (error) {
    console.error('Error updating addresses order:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/useful-addresses');
  return { success: true };
}
