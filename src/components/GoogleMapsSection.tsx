const GoogleMapsSection = () => {
  const googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2898.9999999999995!2d-0.3999999999999999!3d42.93333333333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU1JzU5LjkiTiAwwrAyMycyOS45Ilc!5e0!3m2!1sfr!2sfr!4v1678900000000!5m2!1sfr!2sfr"; // Remplacez par l'URL de votre itinéraire Google Maps
  const googleMapsAppUrl = "https://maps.google.com/?q=Gourette"; // Remplacez par l'adresse de Gourette ou l'adresse exacte de l'appartement

  return (
    <section id="localisation" className="py-16 bg-white" style={{ scrollMarginTop: '5rem' }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Accéder à Gourette</h2>
        <p className="text-lg mb-8">
          Utilisez la carte ci-dessous pour planifier votre itinéraire. Vous pouvez également ouvrir l&apos;itinéraire directement dans l&apos;application Google Maps sur votre smartphone.
        </p>
        <div className="max-w-4xl mx-auto mb-8">
          <iframe
            src={googleMapsUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Itinéraire vers Gourette"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <a
          href={googleMapsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Ouvrir dans Google Maps
        </a>
      </div>
    </section>
  );
};

export default GoogleMapsSection;
