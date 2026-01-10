import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Google "G" made with 3D shapes
function GoogleG() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Blue arc (top right) */}
        <mesh position={[0.3, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <torusGeometry args={[0.8, 0.15, 16, 32, Math.PI / 2]} />
          <meshStandardMaterial color="#4285F4" metalness={0.3} roughness={0.4} />
        </mesh>
        
        {/* Red arc (top left to middle) */}
        <mesh position={[-0.3, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.8, 0.15, 16, 32, Math.PI / 2]} />
          <meshStandardMaterial color="#EA4335" metalness={0.3} roughness={0.4} />
        </mesh>
        
        {/* Yellow arc (bottom left) */}
        <mesh position={[-0.3, -0.3, 0]} rotation={[0, 0, Math.PI * 0.75]}>
          <torusGeometry args={[0.8, 0.15, 16, 32, Math.PI / 2]} />
          <meshStandardMaterial color="#FBBC04" metalness={0.3} roughness={0.4} />
        </mesh>
        
        {/* Green arc (bottom right) */}
        <mesh position={[0.3, -0.3, 0]} rotation={[0, 0, -Math.PI * 0.75]}>
          <torusGeometry args={[0.8, 0.15, 16, 32, Math.PI / 2]} />
          <meshStandardMaterial color="#34A853" metalness={0.3} roughness={0.4} />
        </mesh>
        
        {/* Blue horizontal bar */}
        <RoundedBox args={[0.6, 0.15, 0.15]} position={[0.5, 0, 0]} radius={0.05}>
          <meshStandardMaterial color="#4285F4" metalness={0.3} roughness={0.4} />
        </RoundedBox>
      </group>
    </Float>
  );
}

// Floating Google-colored orbs
function FloatingOrbs() {
  const orbsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const orbs = [
    { position: [2.5, 1, -1] as [number, number, number], color: '#4285F4', size: 0.15 },
    { position: [-2, 1.5, -0.5] as [number, number, number], color: '#EA4335', size: 0.12 },
    { position: [1.8, -1.2, 0] as [number, number, number], color: '#FBBC04', size: 0.18 },
    { position: [-2.2, -0.8, -1] as [number, number, number], color: '#34A853', size: 0.14 },
    { position: [0, 2, -2] as [number, number, number], color: '#4285F4', size: 0.1 },
    { position: [-1, -2, -1.5] as [number, number, number], color: '#EA4335', size: 0.16 },
  ];

  return (
    <group ref={orbsRef}>
      {orbs.map((orb, i) => (
        <Float key={i} speed={2 + i * 0.3} rotationIntensity={0.2} floatIntensity={0.8}>
          <Sphere args={[orb.size, 32, 32]} position={orb.position}>
            <meshStandardMaterial 
              color={orb.color} 
              emissive={orb.color}
              emissiveIntensity={0.3}
              metalness={0.5} 
              roughness={0.2} 
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4285F4" />
      <GoogleG />
      <FloatingOrbs />
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
