import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useAetherStore } from '../../store/useAetherStore';
import AetherCity from './AetherCity';
import DataParticles from './DataParticles';
import CameraRig from './CameraRig';
import PostFX from './PostFX';

const CoffeeCup = () => {
  const spawnCoffee = useAetherStore((state) => state.spawnCoffee);
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta;
      meshRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  if (!spawnCoffee) return null;

  // Positioned near the terminal
  return (
    <group ref={meshRef} position={[-2.5, 0.5, 5]} scale={[0.2, 0.2, 0.2]}>
      {/* Cup */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 0.8, 2.5, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Handle */}
      <mesh position={[1.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.7, 0.2, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
};

const AetherCanvas = ({ active = true }) => {
  const controlsRef = useRef();
  const theme = useAetherStore((state) => state.theme);

  const isLight = theme === 'light';
  const bgColor = isLight ? '#e0e0e0' : '#030303';
  const fogColor = isLight ? '#e0e0e0' : '#030303';
  const ambientIntensity = isLight ? 0.8 : 0.2;

  return (
    <div className="w-full h-full transition-colors duration-1000" style={{ backgroundColor: bgColor }}>
      <Canvas
        frameloop={active ? 'always' : 'never'}
        camera={{ position: [0, 4, 10], fov: 50 }}
        gl={{ antialias: false }}
      >
        <color attach="background" args={[bgColor]} />
        <CameraRig controlsRef={controlsRef} />

        <fog attach="fog" args={[fogColor, 5, 25]} />
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color={isLight ? "#ffddaa" : "#ffffff"} />
        
        {/* Hidden neon signs or stars logic based on theme */}
        {!isLight && (
          <Stars radius={50} depth={50} count={2000} factor={3} saturation={0} fade speed={1} />
        )}

        <AetherCity />
        <DataParticles />
        <CoffeeCup />
        
        <PostFX />

        <OrbitControls 
          ref={controlsRef}
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