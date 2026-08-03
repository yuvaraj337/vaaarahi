import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedFoods from "@/components/FeaturedFoods";
import MenuSection from "@/components/MenuSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import GallerySection from "@/components/GallerySection";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedFoods />
      <MenuSection />
      <WhyChooseUs />
      <GallerySection />
      <Testimonials />
      <CtaSection />
      <Footer />
      <FloatingContact />
      
    </>
  );
}
