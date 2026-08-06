/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DataParticles = ({ count = 1000 }) => {
  const pointsRef = useRef();

  // Mathematically generate random positions for 1,000 particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;     // X axis spread
      positions[i * 3 + 1] = Math.random() * 20;         // Y axis (height)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50; // Z axis depth
    }
    return positions;
  }, [count]);

  // Slowly rotate the entire particle cloud on every frame
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.05; // Negative for counter-clockwise rotation
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particlesPosition.length / 3} 
          array={particlesPosition} 
          itemSize={3} 
        />
      </bufferGeometry>
      {/* AdditiveBlending makes them glow intensely when overlapping */}
      <pointsMaterial 
        size={0.08} 
        color="#00ff41" 
        transparent 
        opacity={0.4} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default DataParticles;