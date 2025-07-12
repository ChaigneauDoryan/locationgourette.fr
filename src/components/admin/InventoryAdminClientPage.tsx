'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaBars } from 'react-icons/fa';

import { InventoryCategory, InventoryItem } from '@/app/admin/inventory/page';


// Sortable Item Component for Inventory Items
function SortableInventoryItem({ item, startEditingItem, handleDeleteItem }: {
  item: InventoryItem;
  startEditingItem: (item: InventoryItem) => void;
  handleDeleteItem: (id: string) => Promise<void>;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style}>
      <td className="py-2 px-4 border-b text-center" {...listeners} {...attributes}>
        <FaBars className="cursor-grab inline-block mr-2" />
        {item.name}
      </td>
      <td className="py-2 px-4 border-b text-center">{item.quantity}</td>
      <td className="py-2 px-4 border-b text-center">{item.position}</td>
      <td className="py-2 px-4 border-b text-center">
        <button
          onClick={() => startEditingItem(item)}
          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteItem(item.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

// Sortable Item Component for Inventory Categories
function SortableCategoryItem({ category, startEditingCategory, handleDeleteCategory }: {
  category: InventoryCategory;
  startEditingCategory: (category: InventoryCategory) => void;
  handleDeleteCategory: (id: string) => Promise<void>;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: category.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style}>
      <td className="py-2 px-4 border-b text-center" {...listeners} {...attributes}>
        <FaBars className="cursor-grab inline-block mr-2" />
        {category.name}
      </td>
      <td className="py-2 px-4 border-b text-center">
        <button
          onClick={() => startEditingCategory(category)}
          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteCategory(category.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

interface InventoryAdminClientPageProps {
  initialCategories: InventoryCategory[];
  initialItems: InventoryItem[];
  updateCategoryPositions: (categories: { id: string; position: number }[]) => Promise<{ success: boolean; error?: string }>;
  addCategory: (formData: FormData) => Promise<{ success: boolean; category?: InventoryCategory; error?: string }>;
  updateCategory: (formData: FormData) => Promise<{ success: boolean; category?: InventoryCategory; error?: string }>;
  deleteCategory: (id: string) => Promise<{ success: boolean; error?: string }>;
  addItem: (formData: FormData) => Promise<{ success: boolean; item?: InventoryItem; error?: string }>;
  updateItem: (formData: FormData) => Promise<{ success: boolean; item?: InventoryItem; error?: string }>;
  deleteItem: (id: string) => Promise<{ success: boolean; error?: string }>;
  updateItemPositions: (items: { id: string; position: number; category_id: string }[]) => Promise<{ success: boolean; error?: string }>;
}

export default function InventoryAdminClientPage({
  initialCategories,
  initialItems,
  updateCategoryPositions,
  addCategory,
  updateCategory,
  deleteCategory,
  addItem,
  updateItem,
  deleteItem,
  updateItemPositions,
}: InventoryAdminClientPageProps) {
  const [categories, setCategories] = useState<InventoryCategory[]>(initialCategories);
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<InventoryCategory | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategoryId, setNewItemCategoryId] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemPosition, setNewItemPosition] = useState(0);

  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [editItemName, setEditItemName] = useState('');
  const [editItemCategoryId, setEditItemCategoryId] = useState('');
  const [editItemQuantity, setEditItemQuantity] = useState(1);
  const [editItemPosition, setEditItemPosition] = useState(0);

  const router = useRouter();

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  // --- Category Handlers ---
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newCategoryName);
    const result = await addCategory(formData);
    if (result.success && result.category) {
      setCategories((prev) => [...prev, result.category]);
      setNewCategoryName('');
      setShowAddCategoryForm(false);
    } else if (result.error) {
      alert(result.error);
    }
  };

  const startEditingCategory = (category: InventoryCategory) => {
    setEditingCategory(category);
    setEditCategoryName(category.name);
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    const formData = new FormData();
    formData.append('id', editingCategory.id);
    formData.append('name', editCategoryName);
    const result = await updateCategory(formData);
    if (result.success && result.category) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === result.category?.id ? result.category : cat))
      );
      setEditingCategory(null);
    } else if (result.error) {
      alert(result.error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category? All associated items will also be deleted.')) {
      const result = await deleteCategory(id);
      if (result.success) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        setItems((prev) => prev.filter((item) => item.category_id !== id)); // Also remove associated items
      } else if (result.error) {
        alert(result.error);
      }
    }
  };

  // --- Item Handlers ---
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newItemName);
    formData.append('category_id', newItemCategoryId);
    formData.append('quantity', newItemQuantity.toString());
    formData.append('position', newItemPosition.toString());

    const result = await addItem(formData);
    if (result.success && result.item) {
      setItems((prev) => [...prev, result.item]);
      // Clear form
      setNewItemName('');
      setNewItemCategoryId('');
      setNewItemQuantity(1);
      setNewItemPosition(0);
      setShowAddItemForm(false);
    } else if (result.error) {
      alert(result.error);
    }
  };

  const startEditingItem = (item: InventoryItem) => {
    setEditingItem(item);
    setEditItemName(item.name);
    setEditItemCategoryId(item.category_id);
    setEditItemQuantity(item.quantity);
    setEditItemPosition(item.position);
  };

  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const formData = new FormData();
    formData.append('id', editingItem.id);
    formData.append('name', editItemName);
    formData.append('category_id', editItemCategoryId);
    formData.append('quantity', editItemQuantity.toString());
    formData.append('position', editItemPosition.toString());

    const result = await updateItem(formData);
    if (result.success && result.item) {
      setItems((prev) =>
        prev.map((it) => (it.id === result.item?.id ? result.item : it))
      );
      setEditingItem(null);
    } else if (result.error) {
      alert(result.error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const result = await deleteItem(id);
      if (result.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else if (result.error) {
        alert(result.error);
      }
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      if (active.data.current?.type === 'category') {
        setCategories((prevCategories) => {
          const oldIndex = prevCategories.findIndex((cat) => cat.id === active.id);
          const newIndex = prevCategories.findIndex((cat) => cat.id === over.id);
          const newCategories = arrayMove(prevCategories, oldIndex, newIndex);

          // Prepare data for server update with new positions
          const categoriesToUpdate = newCategories.map((category, index) => ({
            id: category.id,
            position: index,
          }));

          // Call server action to update positions in DB
          updateCategoryPositions(categoriesToUpdate).then(result => {
            if (result.error) {
              alert('Error updating category positions: ' + result.error);
              // Revert to original state if server update fails
              setCategories(initialCategories);
            }
          });

          return newCategories; // Optimistic update
        });
      } else if (active.data.current?.type === 'item') {
        setItems((prevItems) => {
          const newItems = arrayMove(prevItems, prevItems.findIndex((item) => item.id === active.id), prevItems.findIndex((item) => item.id === over.id));

          // Group items by category to update positions within their respective categories
          const updatedItemsByCategory: { [key: string]: InventoryItem[] } = {};
          newItems.forEach((item) => {
            if (!updatedItemsByCategory[item.category_id]) {
              updatedItemsByCategory[item.category_id] = [];
            }
            updatedItemsByCategory[item.category_id].push(item);
          });

          // Prepare data for server update with new positions within each category
          const itemsToUpdate: { id: string; position: number; category_id: string }[] = [];
          Object.keys(updatedItemsByCategory).forEach((categoryId) => {
            updatedItemsByCategory[categoryId].forEach((item, index) => {
              itemsToUpdate.push({
                id: item.id,
                position: index, // Assign new position based on array index within its category
                category_id: item.category_id, // Use the item's original category_id
              });
            });
          });

          // Call server action to update positions in DB
          updateItemPositions(itemsToUpdate).then(result => {
            if (result.error) {
              alert('Error updating item positions: ' + result.error);
              // Revert to original state if server update fails
              setItems(initialItems);
            }
          });

          return newItems; // Optimistic update
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          ← Retour
        </button>
        <h1 className="text-3xl font-bold mb-6">Gestion de l&apos;Inventaire</h1>

        {/* Category Management */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Catégories</h2>
        <button
          onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showAddCategoryForm ? 'Annuler' : 'Ajouter une Catégorie'}
        </button>

        {showAddCategoryForm && (
          <form onSubmit={handleAddCategory} className="mb-8 p-4 border rounded shadow-md">
            <div className="mb-2">
              <label htmlFor="newCategoryName" className="block text-sm font-medium text-gray-700">Nom de la Catégorie</label>
              <input
                type="text"
                id="newCategoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Ajouter</button>
          </form>
        )}

        <div className="overflow-x-auto mb-8">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={categories.map(category => category.id)} strategy={verticalListSortingStrategy}>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Nom</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <SortableCategoryItem
                      key={category.id}
                      category={category}
                      startEditingCategory={startEditingCategory}
                      handleDeleteCategory={handleDeleteCategory}
                    />
                  ))}
                </tbody>
              </table>
            </SortableContext>
          </DndContext>
        </div>

        {editingCategory && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <form onSubmit={handleUpdateCategory} className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <h2 className="text-xl font-semibold mb-4">Modifier Catégorie</h2>
              <div className="mb-2">
                <label htmlFor="editCategoryName" className="block text-sm font-medium text-gray-700">Nom de la Catégorie</label>
                <input
                  type="text"
                  id="editCategoryName"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                >
                  Annuler
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Mettre à jour</button>
              </div>
            </form>
          </div>
        )}

        {/* Inventory Item Management */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Articles d&apos;Inventaire</h2>
        <button
          onClick={() => setShowAddItemForm(!showAddItemForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showAddItemForm ? 'Annuler' : 'Ajouter un Article'}
        </button>

        {showAddItemForm && (
          <form onSubmit={handleAddItem} className="mb-8 p-4 border rounded shadow-md">
            <div className="mb-2">
              <label htmlFor="newItemName" className="block text-sm font-medium text-gray-700">Nom de l&apos;Article</label>
              <input
                type="text"
                id="newItemName"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="newItemCategoryId" className="block text-sm font-medium text-gray-700">Catégorie</label>
              <select
                id="newItemCategoryId"
                value={newItemCategoryId}
                onChange={(e) => setNewItemCategoryId(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="newItemQuantity" className="block text-sm font-medium text-gray-700">Quantité</label>
              <input
                type="number"
                id="newItemQuantity"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newItemPosition" className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="number"
                id="newItemPosition"
                value={newItemPosition}
                onChange={(e) => setNewItemPosition(parseInt(e.target.value))}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Ajouter l&apos;Article</button>
          </form>
        )}

        <div className="overflow-x-auto mb-8">
          {categories.map(category => (
            <div key={category.id} className="mb-8 p-4 border rounded shadow-md bg-gray-50">
              <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Article</th>
                    <th className="py-2 px-4 border-b">Quantité</th>
                    <th className="py-2 px-4 border-b">Position</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => handleDragEnd(event, category.id)}>
                  <SortableContext items={items.filter(item => item.category_id === category.id).map(item => item.id)} strategy={verticalListSortingStrategy}>
                    <tbody>
                      {items.filter(item => item.category_id === category.id).map((item) => (
                        <SortableInventoryItem
                          key={item.id}
                          item={item}
                          startEditingItem={startEditingItem}
                          handleDeleteItem={handleDeleteItem}
                        />
                      ))}
                    </tbody>
                  </SortableContext>
                </DndContext>
              </table>
            </div>
          ))}
        </div>

        {editingItem && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <form onSubmit={handleUpdateItem} className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <h2 className="text-xl font-semibold mb-4">Modifier Article</h2>
              <div className="mb-2">
                <label htmlFor="editItemName" className="block text-sm font-medium text-gray-700">Nom de l&apos;Article</label>
                <input
                  type="text"
                  id="editItemName"
                  value={editItemName}
                  onChange={(e) => setEditItemName(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="editItemCategoryId" className="block text-sm font-medium text-gray-700">Catégorie</label>
                <select
                  id="editItemCategoryId"
                  value={editItemCategoryId}
                  onChange={(e) => setEditItemCategoryId(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="editItemQuantity" className="block text-sm font-medium text-gray-700">Quantité</label>
                <input
                  type="number"
                  id="editItemQuantity"
                  value={editItemQuantity}
                  onChange={(e) => setEditItemQuantity(parseInt(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editItemPosition" className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="number"
                  id="editItemPosition"
                  value={editItemPosition}
                  onChange={(e) => setEditItemPosition(parseInt(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                >
                  Annuler
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Mettre à jour</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}