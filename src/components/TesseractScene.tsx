import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { TesseractMesh } from './TesseractMesh';

export const TesseractScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 40 }} gl={{ antialias: true }}>
      <TesseractMesh />
      <OrbitControls enableRotate autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};
