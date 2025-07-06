import { FaMapMarkerAlt, FaSkiing, FaTicketAlt, FaFilm, FaShoppingCart, FaStore, FaUtensils, FaMountain, FaTrain } from 'react-icons/fa';

const UsefulAddressesSection = () => {
  const addresses = [
    { name: "Office de Tourisme de Gourette", address: "Maison de Gourette, 64440 Eaux-Bonnes", link: "https://www.gourette.com/", icon: <FaMapMarkerAlt /> },
    { name: "Ecole de ski francaise", address: "Maison de Gourette, 64440 Eaux-Bonnes", link: "https://www.esf-gourette.com/", icon: <FaSkiing /> },
    { name: "N'PY (forfaits)", address: "Gourette, 64440 Eaux-Bonnes", link: "https://www.n-py.com/fr/ete/gourette", icon: <FaTicketAlt /> },
    { name: "Location de ski", address: "Plusieurs magasins dans la station", link: "#", icon: <FaSkiing /> },
    { name: "CInéma", address: "Cinéma de Gourette, 64440 Eaux-Bonnes", link: "https://www.cinefil.com/cinema/cinema-de-gourette-gourette/programmation", icon: <FaFilm /> },
    { name: "Supérette", address: "Centre Commercial, 64440 Gourette", link: "#", icon: <FaShoppingCart /> },
    { name: "Marché", address: "Parking du Ley, 64440 Gourette", link: "#", icon: <FaStore /> },
    { name: "Restaurant chez Régis", address: "Résidence Le Valentin, 64440 Gourette", link: "#", icon: <FaUtensils /> },
    { name: "Restaurant le cairn", address: "Résidence Le Valentin, 64440 Gourette", link: "#", icon: <FaUtensils /> },
    { name: "Col de l'Aubisque", address: "Route du Col de l'Aubisque, 64440 Eaux-Bonnes", link: "https://www.gourette.com/la-station-en-ete/", icon: <FaMountain /> },
    { name: "Petit train d'Artouste", address: "Route du Lac de Fabrèges, 64440 Laruns", link: "https://artouste.fr/ete/le-train-dartouste/", icon: <FaTrain /> },
  ];

  return (
    <section id="adresses-utiles" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Adresses Utiles à Gourette</h2>
        <p className="text-lg mb-8">
          Voici quelques adresses et contacts utiles pour faciliter votre séjour à Gourette.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {addresses.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-left flex items-center transform transition-transform duration-300 hover:scale-105">
              <div className="text-3xl text-blue-600 mr-4">{item.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-2">{item.address}</p>
                {item.link !== "#" && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    En savoir plus
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsefulAddressesSection;
