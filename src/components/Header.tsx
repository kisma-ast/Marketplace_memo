import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/contexts/SearchContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchTerm, handleSearch } = useSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    handleSearch(input.value);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow border-b border-green-pale">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Texte */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-dark to-green-medium rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-light to-green-medium bg-clip-text text-transparent select-none">
            MarketPlace
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-green-medium font-medium transition-colors">Accueil</Link>
          <Link to="/categories" className="text-gray-700 hover:text-green-medium font-medium transition-colors">Catégories</Link>
          <Link to="/about" className="text-gray-700 hover:text-green-medium font-medium transition-colors">À propos</Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-medium font-medium transition-colors">Contact</Link>
        </nav>

        {/* Barre de recherche + icônes à droite */}
        <div className="flex items-center space-x-3">
          <form
            onSubmit={handleSubmit}
            className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-80 border border-green-pale focus-within:ring-2 focus-within:ring-green-medium transition-all"
          >
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Rechercher des produits..."
              className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </form>
          <Link to="/account">
            <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-green-pale transition-colors border border-green-pale">
              <User className="w-5 h-5 text-green-medium" />
            </div>
          </Link>
          <Link to="/cart" className="relative">
            <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-green-pale transition-colors border border-green-pale">
              <ShoppingCart className="w-5 h-5 text-green-medium" />
            </div>
            <span className="absolute -top-1 -right-1 bg-green-medium text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow border-2 border-white">3</span>
          </Link>
          {/* Menu mobile */}
          <button
            className="md:hidden w-10 h-10 rounded-full bg-white shadow flex items-center justify-center border border-green-pale ml-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-green-medium" /> : <Menu className="w-6 h-6 text-green-medium" />}
          </button>
        </div>
      </div>
      {/* Menu mobile déroulant */}
      {isMenuOpen && (
        <nav className="md:hidden px-4 pb-4 animate-fade-in">
          <div className="flex flex-col space-y-4 bg-white rounded-2xl shadow-lg mt-2 p-4 border border-green-pale">
            <Link to="/" className="text-gray-700 hover:text-green-medium font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
            <Link to="/categories" className="text-gray-700 hover:text-green-medium font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Catégories</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-medium font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>À propos</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-medium font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <form onSubmit={handleSubmit} className="flex items-center bg-gray-100 rounded-full px-4 py-2 border border-green-pale mt-2">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </form>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
