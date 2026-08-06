const GlobalOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[90]">
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]"></div>
      
      {/* CRT Scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 1) 50%)',
          backgroundSize: '100% 4px'
        }}
      ></div>
    </div>
  );
};

export default GlobalOverlay;
