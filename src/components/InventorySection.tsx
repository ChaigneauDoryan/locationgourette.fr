import { getCategories, getItems } from '@/lib/inventoryUtils'; // Assuming you'll create this utility

const InventorySection = async () => {
  const categories = await getCategories();
  const items = await getItems();

  // Group items by category_id
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category_id]) {
      acc[item.category_id] = [];
    }
    acc[item.category_id].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  // Transform for rendering
  const inventoryCategories = categories.map(category => ({
    category: category.name,
    id: category.id,
    items: groupedItems[category.id] || [],
  }));

  return (
    <section id="inventaire" className="py-16 bg-gray-50" style={{ scrollMarginTop: '5rem' }}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Inventaire de l'Appartement</h2>
          <div className="flex items-center justify-center bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md border border-blue-200">
            <span>ℹ️</span>
            <p className="text-base text-left ml-3">
              L'inventaire repose sur la confiance. Si vous constatez à votre arrivée une anomalie ou un dysfonctionnement d'un équipement, nous vous prions de nous en informer dès que possible. L'objectif n'est pas de compter chaque couteau ou fourchette, mais de vérifier si rien d'important ne manque.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inventoryCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
              <div className="p-6 flex items-center space-x-4 bg-gray-50 border-b border-gray-200">
                {/* You might want to add a category-specific icon here if you store it in the category table */}
                <h3 className="text-2xl font-bold text-gray-700">{category.category}</h3>
              </div>
              <ul className="p-6 space-y-3">
                {category.items.map((item) => (
                  <li key={item.id} className="flex items-center text-gray-600">
                    <div className="flex-shrink-0 mr-3 text-gray-400">
                      {/* Icon removed */}
                    </div>
                    <span>{item.name} {item.quantity > 1 && `(x${item.quantity})`}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InventorySection;