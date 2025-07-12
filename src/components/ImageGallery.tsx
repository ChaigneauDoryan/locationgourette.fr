'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Image as ImageType } from '@/app/admin/images/page'; // Import the Image type

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageGalleryProps {
  images: ImageType[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {

  const getPublicUrl = (storagePath: string) => {
    const cleanedPath = storagePath.startsWith('/') ? storagePath.substring(1) : storagePath;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${cleanedPath}`;
  };

  if (images.length === 0) {
    return null; // Don't render if no images
  }

  return (
    <section id="galerie-images" className="py-16 bg-white" style={{ scrollMarginTop: '5rem' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Découvrez l&apos;appartement en images</h2>
        <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] mx-auto rounded-lg shadow-lg overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="w-full h-full"
          >
            {images.map((image) => (
              <SwiperSlide key={image.id} className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={getPublicUrl(image.storage_path)}
                  alt={image.alt_text}
                  layout="fill"
                  objectFit="contain" // Use 'contain' to ensure the whole image is visible
                  className="transition-transform duration-300 hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;