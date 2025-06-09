
import { useState } from 'react';
import { User, Package, Heart, Settings, LogOut, Edit2, Camera } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Marie Dupont',
    email: 'marie.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Paix, 75001 Paris, France'
  });

  const orders = [
    {
      id: '#CMD-001',
      date: '2024-01-15',
      status: 'Livré',
      total: 299.99,
      items: 3
    },
    {
      id: '#CMD-002',
      date: '2024-01-10',
      status: 'En transit',
      total: 149.50,
      items: 2
    },
    {
      id: '#CMD-003',
      date: '2024-01-05',
      status: 'Traitement',
      total: 89.99,
      items: 1
    }
  ];

  const wishlist = [
    {
      id: 1,
      name: 'Tablette Pro 12"',
      price: 599,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Écouteurs Bluetooth',
      price: 199,
      image: '/placeholder.svg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livré': return 'bg-green-100 text-green-800';
      case 'En transit': return 'bg-blue-100 text-blue-800';
      case 'Traitement': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Ici vous ajouteriez la logique pour sauvegarder les modifications
  };

  const menuItems = [
    { id: 'profile', label: 'Mon Profil', icon: User },
    { id: 'orders', label: 'Mes Commandes', icon: Package },
    { id: 'wishlist', label: 'Ma Liste d\'envies', icon: Heart },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-pale via-background to-green-light/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Menu latéral */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gradient-to-br from-green-medium to-green-light text-white text-xl">
                        {userInfo.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mt-3">{userInfo.name}</h2>
                  <p className="text-gray-600">{userInfo.email}</p>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-green-dark to-green-medium text-white'
                          : 'text-gray-700 hover:bg-green-pale'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                  
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Déconnexion
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <div className="flex justify-between items-center">
                    <CardTitle>Informations personnelles</CardTitle>
                    <Button
                      variant="outline"
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      {isEditing ? 'Sauvegarder' : 'Modifier'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        value={userInfo.address}
                        onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'orders' && (
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>Mes Commandes</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <p className="text-gray-600">Commandé le {order.date}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{order.items} article(s)</span>
                          <span className="text-xl font-bold text-green-dark">
                            {order.total.toFixed(2)} €
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'wishlist' && (
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>Ma Liste d'envies</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="grid md:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-green-dark font-bold text-lg">{item.price} €</p>
                        <Button className="w-full mt-3 bg-gradient-to-r from-green-dark to-green-medium hover:from-green-dark/90 hover:to-green-medium/90">
                          Ajouter au panier
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'settings' && (
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>Paramètres du compte</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Notifications par email</span>
                          <Button variant="outline" size="sm">Activer</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Offres promotionnelles</span>
                          <Button variant="outline" size="sm">Désactiver</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Sécurité</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          Changer le mot de passe
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Authentification à deux facteurs
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
