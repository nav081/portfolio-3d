import { Canvas } from '@react-three/fiber';
import { Environment, Float, Lightformer, MeshDistortMaterial } from '@react-three/drei';

function Sculpture() {
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh>
        <icosahedronGeometry args={[1.2, 24]} />
        <MeshDistortMaterial color="#2a2733" roughness={0.25} metalness={0.8} distort={0.35} speed={1.6} />
      </mesh>
    </Float>
  );
}

export function HeroSculpture() {
  const narrow = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
  return (
    <Canvas
      camera={{ position: [0, 0, narrow ? 5.4 : 4.2], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={3} position={[0, 5, -4]} scale={[10, 2, 1]} />
        <Lightformer intensity={1.5} position={[-5, 0, 2]} scale={[2, 6, 1]} />
        <Lightformer intensity={2} position={[5, 1, 3]} scale={[2, 6, 1]} />
      </Environment>
      <Sculpture />
    </Canvas>
  );
}
