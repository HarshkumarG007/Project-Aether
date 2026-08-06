import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CyberSpire = () => {
  const meshRef = useRef();
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(2.02, 6.02, 2.02), []);

  // Subtle rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Central Skyscraper Body */}
      <mesh ref={meshRef} position={[0, 3, 0]}>
        <boxGeometry args={[2, 6, 2]} />
        <meshStandardMaterial 
          color="#080810" 
          roughness={0.1} 
          metalness={0.9}
        />
        
        {/* Neon Wireframe Overlay - Notice we use toneMapped={false} and emissive multipliers */}
        <lineSegments>
          <edgesGeometry attach="geometry" args={[boxGeometry]} />
          <lineBasicMaterial 
            attach="material" 
            color={[0, 2, 0.5]} // Multiply color values beyond 1 for HDR glow
            toneMapped={false} 
            linewidth={2} 
          />
        </lineSegments>
      </mesh>

      {/* Cyber Grid Ground Plane */}
      <gridHelper args={[60, 40, '#00ff41', '#111122']} position={[0, 0, 0]} />
    </group>
  );
};

export default CyberSpire;