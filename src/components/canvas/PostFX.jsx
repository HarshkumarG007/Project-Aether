import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useAetherStore } from '../../store/useAetherStore';

const PostFX = () => {
  const deviceTier = useAetherStore((state) => state.deviceTier);

  // If minimal, we skip post-processing entirely for performance.
  if (deviceTier === 'minimal') {
    return null;
  }

  // If reduced, we lower the intensity and threshold.
  const intensity = deviceTier === 'reduced' ? 0.8 : 1.5;
  const luminanceThreshold = deviceTier === 'reduced' ? 1.2 : 1.0;

  return (
    <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={luminanceThreshold} intensity={intensity} />
    </EffectComposer>
  );
};

export default PostFX;
