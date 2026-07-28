import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import CyberSpire from './CyberSpire';
import DataParticles from './DataParticles';

const AetherCanvas = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 4, 10], fov: 50 }}
        gl={{ antialias: false }} // Turn off default antialiasing when using post-processing
        style={{ background: '#030303' }}
      >
        <fog attach="fog" args={['#030303', 5, 25]} />

        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
        
        <Stars radius={50} depth={50} count={2000} factor={3} saturation={0} fade speed={1} />

        <CyberSpire />
        <DataParticles count={1000} />

        {/* POST PROCESSING PIPELINE */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={1} // Only glow things brighter than 1 (our neon lines)
            mipmapBlur 
            intensity={1.5} 
          />
        </EffectComposer>

        <OrbitControls 
          enableZoom={true}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={4}
          maxDistance={18}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default AetherCanvas;