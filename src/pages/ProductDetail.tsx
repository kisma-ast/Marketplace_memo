import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: id || '1',
    name: 'Smartphone Premium XZ',
    price: 699,
    originalPrice: 899,
    rating: 4.8,
    reviews: 234,
    description: 'Un smartphone haut de gamme avec des performances exceptionnelles et un design élégant.',
    features: [
      'Écran OLED 6.7 pouces',
      'Processeur dernière génération',
      'Triple caméra 108MP',
      'Batterie 5000mAh',
      'Résistant à l\'eau IP68'
    ],
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&h=600&fit=crop'
    ],
    inStock: true,
    category: 'Électronique'
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-contain rounded-2xl shadow-lg"
            />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  className={`w-full h-24 object-cover rounded-md cursor-pointer ${selectedImage === index ? 'ring-2 ring-orange-500' : 'hover:opacity-80'}`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 ml-2">
                {product.rating} ({product.reviews} avis)
              </span>
            </div>

            <div className="mt-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <ul className="list-disc pl-5 mt-4 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-orange-600 mr-4">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.inStock ? (
                <div className="flex items-center mt-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-100"
                      onClick={decrementQuantity}
                    >
                      -
                    </Button>
                    <span className="px-4">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-100"
                      onClick={incrementQuantity}
                    >
                      +
                    </Button>
                  </div>
                  <Button className="ml-4 bg-orange-500 text-white hover:bg-orange-600">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              ) : (
                <p className="text-red-500 mt-4 font-semibold">
                  Produit en rupture de stock
                </p>
              )}
            </div>

            <div className="mt-8 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Informations supplémentaires
              </h3>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center text-gray-600">
                  <Truck className="w-5 h-5 mr-2" />
                  Livraison gratuite
                </div>
                <div className="flex items-center text-gray-600">
                  <Shield className="w-5 h-5 mr-2" />
                  Garantie 2 ans
                </div>
                <div className="flex items-center text-gray-600">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Retour facile
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Partager ce produit
              </h3>
              <div className="flex items-center space-x-4 mt-2">
                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
