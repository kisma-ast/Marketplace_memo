
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  products?: Product[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

const botQuestions = [
  "Bonjour ! Je suis votre assistant shopping personnel. Quel type de produit recherchez-vous aujourd'hui ?",
  "Quel est votre budget approximatif pour cet achat ?",
  "Préférez-vous des produits plutôt tendance ou classiques ?",
  "Y a-t-il une marque ou une caractéristique particulière qui vous intéresse ?"
];

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Casque Audio Premium',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=150&fit=crop',
    category: 'electronics',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Ensemble Salon Moderne',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=200&h=150&fit=crop',
    category: 'home',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Smartphone Dernière Génération',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=150&fit=crop',
    category: 'electronics',
    rating: 4.9
  }
];

const ProductRecommendationBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Message d'accueil initial
      setTimeout(() => {
        addBotMessage(botQuestions[0]);
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (content: string, products?: Product[]) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date(),
        products
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateRecommendation = (userResponses: string[]) => {
    // Logique simple de recommandation basée sur les mots-clés
    const responses = userResponses.join(' ').toLowerCase();
    
    let recommendedProducts = [...sampleProducts];
    
    if (responses.includes('électronique') || responses.includes('tech') || responses.includes('casque') || responses.includes('smartphone')) {
      recommendedProducts = sampleProducts.filter(p => p.category === 'electronics');
    } else if (responses.includes('maison') || responses.includes('salon') || responses.includes('décoration')) {
      recommendedProducts = sampleProducts.filter(p => p.category === 'home');
    }
    
    // Filtrer par budget si mentionné
    if (responses.includes('petit budget') || responses.includes('pas cher')) {
      recommendedProducts = recommendedProducts.filter(p => p.price < 500);
    } else if (responses.includes('haut de gamme') || responses.includes('premium')) {
      recommendedProducts = recommendedProducts.filter(p => p.price > 500);
    }
    
    return recommendedProducts.slice(0, 3);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    
    setTimeout(() => {
      if (currentQuestionIndex < botQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        addBotMessage(botQuestions[currentQuestionIndex + 1]);
      } else {
        // Générer des recommandations
        const userResponses = messages.filter(m => m.type === 'user').map(m => m.content);
        userResponses.push(inputValue);
        
        const recommendations = generateRecommendation(userResponses);
        addBotMessage(
          "Parfait ! Basé sur vos préférences, voici mes recommandations personnalisées :",
          recommendations
        );
        
        setTimeout(() => {
          addBotMessage("Ces produits correspondent à vos critères. Souhaitez-vous que je vous aide à en découvrir d'autres ?");
        }, 2000);
      }
    }, 500);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const restartConversation = () => {
    setMessages([]);
    setCurrentQuestionIndex(0);
    setTimeout(() => {
      addBotMessage(botQuestions[0]);
    }, 500);
  };

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-green-dark to-green-medium hover:from-green-dark/90 hover:to-green-medium/90 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Interface du chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-green-pale flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-dark to-green-medium p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Assistant Shopping</h3>
                <p className="text-white/80 text-sm">En ligne</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-green-medium' 
                      : 'bg-gray-200'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className={`rounded-2xl p-3 ${
                      message.type === 'user'
                        ? 'bg-green-medium text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.content}
                    </div>
                    
                    {/* Produits recommandés */}
                    {message.products && message.products.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.products.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="block bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                  {product.name}
                                </h4>
                                <p className="text-sm text-green-dark font-semibold">
                                  {product.price}€
                                </p>
                              </div>
                              <ShoppingCart className="w-4 h-4 text-gray-400" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Indicateur de frappe */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isTyping || !inputValue.trim()}
                className="bg-green-medium hover:bg-green-dark"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={restartConversation}
                className="w-full mt-2 text-green-dark hover:text-green-medium hover:bg-green-pale"
              >
                Nouvelle conversation
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductRecommendationBot;
