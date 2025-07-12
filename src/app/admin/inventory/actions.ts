'use server';

import { createClient } from '@/lib/supabaseServer';
import { revalidatePath } from 'next/cache';
import { InventoryCategory, InventoryItem } from './page';

// --- Category Actions ---
export async function addCategory(formData: FormData) {
  const supabase = createClient();
  const name = formData.get('name') as string;

  const { data, error } = await supabase
    .from('inventory_categories')
    .insert({ name })
    .select();

  if (error) {
    console.error('Error adding category:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/inventory');
  return { success: true, category: data[0] as InventoryCategory };
}

export async function updateCategory(formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;

  const { data, error } = await supabase
    .from('inventory_categories')
    .update({ name })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating category:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/inventory');
  return { success: true, category: data[0] as InventoryCategory };
}

export async function deleteCategory(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('inventory_categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting category:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/inventory');
  return { success: true };
}

export async function updateCategoryPositions(categories: { id: string; position: number }[]) {
  const supabase = createClient();

  const updatePromises = categories.map(category =>
    supabase
      .from('inventory_categories')
      .update({ position: category.position })
      .eq('id', category.id)
  );

  const results = await Promise.all(updatePromises);

  const errors = results.filter(result => result.error).map(result => result.error);

  if (errors.length > 0) {
    console.error('Error updating category positions:', errors);
    return { error: errors[0]?.message || 'Multiple errors occurred during category position update.' };
  }

  revalidatePath('/admin/inventory');
  return { success: true };
}

// --- Item Actions ---
export async function addItem(formData: FormData) {
  const supabase = createClient();
  const name = formData.get('name') as string;
  const category_id = formData.get('category_id') as string;
  const quantity = parseInt(formData.get('quantity') as string);
  const position = parseInt(formData.get('position') as string);

  const { data, error } = await supabase
    .from('inventory_items')
    .insert({
      name,
      category_id,
      quantity,
      position,
    })
    .select();

  if (error) {
    console.error('Error adding item:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/inventory');
  return { success: true, item: data[0] as InventoryItem };
}

export async function updateItem(formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const category_id = formData.get('category_id') as string;
  const quantity = parseInt(formData.get('quantity') as string);
  const position = parseInt(formData.get('position') as string);

  const { data, error } = await supabase
    .from('inventory_items')
    .update({
      name,
      category_id,
      quantity,
      position,
    })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating item:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/inventory');
  return { success: true, item: data[0] as InventoryItem };
}

export async function deleteItem(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('inventory_items')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting item:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/inventory');
  return { success: true };
}

export async function updateItemPositions(items: { id: string; position: number }[]) {
  const supabase = createClient();

  const updatePromises = items.map(item =>
    supabase
      .from('inventory_items')
      .update({ position: item.position }) // Only update position
      .eq('id', item.id) // For the specific item ID
  );

  const results = await Promise.all(updatePromises);

  const errors = results.filter(result => result.error).map(result => result.error);

  if (errors.length > 0) {
    console.error('Error updating item positions:', errors);
    return { error: errors[0]?.message || 'Multiple errors occurred during position update.' };
  }

  revalidatePath('/admin/inventory');
  return { success: true };
}
