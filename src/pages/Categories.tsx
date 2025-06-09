
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Grid, List } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const categories = [
  {
    id: 'electronics',
    name: 'Électronique',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop',
    productCount: 45
  },
  {
    id: 'fashion',
    name: 'Mode',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop',
    productCount: 78
  },
  {
    id: 'home',
    name: 'Maison & Jardin',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop',
    productCount: 32
  },
  {
    id: 'books',
    name: 'Livres',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
    productCount: 156
  },
  {
    id: 'sports',
    name: 'Sport & Loisirs',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    productCount: 67
  },
  {
    id: 'beauty',
    name: 'Beauté & Santé',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop',
    productCount: 23
  }
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
    name: 'Smartphone Dernière Génération',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.9,
    reviews: 245,
    badge: 'Nouveauté'
  },
  {
    id: 4,
    name: 'Veste en Cuir Premium',
    price: 249.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
    category: 'fashion',
    rating: 4.8,
    reviews: 167,
    badge: 'Tendance'
  }
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-pale via-background to-green-light/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nos
            <span className="bg-gradient-to-r from-green-dark to-green-medium bg-clip-text text-transparent"> Catégories</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre large sélection de produits organisés par catégories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm">{category.productCount} produits</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des produits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-medium focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-green-medium hover:bg-green-dark' : ''}
              >
                Tous
              </Button>
              {categories.slice(0, 4).map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? 'bg-green-medium hover:bg-green-dark' : ''}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun produit trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
