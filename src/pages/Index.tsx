import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductGallery from '../components/ProductGallery';
import Footer from '../components/Footer';
import ProductRecommendationBot from '../components/ProductRecommendationBot';
import ScrollToTop from '../components/ScrollToTop';

const Index = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-pale via-background to-green-light/20">
        <Header />
        <HeroSection />
        <ProductGallery />
        <Footer />
      </div>
      
      {/* Floating Elements */}
      <div className="fixed bottom-0 right-0 z-50">
        <ProductRecommendationBot />
      </div>
      
      <ScrollToTop />
    </>
  );
};

export default Index;
