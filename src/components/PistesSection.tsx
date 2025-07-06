import Image from 'next/image';

const PistesSection = () => {
  return (
    <section id="pistes" className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Plan des Pistes de Gourette</h2>
        <p className="text-lg mb-8">
          Découvrez le domaine skiable de Gourette grâce à notre plan interactif. Préparez vos journées de ski en toute sérénité !
        </p>
        {/* Ici, vous pouvez insérer une image du plan des pistes ou un lien vers un plan interactif */}
        <div className="max-w-4xl mx-auto">
          <Image
            src="/planDesPistesGourette.webp" // Remplacez par le chemin de votre image de plan des pistes
            alt="Plan des pistes de Gourette"
            width={1000} // Ajoutez une largeur appropriée
            height={600} // Ajoutez une hauteur appropriée
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <p className="mt-4 text-sm text-gray-600">
            <a
              href="https://www.gourette.com/domaine-skiable/plan-des-pistes/" // Remplacez par le lien réel vers le plan interactif
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Voir le plan interactif sur le site officiel de Gourette
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PistesSection;
