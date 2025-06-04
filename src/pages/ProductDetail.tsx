
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Star, Truck, Shield, RotateCcw, ArrowLeft, Plus, Minus } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Mock product data - in real app would come from API
const mockProducts = {
  1: {
    id: 1,
    name: 'Casque Audio Premium',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=400&fit=crop'
    ],
    category: 'Électronique',
    rating: 4.8,
    reviews: 124,
    description: 'Un casque audio premium avec une qualité sonore exceptionnelle. Conçu pour les audiophiles exigeants, il offre une expérience d\'écoute immersive avec des basses profondes et des aigus cristallins.',
    features: [
      'Réduction de bruit active',
      'Autonomie 30h',
      'Bluetooth 5.0',
      'Micro intégré',
      'Pliable et portable'
    ],
    inStock: true,
    badge: 'Bestseller'
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const product = mockProducts[id as keyof typeof mockProducts];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-orange-600">Accueil</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-orange-600">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Back button */}
        <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux produits
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-green-500">
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-red-500">
                  -{discount}%
                </Badge>
              )}
            </div>
            
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600">({product.reviews} avis)</span>
                </div>
                <Badge variant="outline">{product.category}</Badge>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-orange-600">
                {product.price.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {product.originalPrice.toFixed(2)}€
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Caractéristiques</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Quantité :</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="h-10 w-10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 text-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ajouter au panier
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 ${isLiked ? 'text-red-500 border-red-500' : ''}`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="font-medium text-sm">Livraison gratuite</p>
                  <p className="text-xs text-gray-600">Dès 50€ d'achat</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="font-medium text-sm">Garantie 2 ans</p>
                  <p className="text-xs text-gray-600">Service après-vente</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="font-medium text-sm">Retour 30 jours</p>
                  <p className="text-xs text-gray-600">Satisfait ou remboursé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
