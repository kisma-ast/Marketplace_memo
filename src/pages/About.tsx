import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Truck, Shield, Heart, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const stats = [
  { icon: Users, label: 'Clients satisfaits', value: '50,000+' },
  { icon: Award, label: 'Années d\'expérience', value: '10+' },
  { icon: Truck, label: 'Commandes livrées', value: '100,000+' },
  { icon: Shield, label: 'Vendeurs vérifiés', value: '500+' }
];

const values = [
  {
    icon: Heart,
    title: 'Passion',
    description: 'Nous sommes passionnés par la création d\'une expérience d\'achat exceptionnelle pour nos clients.'
  },
  {
    icon: Shield,
    title: 'Confiance',
    description: 'La confiance est au cœur de notre marketplace. Tous nos vendeurs sont soigneusement sélectionnés.'
  },
  {
    icon: Star,
    title: 'Qualité',
    description: 'Nous nous engageons à proposer uniquement des produits de la plus haute qualité.'
  }
];

const team = [
  {
    name: 'Aminata Diop',
    role: 'Fondatrice & CEO',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b332c37c?w=300&h=300&fit=crop',
    description: 'Passionnée d\'e-commerce depuis 10 ans'
  },
  {
    name: 'Moussa Diallo',
    role: 'Directeur Technique',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    description: 'Expert en technologies web et mobile'
  },
  {
    name: 'Fatou Ndiaye',
    role: 'Responsable Marketing',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    description: 'Spécialiste en stratégie digitale'
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-pale via-white to-green-pale/50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              À propos de
              <span className="bg-gradient-to-r from-green-dark to-green-medium bg-clip-text text-transparent block lg:inline"> Surprise Shop</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Depuis 2020, nous révolutionnons l'expérience d'achat en ligne au Sénégal en connectant 
              des vendeurs passionnés avec des clients exigeants à travers une plateforme 
              innovante et sécurisée.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className="w-12 h-12 text-green-medium mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-pale text-green-dark">Notre Histoire</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Une vision, une passion
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Surprise Shop est né d'une vision simple : créer un espace où la qualité 
                  rencontre la diversité au Sénégal. Nous croyons que chaque produit a une histoire 
                  et que chaque achat devrait être une expérience mémorable.
                </p>
                <p>
                  Notre équipe travaille sans relâche pour sélectionner les meilleurs 
                  vendeurs et garantir que chaque transaction se déroule dans les meilleures 
                  conditions. De la sélection des produits à la livraison, nous contrôlons 
                  chaque étape du processus.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers d'être la marketplace de référence au Sénégal pour 
                  des milliers de clients qui nous font confiance pour leurs achats en ligne.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop"
                alt="Notre équipe"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-green-dark text-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">3+</div>
                <div className="text-sm">Années d'excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-pale text-green-dark">Nos Valeurs</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ce qui nous guide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nos valeurs fondamentales façonnent chaque décision et guident notre mission
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-dark to-green-medium rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-pale text-green-dark">Notre Équipe</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Les visages derrière Surprise Shop
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une équipe passionnée et expérimentée à votre service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <Badge variant="outline" className="mb-4">{member.role}</Badge>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
