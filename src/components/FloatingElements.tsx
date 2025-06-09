
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Éléments flottants 3D */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-br from-green-medium to-green-light rounded-full opacity-60 animate-float" 
           style={{ animationDelay: '0s', animationDuration: '4s' }} />
      
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-gradient-to-br from-green-light to-green-medium rounded-full opacity-40 animate-float" 
           style={{ animationDelay: '1s', animationDuration: '5s' }} />
      
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-gradient-to-br from-green-pale to-green-light rounded-full opacity-50 animate-float" 
           style={{ animationDelay: '2s', animationDuration: '6s' }} />
      
      <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-gradient-to-br from-green-medium to-green-dark rounded-full opacity-30 animate-float" 
           style={{ animationDelay: '3s', animationDuration: '4.5s' }} />
      
      {/* Formes géométriques 3D */}
      <div className="absolute top-20 right-10 w-8 h-8 border-2 border-green-light rotate-45 opacity-40 animate-spin" 
           style={{ animationDuration: '20s' }} />
      
      <div className="absolute bottom-20 left-20 w-6 h-6 border-2 border-green-medium rounded-full opacity-30 animate-pulse" />
      
      <div className="absolute top-1/2 left-10 w-4 h-8 bg-gradient-to-b from-green-pale to-transparent opacity-50 animate-float" 
           style={{ animationDelay: '1.5s', animationDuration: '7s' }} />
    </div>
  );
};

export default FloatingElements;
