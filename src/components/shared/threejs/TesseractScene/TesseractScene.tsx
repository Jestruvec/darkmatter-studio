import { TesseractMesh } from "@/components";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const TesseractScene = () => {
  return (
    <Canvas
      className="cursor-grab"
      camera={{ position: [0, 0, 20], fov: 40 }}
      gl={{ antialias: true }}
    >
      <TesseractMesh rotate pulse sparkless />
      <OrbitControls enableRotate={true} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};
