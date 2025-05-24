import { TesseractMesh } from "@/components";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const TesseractScene = () => {
  return (
    <Canvas
      className="bg-gray-950  shadow-2xl cursor-grab"
      camera={{ position: [5, 5, 10], fov: 50 }}
      gl={{ antialias: true }}
    >
      <TesseractMesh color="white" rotate pulse sparkless />
      <OrbitControls enableRotate={true} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};
