
import { useEffect, useState } from 'react';

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Couche parallax lente */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full blur-xl" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full blur-lg" />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full blur-2xl" />
      </div>
      
      {/* Couche parallax rapide */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ transform: `translateY(${scrollY * 0.6}px)` }}
      >
        <div className="absolute top-20 right-1/3 w-16 h-16 bg-gradient-to-br from-orange-300 to-amber-400 rounded-full blur-md" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full blur-lg" />
      </div>
      
      {/* Lignes animées */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-400 to-transparent animate-pulse"
          style={{ animationDelay: '0s', animationDuration: '3s' }}
        />
        <div 
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent animate-pulse"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        />
      </div>
    </div>
  );
};

export default ParallaxBackground;
