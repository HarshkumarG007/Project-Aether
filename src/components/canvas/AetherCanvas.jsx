import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import CyberSpire from './CyberSpire';
import DataParticles from './DataParticles';
import CameraController from './CameraController'; // <--- 1. Import it

const AetherCanvas = () => {
  const controlsRef = useRef(); // <--- 2. Create the reference

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 4, 10], fov: 50 }}
        gl={{ antialias: false }}
        style={{ background: '#030303' }}
      >
        {/* 3. Drop in the controller and pass it the reference */}
        <CameraController controlsRef={controlsRef} />

        <fog attach="fog" args={['#030303', 5, 25]} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
        
        <Stars radius={50} depth={50} count={2000} factor={3} saturation={0} fade speed={1} />

        <CyberSpire />
        <DataParticles />

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>

        <OrbitControls 
          ref={controlsRef} // <--- 4. Attach the reference to the controls
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