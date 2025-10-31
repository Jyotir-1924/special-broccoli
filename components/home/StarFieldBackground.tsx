"use client";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function StarfieldBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars
          radius={100} // Size of the sphere
          depth={50}   // Star field depth
          count={5000} // Number of stars
          factor={4}   // Size factor
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}
