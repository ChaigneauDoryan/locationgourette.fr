import PresentationSection from "../components/PresentationSection";
import ImageGallery from "../components/ImageGallery";
import PistesSection from "../components/PistesSection";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import GoogleMapsSection from "../components/GoogleMapsSection";
import UsefulAddressesSection from "../components/UsefulAddressesSection";
import ContactForm from "../components/ContactForm";
import InventorySection from "../components/InventorySection";

export default function Home() {
  return (
    <main>
      <PresentationSection />
      <ImageGallery />
      <PistesSection />
      <AvailabilityCalendar />
      <InventorySection />
      <GoogleMapsSection />
      <UsefulAddressesSection />
      <ContactForm />
    </main>
  );
}