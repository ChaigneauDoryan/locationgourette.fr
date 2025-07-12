import { createClient } from '@/lib/supabaseServer';
import { InventoryCategory, InventoryItem } from '@/app/admin/inventory/page';

export async function getCategories(): Promise<InventoryCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('inventory_categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data as InventoryCategory[];
}

export async function getItems(): Promise<InventoryItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('inventory_items')
    .select('id, name, category_id, quantity, position, created_at')
    .order('position', { ascending: true });

  if (error) {
    console.error('Error fetching items:', error);
    return [];
  }
  return data as InventoryItem[];
}
