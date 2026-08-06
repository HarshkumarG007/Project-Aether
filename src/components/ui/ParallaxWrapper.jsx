import React, { useState, useEffect } from 'react';

const ParallaxWrapper = ({ children, amount = 15, className = "" }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const moveX = ((mouseX - centerX) / centerX) * amount;
      const moveY = ((mouseY - centerY) / centerY) * amount;

      setOffset({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [amount]);

  return (
    <div 
      className={`w-full h-full ${className}`}
      style={{ 
        transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxWrapper;
