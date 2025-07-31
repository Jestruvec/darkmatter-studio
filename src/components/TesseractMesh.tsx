import { type RootState, useFrame } from '@react-three/fiber';
import { Line, Sparkles } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface Props {
  color?: string;
  lineWidth?: number;
}

export const TesseractMesh = ({ color = 'grey', lineWidth = 3 }: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.Group>(null);
  const opacity = useRef(1);
  const [opacityDirection, setOpacityDirection] = useState(1);

  const vertices = [
    // Cubo exterior
    [-1, -1, -1, 1],
    [1, -1, -1, 1],
    [1, 1, -1, 1],
    [-1, 1, -1, 1],
    [-1, -1, 1, 1],
    [1, -1, 1, 1],
    [1, 1, 1, 1],
    [-1, 1, 1, 1],
    // Cubo interior
    [-1, -1, -1, -1],
    [1, -1, -1, -1],
    [1, 1, -1, -1],
    [-1, 1, -1, -1],
    [-1, -1, 1, -1],
    [1, -1, 1, -1],
    [1, 1, 1, -1],
    [-1, 1, 1, -1],
  ];

  const edges = [
    // Cubo exterior
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
    // Cubo interior
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 8],
    [12, 13],
    [13, 14],
    [14, 15],
    [15, 12],
    [8, 12],
    [9, 13],
    [10, 14],
    [11, 15],
    // Conexiones entre cubos
    [0, 8],
    [1, 9],
    [2, 10],
    [3, 11],
    [4, 12],
    [5, 13],
    [6, 14],
    [7, 15],
  ];

  const project4Dto3D = (vertex: number[]) => {
    const [x, y, z, w] = vertex;
    const scale = 1.5;
    const distance = 5;

    const perspective = distance / (distance - w);
    return [
      x * perspective * scale,
      y * perspective * scale,
      z * perspective * scale,
    ];
  };

  const rotateObj = (obj: THREE.Group, delta: number) => {
    obj.rotation.y += 0.01 * delta;
    obj.rotation.x += 0.01 * delta;
  };

  const pulseObj = (obj: THREE.Group) => {
    opacity.current += 0.005 * opacityDirection;

    if (opacity.current >= 1) {
      setOpacityDirection(-1);
    } else if (opacity.current <= 0) {
      setOpacityDirection(1);
    }

    obj.children.forEach((line: any) => {
      line.material.opacity = opacity.current;
    });
  };

  const animate = (state: RootState) => {
    const delta = state.clock.getDelta();

    if (groupRef.current) {
      rotateObj(groupRef.current, delta);
    }

    if (linesRef.current) {
      pulseObj(linesRef.current);
    }
  };

  useFrame(animate);

  return (
    <group ref={groupRef} scale={[2, 2, 2]}>
      <Sparkles
        position={[0, 0, 0]}
        count={50}
        size={5}
        scale={[2, 2, 2]}
        color="gray"
      />

      <group ref={linesRef}>
        {edges.map((edge, index) => {
          const [i, j] = edge;
          const start = project4Dto3D(vertices[i]);
          const end = project4Dto3D(vertices[j]);

          return (
            <Line
              key={index}
              points={[new THREE.Vector3(...start), new THREE.Vector3(...end)]}
              color={color}
              lineWidth={lineWidth}
              transparent={true}
            />
          );
        })}
      </group>
    </group>
  );
};
