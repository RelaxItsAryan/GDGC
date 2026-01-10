import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EventsSection from '@/components/EventsSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import GallerySection from '@/components/GallerySection';
import FAQSection from '@/components/FAQSection';
import JoinSection from '@/components/JoinSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <WhatWeDoSection />
        <GallerySection />
        <FAQSection />
        <JoinSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
