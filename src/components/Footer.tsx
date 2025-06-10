import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-dark to-green-medium rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-light to-green-medium bg-clip-text text-transparent">
                MarketPlace
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Votre marketplace de confiance pour des produits uniques et de qualité. 
              Découvrez l'excellence à chaque achat.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-light transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-light transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-light transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-light transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Liens rapides</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-green-light transition-colors duration-200">
                À propos de nous
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-light transition-colors duration-200">
                Nos produits
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-light transition-colors duration-200">
                Blog
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-light transition-colors duration-200">
                Carrières
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-light transition-colors duration-200">
                Partenaires
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Support</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-green-light transition-colors duration-200">
                Centre d'aide
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-light transition-colors duration-200">
                Contact
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-light transition-colors duration-200">
                Retours & Échanges
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-light transition-colors duration-200">
                Livraison
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-light transition-colors duration-200">
                FAQ
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-light" />
                <span className="text-gray-400">kismartdev@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-light" />
                <span className="text-gray-400">+221 78 441 33 14</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-light mt-1" />
                <span className="text-gray-400">
                  Rue OKM 444<br />
                  Dakar, Sénégal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Restez informé</h3>
            <p className="text-gray-400 mb-6">
              Recevez nos dernières offres et nouveautés directement dans votre boîte mail.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-medium"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-green-dark to-green-medium hover:from-green-dark/90 hover:to-green-medium/90 text-white font-semibold rounded-lg transition-all duration-300">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              © 2024 MarketPlace. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-green-light transition-colors duration-200 text-sm">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-gray-400 hover:text-green-light transition-colors duration-200 text-sm">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-green-light transition-colors duration-200 text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
