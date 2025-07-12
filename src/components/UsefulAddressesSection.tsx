import React from 'react';
import { createClient as createServerClient } from '@/lib/supabaseServer';
import { FaMapMarkerAlt, FaSkiing, FaTicketAlt, FaFilm, FaShoppingCart, FaStore, FaUtensils, FaMountain, FaTrain, FaQuestionCircle } from 'react-icons/fa';



// Mappage des noms d'icônes aux composants d'icônes
const iconComponents: { [key: string]: React.ElementType } = {
  FaMapMarkerAlt,
  FaSkiing,
  FaTicketAlt,
  FaFilm,
  FaShoppingCart,
  FaStore,
  FaUtensils,
  FaMountain,
  FaTrain,
  FaQuestionCircle,
};

const UsefulAddressesSection = async () => {
  const supabase = createServerClient();
  const { data: addresses, error } = await supabase
    .from('useful_addresses')
    .select('*')
    .order('position', { ascending: true });

  if (error) {
    console.error('Error fetching useful addresses for client side:', error);
    return <section id="adresses-utiles" className="py-16 bg-gray-100"><div className="container mx-auto px-4 text-center"><p>Erreur lors du chargement des adresses utiles.</p></div></section>;
  }

  if (!addresses || addresses.length === 0) {
    return <section id="adresses-utiles" className="py-16 bg-gray-100"><div className="container mx-auto px-4 text-center"><p>Aucune adresse utile disponible pour le moment.</p></div></section>;
  }

  return (
    <section id="adresses-utiles" className="py-16 bg-gray-100" style={{ scrollMarginTop: '5rem' }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Adresses Utiles à Gourette</h2>
        <p className="text-lg mb-8">
          Voici quelques adresses et contacts utiles pour faciliter votre séjour à Gourette.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {addresses.map((item) => {
            const IconComponent = item.icon_name ? iconComponents[item.icon_name] : FaQuestionCircle;
            return (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md text-left flex items-center transform transition-transform duration-300 hover:scale-105">
                <div className="text-3xl text-blue-600 mr-4">
                  {IconComponent && <IconComponent />}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  {item.description && <p className="text-gray-700 mb-2">{item.description}</p>}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      En savoir plus
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UsefulAddressesSection;