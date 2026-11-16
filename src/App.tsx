import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesAndBookingSection } from './components/ServicesAndBookingSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactAndFooter } from './components/ContactAndFooter';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesAndBookingSection />
        <GallerySection />
        <TestimonialsSection />
        <FaqSection />
        <ContactAndFooter />
      </main>
      <FloatingWhatsAppButton />
    </div>
  );
}
