import { Canvas } from '@react-three/fiber';

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4285F4" />
    </>
  );
}

export default function GoogleLogo3D() {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
