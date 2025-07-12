

const PresentationSection = () => {
  return (
    <section id="presentation" className="py-16 bg-gray-100" style={{ scrollMarginTop: '5rem' }}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Appartement à louer à Gourette : Votre Séjour Idéal au Cœur des Pyrénées</h1>
        <div className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-700">
          <h2 className="text-3xl font-semibold mt-10 mb-6 text-center">Un appartement rénové avec vue, au cœur de la station</h2>

          <div className="mt-8 text-left">
            <h3 className="text-2xl font-semibold mb-4">Situation</h3>
            <p className="mb-4">
              Appartement de 30m² entièrement rénové, avec un balcon exposé sud offrant une vue imprenable sur les sommets. Idéalement situé au cœur de la station, au 4ème étage de la résidence Sanctus (Plateforme le Valentin). La résidence est sécurisée avec un concierge, deux entrées contrôlées par badges et deux ascenseurs pour votre confort.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Équipements & Confort</h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-2">Cuisine intégrée (neuve)</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Lave-vaisselle</li>
                  <li>Grand réfrigérateur</li>
                  <li>Plaque à induction</li>
                  <li>Combiné four + micro-ondes</li>
                  <li>Cafetière, service à raclette, grille-pain</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Pièce de vie spacieuse</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Canapé/lit 140cm (matelas Bultex)</li>
                  <li>Canapé/lit neuf BZ 1 personne</li>
                  <li>Placard de rangement</li>
                  <li>TV 80cm et accès balcon</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Coin Nuit (Alcôves)</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>1 lit superposé (140cm bas / 90cm haut)</li>
                  <li>Espace séparable par une porte</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Sanitaires</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Salle de bain rénovée avec douche vitrée</li>
                  <li>WC séparés</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Informations complémentaires</h3>
            <p>Un parking gratuit est disponible à proximité de la résidence pour faciliter votre stationnement.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Heure d&apos;arrivée et de départ</h3>
            <p className="mb-4">
              Chers clients, nous souhaitons vous informer que l&apos;heure d&apos;arrivée est fixée à partir de 12h00 jusqu&apos;à 18h00 et l&apos;heure de départ avant 10h00. Si vous prévoyez arriver plus tôt ou de partir plus tard, veuillez nous en informer à l&apos;avance pour que nous puissions organiser une solution alternative si possible. Nous apprécions votre coopération pour assurer une expérience agréable pour tous nos clients.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Remise des clés</h3>
            <p className="mb-4">
              La remise des clés se fait via une boîte à clés sécurisée, vous offrant une flexibilité maximale pour votre arrivée.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Règlement intérieur</h3>
            <h4 className="text-xl font-semibold mb-2">Animaux</h4>
            <p className="mb-4">
              Animaux non acceptés afin d&apos;éviter toute nuisance sonore.
            </p>
            <h4 className="text-xl font-semibold mb-2">Pensez aux prochains voyageurs</h4>
            <p className="mb-4">
              Il est strictement interdit de fumer dans ce logement. Nous vous demandons de penser aux prochains voyageurs qui souhaitent arriver dans un environnement sans odeur de tabac froid. Il est cependant autorisé de fumer sur le balcon de ce logement. Nous vous prions de bien vouloir refermer la porte-fenêtre pour éviter que la fumée ne pénètre à l&apos;intérieur de l&apos;appartement. Merci de respecter cette règle pour le confort de tous les voyageurs.
            </p>
            <h4 className="text-xl font-semibold mb-2">En cas de casse</h4>
            <p className="mb-4">
              Dans le cas où vous casseriez quelque chose, nous vous prions de nous en informer immédiatement, afin que je prévois d&apos;en rapporter lors de notre prochaine venue que ce soit pour une casse mineure due à l&apos;usure d&apos;un équipement ou pour un problème plus important. Il n&apos;y aura pas de retenue sur la caution pour vaisselle cassée sauf si quantité importante.
            </p>
          </div>

          <p className="text-center font-semibold text-xl mt-10">
            Réservez dès maintenant et préparez-vous à vivre des moments magiques à la montagne !
          </p>
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;
