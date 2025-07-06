import Image from 'next/image';

const ImageGallery = () => {
  const images = [
    { src: '/appartement/vueHiverBis.webp', alt: 'Vue Hiver' },
    { src: '/appartement/alcove.webp', alt: 'Alcôve' },
    { src: '/appartement/alcove2.webp', alt: 'Alcôve 2' },
    { src: '/appartement/Balcon.webp', alt: 'Balcon' },
    { src: '/appartement/sdb.webp', alt: 'Salle de Bain' },
    { src: '/appartement/vueEte.webp', alt: 'Vue Été' },
    { src: '/appartement/vueInterieureBis.webp', alt: 'Vue Intérieure' },
    { src: '/appartement/vueInterieurePano.webp', alt: 'Vue Intérieure Panoramique' },
    { src: '/appartement/wc.webp', alt: 'WC' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Découvrez l&apos;appartement en images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 grid-auto-rows-min">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative w-full overflow-hidden rounded-lg shadow-lg ${index % 3 === 0 ? 'sm:row-span-2 h-auto' : 'h-64'}`} // Applique row-span-2 pour certaines images
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;