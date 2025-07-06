// This is a test comment to force re-transpilation
const InventorySection = () => {
  const inventoryCategories = [
    {
      category: "Cuisine & Ustensiles",
      icon: <span>🍳</span>,
      items: [
        { name: "3 Poêles", icon: <span>🥘</span> },
        { name: "2 Casseroles", icon: <span>🍲</span> },
        { name: "1 Faitout", icon: <span>🍲</span> },
        { name: "1 Égouttoir", icon: <span>🧺</span> },
        { name: "1 Presse-purée", icon: <span>🥔</span> },
        { name: "Couvercles", icon: <span>蓋</span> },
        { name: "Plusieurs plats au four", icon: <span>🍽️</span> },
        { name: "1 Lot de couverts", icon: <span>🍴</span> },
        { name: "1 Tire-bouchon", icon: <span>🍾</span> },
        { name: "1 Couteau à pain", icon: <span>🔪</span> },
        { name: "1 Grand couteau", icon: <span>🔪</span> },
        { name: "1 Couteau d'office", icon: <span>🔪</span> },
        { name: "1 Ouvre-boîte", icon: <span>🥫</span> },
        { name: "1 Décapsuleur", icon: <span>🍺</span> },
        { name: "1 Économe", icon: <span>🥕</span> },
        { name: "1 Ciseau", icon: <span>✂️</span> },
        { name: "1 Fouet", icon: <span>🥚</span> },
        { name: "1 Écumoir", icon: <span>🥄</span> },
        { name: "1 Louche", icon: <span>🥄</span> },
      ],
    },
    {
      category: "Électroménager",
      icon: <span>🔌</span>,
      items: [
        { name: "1 Grille-pain", icon: <span>🍞</span> },
        { name: "1 Cafetière", icon: <span>☕</span> },
        { name: "1 Micro-onde combiné", icon: <span>♨️</span> },
        { name: "1 Service à raclette", icon: <span>🧀</span> },
        { name: "1 Fer à repasser", icon: <span>👕</span> },
      ],
    },
    {
      category: "Vaisselle",
      icon: <span>🍽️</span>,
      items: [
        { name: "Plusieurs assiettes", icon: <span>🍽️</span> },
        { name: "Plusieurs verres", icon: <span>🥛</span> },
        { name: "Plusieurs bols", icon: <span>🥣</span> },
        { name: "Plusieurs tasses", icon: <span>☕</span> },
      ],
    },
    {
      category: "Divertissement",
      icon: <span>🎮</span>,
      items: [
        { name: "Jeux de société", icon: <span>🎲</span> },
        { name: "Télévision", icon: <span>📺</span> },
      ],
    },
    {
      category: "Chambres",
      icon: <span>🛏️</span>,
      items: [
        { name: "Couettes", icon: <span>🛌</span> },
        { name: "Oreillers", icon: <span>😴</span> },
      ],
    },
    {
      category: "Salle de bain",
      icon: <span>🚿</span>,
      items: [
        { name: "Sèche-cheveux", icon: <span>💨</span> },
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
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
            <div key={category.category} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
              <div className="p-6 flex items-center space-x-4 bg-gray-50 border-b border-gray-200">
                {category.icon}
                <h3 className="text-2xl font-bold text-gray-700">{category.category}</h3>
              </div>
              <ul className="p-6 space-y-3">
                {category.items.map((item) => (
                  <li key={item.name} className="flex items-center text-gray-600">
                    <div className="flex-shrink-0 mr-3 text-gray-400">
                      {item.icon}
                    </div>
                    <span>{item.name}</span>
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