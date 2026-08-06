/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Building = ({ position, scale, color = "#00ff41" }) => {
  const boxGeom = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  return (
    <group position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#080810" roughness={0.1} metalness={0.9} />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[boxGeom]} />
          <lineBasicMaterial attach="material" color={color} toneMapped={false} linewidth={1} />
        </lineSegments>
      </mesh>
    </group>
  );
};

// Traffic particle system
const Traffic = () => {
  const pointsRef = useRef();
  const count = 300;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40; // X
      pos[i * 3 + 1] = Math.random() * 0.5;    // Y (close to ground)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40; // Z
      vel[i] = (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1); // Speed & Direction
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttribute = pointsRef.current.geometry.attributes.position;
    const array = posAttribute.array;
    for (let i = 0; i < count; i++) {
      // Move along X axis for traffic
      array[i * 3] += velocities[i] * delta * 5;
      if (array[i * 3] > 20) array[i * 3] = -20;
      if (array[i * 3] < -20) array[i * 3] = 20;
    }
    posAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#ff0055" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
};

const AetherCity = () => {
  const cityGroup = useRef();

  useFrame((state, delta) => {
    if (cityGroup.current) {
      cityGroup.current.rotation.y += delta * 0.03; // Slow ambient rotation
    }
  });

  return (
    <group position={[0, -1, 0]} ref={cityGroup}>
      {/* Central Spire (The core) */}
      <Building position={[0, 3, 0]} scale={[2, 6, 2]} color={[0, 2, 0.5]} />
      
      {/* Surrounding Districts */}
      {/* Projects District */}
      <Building position={[4, 1.5, 2]} scale={[1.5, 3, 1.5]} color={[0.2, 0.5, 2]} />
      <Building position={[4, 1, 4]} scale={[1, 2, 1]} color={[0.2, 0.5, 2]} />
      
      {/* AI Lab District */}
      <Building position={[-3, 2, -3]} scale={[2, 4, 2]} color={[2, 0, 1]} />
      
      {/* Dev HQ District */}
      <Building position={[2, 2.5, -4]} scale={[1.5, 5, 1.5]} color={[2, 1, 0]} />
      
      {/* Network District */}
      <Building position={[-4, 1, 3]} scale={[1.2, 2, 1.2]} color={[0, 2, 2]} />

      {/* Traffic Particles */}
      <Traffic />

      {/* Cyber Grid Ground Plane */}
      <gridHelper args={[60, 40, '#00ff41', '#111122']} position={[0, 0, 0]} />
    </group>
  );
};

export default AetherCity;
