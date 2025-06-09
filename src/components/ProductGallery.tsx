
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';

const categories = [
  { id: 'all', name: 'Tous les produits' },
  { id: 'electronics', name: 'Électronique' },
  { id: 'fashion', name: 'Mode' },
  { id: 'home', name: 'Maison' },
  { id: 'books', name: 'Livres' },
];

const products = [
  {
    id: 1,
    name: 'Casque Audio Premium',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.8,
    reviews: 124,
    badge: 'Bestseller'
  },
  {
    id: 2,
    name: 'Ensemble Salon Moderne',
    price: 1299.99,
    originalPrice: 1599.99,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    category: 'home',
    rating: 4.9,
    reviews: 89,
    badge: 'Nouveauté'
  },
  {
    id: 3,
    name: 'Chat Décoratif Artisanal',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
    category: 'home',
    rating: 4.7,
    reviews: 56,
  },
  {
    id: 4,
    name: 'Art Mural Vintage',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=300&fit=crop',
    category: 'home',
    rating: 4.6,
    reviews: 78,
    badge: 'Promo'
  },
  {
    id: 5,
    name: 'Smartphone Dernière Génération',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.9,
    reviews: 245,
    badge: 'Nouveauté'
  },
  {
    id: 6,
    name: 'Veste en Cuir Premium',
    price: 249.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    category: 'fashion',
    rating: 4.8,
    reviews: 167,
    badge: 'Tendance'
  }
];

const ProductGallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayedProducts, setDisplayedProducts] = useState(6);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleLoadMore = () => {
    setDisplayedProducts(prev => prev + 6);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-green-pale/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nos Produits
            <span className="bg-gradient-to-r from-green-dark to-green-medium bg-clip-text text-transparent"> Phares</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection exclusive de produits soigneusement choisis pour leur qualité exceptionnelle
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in delay-200">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-green-dark to-green-medium text-white shadow-lg hover:shadow-xl'
                  : 'border-green-light text-green-dark hover:bg-green-pale hover:border-green-medium'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.slice(0, displayedProducts).map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayedProducts < filteredProducts.length && (
          <div className="text-center animate-fade-in">
            <Button
              onClick={handleLoadMore}
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg font-semibold border-2 border-green-light text-green-dark hover:bg-green-pale hover:border-green-medium transition-all duration-300"
            >
              Voir plus de produits
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGallery;
