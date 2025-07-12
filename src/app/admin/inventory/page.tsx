import { createClient } from '@/lib/supabaseServer';
import InventoryAdminClientPage from '@/components/admin/InventoryAdminClientPage';
import { addCategory, updateCategory, deleteCategory, updateCategoryPositions, addItem, updateItem, deleteItem, updateItemPositions as updateItemPositionsAction } from '@/app/admin/inventory/actions';

export type InventoryCategory = {
  id: string;
  name: string;
  created_at: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  category_id: string;
  quantity: number;
  position: number;
  created_at: string;
};

export default async function InventoryAdminPage() {
  const supabase = await createClient();

  // Fetch categories
  const { data: categories, error: categoriesError } = await supabase
    .from('inventory_categories')
    .select('*')
    .order('name', { ascending: true });

  if (categoriesError) {
    console.error('Error fetching inventory categories:', categoriesError);
    return <div>Error loading inventory categories.</div>;
  }

  // Fetch inventory items
  const { data: items, error: itemsError } = await supabase
    .from('inventory_items')
    .select('*')
    .order('position', { ascending: true });

  if (itemsError) {
    console.error('Error fetching inventory items:', itemsError);
    return <div>Error loading inventory items.</div>;
  }

  return (
    <InventoryAdminClientPage
      initialCategories={categories as InventoryCategory[]}
      initialItems={items as InventoryItem[]}
      updateCategoryPositions={updateCategoryPositions}
      addCategory={addCategory}
      updateCategory={updateCategory}
      deleteCategory={deleteCategory}
      addItem={addItem}
      updateItem={updateItem}
      deleteItem={deleteItem}
      updateItemPositions={updateItemPositionsAction}
    />
  );
}
