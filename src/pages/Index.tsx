
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductGallery from '../components/ProductGallery';
import Footer from '../components/Footer';
import ProductRecommendationBot from '../components/ProductRecommendationBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-pale via-background to-green-light/20">
      <Header />
      <HeroSection />
      <ProductGallery />
      <Footer />
      <ProductRecommendationBot />
    </div>
  );
};

export default Index;
