import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useAetherStore } from '../../store/useAetherStore';

const CameraRig = ({ controlsRef }) => {
  const { camera } = useThree();
  const cameraTarget = useAetherStore((state) => state.cameraTarget);

  useEffect(() => {
    if (!controlsRef.current) return;

    let targetPos = { x: 0, y: 4, z: 10 };
    let lookAtPos = { x: 0, y: 0, z: 0 };
    
    if (Array.isArray(cameraTarget)) {
        targetPos = { x: cameraTarget[0], y: cameraTarget[1], z: cameraTarget[2] };
    } else if (cameraTarget && cameraTarget.position) {
        targetPos = { x: cameraTarget.position[0], y: cameraTarget.position[1], z: cameraTarget.position[2] };
        if (cameraTarget.lookAt) {
            lookAtPos = { x: cameraTarget.lookAt[0], y: cameraTarget.lookAt[1], z: cameraTarget.lookAt[2] };
        }
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 0.2 : 1.5;
    const ease = prefersReducedMotion ? 'power1.out' : 'power3.inOut';

    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration,
      ease
    });

    gsap.to(controlsRef.current.target, {
      x: lookAtPos.x,
      y: lookAtPos.y,
      z: lookAtPos.z,
      duration,
      ease
    });

  }, [cameraTarget, camera, controlsRef]);

  return null;
};

export default CameraRig;
