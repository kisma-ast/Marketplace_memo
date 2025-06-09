
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Smartphone Premium",
      price: 699,
      quantity: 1,
      image: "/placeholder.svg",
      color: "Noir"
    },
    {
      id: 2,
      name: "Casque Audio Sans Fil",
      price: 149,
      quantity: 2,
      image: "/placeholder.svg",
      color: "Blanc"
    },
    {
      id: 3,
      name: "Montre Connectée",
      price: 299,
      quantity: 1,
      image: "/placeholder.svg",
      size: "42mm"
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const finalTotal = total + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-pale via-background to-green-light/20">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">Découvrez nos produits et ajoutez-les à votre panier</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-green-dark to-green-medium hover:from-green-dark/90 hover:to-green-medium/90">
                Continuer vos achats
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-pale via-background to-green-light/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-green-dark hover:text-green-medium">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Mon Panier ({cartItems.length})</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Articles du panier */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-6">
                <CardContent className="p-0">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                      {item.color && (
                        <p className="text-sm text-gray-600">Couleur: {item.color}</p>
                      )}
                      {item.size && (
                        <p className="text-sm text-gray-600">Taille: {item.size}</p>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-green-dark">
                            {(item.price * item.quantity).toFixed(2)} €
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <CardContent className="p-0">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Résumé de commande</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-semibold">{total.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-semibold">{shipping.toFixed(2)} €</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-dark">{finalTotal.toFixed(2)} €</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-dark to-green-medium hover:from-green-dark/90 hover:to-green-medium/90 text-white font-semibold py-3">
                  Procéder au paiement
                </Button>

                <div className="mt-4 text-center">
                  <Link to="/" className="text-green-dark hover:text-green-medium text-sm">
                    Continuer vos achats
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
