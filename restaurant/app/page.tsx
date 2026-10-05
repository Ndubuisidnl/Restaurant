import HeroSection from "@/components/home/HeroSection";
import QuickInfoBar from "@/components/home/QuickInfoBar";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Page Sections */}
      <HeroSection />
      <QuickInfoBar />
      <AboutPreview />
      <FeaturedMenu />
      <WhyChooseUs />

      {/* Footer */}
      <Footer />
    </div>
  );
}
