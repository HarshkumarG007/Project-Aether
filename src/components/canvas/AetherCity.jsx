/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/immutability */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Elevator = ({ color }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Move up and down smoothly along the side of the building
    ref.current.position.y = Math.sin(t * 1.5) * 0.45;
  });
  return (
    <mesh ref={ref} position={[0.5, 0, 0]}>
      <boxGeometry args={[0.05, 0.1, 0.05]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
};

const HoloRing = ({ radius, color }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.5;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} toneMapped={false} />
    </mesh>
  );
};

const HoloScreen = ({ position, rotation, color }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 2) * 0.05; // Hover effect
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[0.6, 0.3]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} toneMapped={false} side={THREE.DoubleSide} />
      <mesh position={[0, 0, 0.01]}>
         <planeGeometry args={[0.6, 0.3]} />
         <meshBasicMaterial color={color} wireframe transparent opacity={0.8} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </mesh>
  );
};

const PulseNode = ({ position, color, offset }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + offset;
    const blink = Math.sin(t * 10) * Math.sin(t * 15) > 0.5 ? 1 : 0.2;
    ref.current.material.opacity = blink;
  });
  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[0.05, 0.05]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
};

const BuildingScreen = ({ color }) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = color;
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const h = Math.random() * 80 + 20;
      ctx.fillRect(x, y, 3, h);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [color]);

  useFrame((state, delta) => {
    texture.offset.y -= delta * 1.5;
  });

  return (
    <mesh position={[0, 0, 0.505]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent opacity={0.9} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
};

const AerialDrones = () => {
  const pointsRef = useRef();
  const count = 150;

  const { positions, phases, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;     // X
      pos[i * 3 + 1] = Math.random() * 8 + 2;      // Y (high above ground)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30; // Z
      ph[i] = Math.random() * Math.PI * 2;
      spd[i] = Math.random() * 0.5 + 0.5;
    }
    return { positions: pos, phases: ph, speeds: spd };
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posAttribute = pointsRef.current.geometry.attributes.position;
    const array = posAttribute.array;
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      array[i * 3] += Math.sin(t * speeds[i] + phases[i]) * delta * 2;
      array[i * 3 + 2] += Math.cos(t * speeds[i] + phases[i]) * delta * 2;
      array[i * 3 + 1] += Math.sin(t * speeds[i] * 2 + phases[i]) * delta * 0.5;
      
      if (array[i * 3] > 20) array[i * 3] = -20;
      if (array[i * 3] < -20) array[i * 3] = 20;
      if (array[i * 3 + 2] > 20) array[i * 3 + 2] = -20;
      if (array[i * 3 + 2] < -20) array[i * 3 + 2] = 20;
    }
    posAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#a855f7" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
};

const Building = ({ position, scale, color = "#00ff41", hasElevator = false, hasHoloRing = false, hasScreen = false, hasMatrixScreen = false }) => {
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
      
      {/* Living City Details */}
      {hasElevator && <Elevator color={color} />}
      {hasHoloRing && <HoloRing radius={0.8} color={color} />}
      {hasScreen && <HoloScreen position={[0, 0.3, 0.55]} rotation={[0, 0, 0]} color={color} />}
      {hasMatrixScreen && <BuildingScreen color={color} />}
      
      {/* Blinking window nodes */}
      <PulseNode position={[0.51, 0.2, 0.2]} color={color} offset={0} />
      <PulseNode position={[-0.51, -0.3, -0.1]} color={color} offset={1.5} />
      <PulseNode position={[0.2, 0.4, 0.51]} color={color} offset={3} />
      <PulseNode position={[-0.2, -0.1, -0.51]} color={color} offset={4.5} />
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

const MatrixRain = () => {
  const pointsRef0 = useRef();
  const pointsRef1 = useRef();
  
  const createTextTex = (char) => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#00ff41';
    ctx.font = 'bold 50px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(char, 32, 32);
    return new THREE.CanvasTexture(canvas);
  };

  const tex0 = useMemo(() => createTextTex('0'), []);
  const tex1 = useMemo(() => createTextTex('1'), []);

  const { pos0, pos1, vel0, vel1 } = useMemo(() => {
    const p0 = new Float32Array(300 * 3);
    const p1 = new Float32Array(300 * 3);
    const v0 = new Float32Array(300);
    const v1 = new Float32Array(300);
    for (let i = 0; i < 300; i++) {
      p0[i*3] = (Math.random() - 0.5) * 50; p0[i*3+1] = Math.random() * 25; p0[i*3+2] = (Math.random() - 0.5) * 50;
      v0[i] = Math.random() * 4 + 3;
      p1[i*3] = (Math.random() - 0.5) * 50; p1[i*3+1] = Math.random() * 25; p1[i*3+2] = (Math.random() - 0.5) * 50;
      v1[i] = Math.random() * 4 + 3;
    }
    return { pos0: p0, pos1: p1, vel0: v0, vel1: v1 };
  }, []);

  useFrame((state, delta) => {
    const updatePoints = (ref, pos, vel) => {
      if (!ref.current) return;
      const array = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < 300; i++) {
        array[i*3+1] -= vel[i] * delta * 2;
        if (array[i*3+1] < 0) array[i*3+1] = 25 + Math.random() * 5;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    };
    updatePoints(pointsRef0, pos0, vel0);
    updatePoints(pointsRef1, pos1, vel1);
  });

  return (
    <group>
      <points ref={pointsRef0}>
        <bufferGeometry><bufferAttribute attach="attributes-position" count={300} array={pos0} itemSize={3} /></bufferGeometry>
        <pointsMaterial map={tex0} size={0.6} color="#ffffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={true} />
      </points>
      <points ref={pointsRef1}>
        <bufferGeometry><bufferAttribute attach="attributes-position" count={300} array={pos1} itemSize={3} /></bufferGeometry>
        <pointsMaterial map={tex1} size={0.6} color="#ffffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={true} />
      </points>
    </group>
  );
};

const RainRipples = () => {
  const meshRef = useRef();
  const count = 60;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const { positions, lifetimes } = useMemo(() => {
    const pos = [];
    const life = [];
    for (let i = 0; i < count; i++) {
      pos.push([ (Math.random() - 0.5) * 50, 0.01, (Math.random() - 0.5) * 50 ]);
      life.push(Math.random());
    }
    return { positions: pos, lifetimes: life };
  }, [count]);

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(32, 32, 28, 0, Math.PI * 2);
    ctx.stroke();
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      lifetimes[i] += delta * 2.0;
      if (lifetimes[i] > 1) {
        lifetimes[i] = 0;
        positions[i][0] = (Math.random() - 0.5) * 50;
        positions[i][2] = (Math.random() - 0.5) * 50;
      }
      
      dummy.position.set(positions[i][0], positions[i][1], positions[i][2]);
      const s = lifetimes[i] * 1.5;
      dummy.scale.set(s, s, s);
      dummy.rotation.x = -Math.PI / 2;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      const opacity = 1.0 - lifetimes[i];
      meshRef.current.setColorAt(i, new THREE.Color().setHSL(0.3, 1.0, opacity * 0.5));
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
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
      <Building position={[0, 3, 0]} scale={[2, 6, 2]} color={[0, 2, 0.5]} hasHoloRing={true} hasElevator={true} hasMatrixScreen={true} />
      
      {/* Surrounding Districts */}
      {/* Projects District */}
      <Building position={[4, 1.5, 2]} scale={[1.5, 3, 1.5]} color={[0.2, 0.5, 2]} hasScreen={true} />
      <Building position={[4, 1, 4]} scale={[1, 2, 1]} color={[0.2, 0.5, 2]} hasMatrixScreen={true} />
      
      {/* AI Lab District */}
      <Building position={[-3, 2, -3]} scale={[2, 4, 2]} color={[2, 0, 1]} hasElevator={true} hasHoloRing={true} />
      
      {/* Dev HQ District */}
      <Building position={[2, 2.5, -4]} scale={[1.5, 5, 1.5]} color={[2, 1, 0]} hasScreen={true} hasMatrixScreen={true} />
      
      {/* Network District */}
      <Building position={[-4, 1, 3]} scale={[1.2, 2, 1.2]} color={[0, 2, 2]} hasElevator={true} />

      {/* Traffic Particles */}
      <Traffic />
      <AerialDrones />
      
      {/* Environment Weather */}
      <MatrixRain />
      <RainRipples />

      {/* Cyber Grid Ground Plane */}
      <gridHelper args={[60, 40, '#00ff41', '#111122']} position={[0, 0, 0]} />
    </group>
  );
};

export default AetherCity;
