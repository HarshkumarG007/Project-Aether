import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useAetherStore } from '../../store/useAetherStore';

const CameraController = ({ controlsRef }) => {
  const { camera } = useThree();
  const activeWindow = useAetherStore((state) => state.activeWindow);

  useEffect(() => {
    // Ensure OrbitControls is fully loaded before we try to animate it
    if (!controlsRef.current) return;

    // Default Home Coordinates (when all windows are closed)
    let targetPos = { x: 0, y: 4, z: 10 }; 
    let lookAtPos = { x: 0, y: 0, z: 0 };  

    // Determine where to fly based on the active window
    switch (activeWindow) {
      case 'terminal':
        targetPos = { x: -3, y: 1, z: 6 }; // Low and left
        lookAtPos = { x: 0, y: 2, z: 0 };  // Looking slightly up
        break;
      case 'ailab':
        targetPos = { x: 0, y: 1.5, z: 4 }; // Close up on the core
        lookAtPos = { x: 0, y: 4, z: 0 };   // Looking way up the spire
        break;
      case 'projects':
        targetPos = { x: 5, y: 6, z: 5 };  // High and right
        lookAtPos = { x: 0, y: 1, z: 0 };  // Looking down at the base
        break;
      case 'network':
        targetPos = { x: 0, y: 8, z: 8 };  // Top-down isometric
        lookAtPos = { x: 0, y: 3, z: 0 };
        break;
      default:
        break;
    }

    // 1. Animate the Camera's physical position
    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.5,
      ease: 'power3.inOut'
    });

    // 2. Animate where the Camera is pointing (OrbitControls target)
    gsap.to(controlsRef.current.target, {
      x: lookAtPos.x,
      y: lookAtPos.y,
      z: lookAtPos.z,
      duration: 1.5,
      ease: 'power3.inOut'
    });

  }, [activeWindow, camera, controlsRef]);

  return null; // This component doesn't render any 3D geometry
};

export default CameraController;