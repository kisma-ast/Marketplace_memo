import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              product.badge === 'Bestseller' ? 'bg-green-medium text-white' :
              product.badge === 'Nouveauté' ? 'bg-green-light text-green-dark' :
              product.badge === 'Promo' ? 'bg-red-500 text-white' :
              'bg-green-dark text-white'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-green-medium text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discount}%
            </span>
          </div>
        )}

        {/* Hover Actions */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-4 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white hover:bg-gray-100 shadow-lg transform transition-transform duration-200 hover:scale-110"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className={`shadow-lg transform transition-all duration-200 hover:scale-110 ${
              isLiked ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-white hover:bg-gray-100'
            }`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.floor(product.rating)
                      ? 'fill-green-medium text-green-medium'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 hover:text-green-medium transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-green-medium">
            {(product.price * 655.957).toFixed(0)} FCFA
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              {(product.originalPrice * 655.957).toFixed(0)} FCFA
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button 
          className="w-full bg-gradient-to-r from-green-dark to-green-medium hover:from-green-dark/90 hover:to-green-medium/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-bounce" />
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
