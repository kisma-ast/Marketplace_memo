import { Button } from '@/components/ui/button';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import FloatingElements from './FloatingElements';
import ParallaxBackground from './ParallaxBackground';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Arrière-plan parallax */}
      <ParallaxBackground />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-pale/30 via-green-light/10 to-green-medium/20 opacity-50" />
      
      {/* Éléments flottants 3D */}
      <FloatingElements />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center bg-green-pale text-green-dark px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300">
              <TrendingUp className="w-4 h-4 mr-2" />
              #1 Marketplace au Sénégal
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Découvrez des
              <span className="bg-gradient-to-r from-green-dark to-green-medium bg-clip-text text-transparent block hover:scale-105 transition-transform duration-500">
                produits uniques
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Explorez notre marketplace premium avec des milliers de produits soigneusement sélectionnés par nos experts.
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400 hover:scale-110 transition-transform duration-200" />
                ))}
              </div>
              <span className="font-medium">4.9/5 • Plus de 50,000 avis clients</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-dark to-green-medium hover:from-green-dark/90 hover:to-green-medium/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
              >
                Explorer maintenant
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-green-medium text-green-dark hover:bg-green-pale px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
              >
                En savoir plus
              </Button>
            </div>
          </div>
          
          {/* Hero Image avec effets 3D */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative bg-gradient-to-br from-green-pale to-green-light rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform-gpu perspective-1000">
              <img
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop"
                alt="Produits de qualité"
                className="w-full h-80 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating cards avec animations 3D */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl animate-float hover:scale-110 transition-transform duration-300" 
                   style={{ animationDelay: '0s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-medium rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Livraison rapide</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl animate-float hover:scale-110 transition-transform duration-300" 
                   style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-light rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Qualité garantie</span>
                </div>
              </div>
              
              {/* Effet de brillance au survol */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-500 rounded-2xl transform -skew-x-12 translate-x-full hover:translate-x-[-100%] transition-transform duration-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
