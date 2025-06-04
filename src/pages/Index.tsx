
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductGallery from '../components/ProductGallery';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Header />
      <HeroSection />
      <ProductGallery />
      <Footer />
    </div>
  );
};

export default Index;
