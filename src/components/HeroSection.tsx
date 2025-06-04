
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200 opacity-50" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-300 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-300 rounded-full opacity-20 animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-2" />
              #1 Marketplace en France
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Découvrez des
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent block">
                produits uniques
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Explorez notre marketplace premium avec des milliers de produits soigneusement sélectionnés par nos experts.
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-medium">4.9/5 • Plus de 50,000 avis clients</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Explorer maintenant
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-4 text-lg font-semibold"
              >
                En savoir plus
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative bg-gradient-to-br from-orange-200 to-amber-200 rounded-3xl p-8 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop"
                alt="Produits de qualité"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              
              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Livraison rapide</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl animate-float delay-500">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Qualité garantie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
