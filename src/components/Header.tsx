
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-green-pale shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-dark to-green-medium rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-dark to-green-medium bg-clip-text text-transparent">
              MarketPlace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-dark transition-colors duration-200 font-medium">
              Accueil
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-green-dark transition-colors duration-200 font-medium">
              Catégories
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-dark transition-colors duration-200 font-medium">
              À propos
            </Link>
            <a href="#" className="text-gray-700 hover:text-green-dark transition-colors duration-200 font-medium">
              Contact
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-green-pale/30 rounded-full px-4 py-2 w-80">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Rechercher des produits..."
              className="bg-transparent flex-1 outline-none text-gray-700"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/account">
              <Button variant="ghost" size="icon" className="hover:bg-green-pale">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="hover:bg-green-pale relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-green-medium text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-green-pale pt-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-green-dark transition-colors duration-200 font-medium">
                Accueil
              </Link>
              <Link to="/categories" className="text-gray-700 hover:text-green-dark transition-colors duration-200 font-medium">
                Catégories
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-green-dark transition-colors duration-200 font-medium">
                À propos
              </Link>
              <a href="#" className="text-gray-700 hover:text-green-dark transition-colors duration-200 font-medium">
                Contact
              </a>
              <div className="flex items-center bg-green-pale/30 rounded-full px-4 py-2">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-transparent flex-1 outline-none text-gray-700"
                />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
