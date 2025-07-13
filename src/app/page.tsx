import PresentationSection from "../components/PresentationSection";
import ImageGallery from "../components/ImageGallery";
import PistesSection from "../components/PistesSection";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import GoogleMapsSection from "../components/GoogleMapsSection";
import UsefulAddressesSection from "../components/UsefulAddressesSection";
import ContactForm from "../components/ContactForm";
import InventorySection from "../components/InventorySection";
import { getImages } from '@/lib/imageUtils'; // Import the server-side data fetching function
import ErrorBoundary from "../components/ErrorBoundary";

export default async function Home() {
  const images = await getImages(); // Fetch images on the server

  return (
    <ErrorBoundary>
      <main>
        <PresentationSection />
        <ImageGallery images={images} /> {/* Pass images as props to the client component */}
        <PistesSection />
        <AvailabilityCalendar />
        <InventorySection />
        <GoogleMapsSection />
        <UsefulAddressesSection />
        <ContactForm />
      </main>
    </ErrorBoundary>
  );
}