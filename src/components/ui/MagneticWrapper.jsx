import { useRef, useState } from 'react';

const MagneticWrapper = ({ children, amount = 0.3 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    setPosition({ 
      x: distanceX * amount, 
      y: distanceY * amount 
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
      }}
      className="inline-block"
    >
      {children}
    </div>
  );
};

export default MagneticWrapper;
