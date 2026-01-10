import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// DNA-like helix representing code/connection
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  
  const googleColors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];
  
  const spheres = useMemo(() => {
    const items = [];
    const count = 30;
    
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle1 = t * Math.PI * 4;
      const angle2 = angle1 + Math.PI;
      const y = (t - 0.5) * 6;
      
      // First strand
      items.push({
        position: [Math.cos(angle1) * 0.8, y, Math.sin(angle1) * 0.8] as [number, number, number],
        color: googleColors[i % 4],
        size: 0.08,
      });
      
      // Second strand
      items.push({
        position: [Math.cos(angle2) * 0.8, y, Math.sin(angle2) * 0.8] as [number, number, number],
        color: googleColors[(i + 2) % 4],
        size: 0.08,
      });
      
      // Connecting bars every 3rd sphere
      if (i % 3 === 0) {
        items.push({
          position: [0, y, 0] as [number, number, number],
          color: '#ffffff',
          size: 0.04,
          isConnector: true,
        });
      }
    }
    
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {spheres.map((sphere, i) => (
        <Sphere key={i} args={[sphere.size, 16, 16]} position={sphere.position}>
          <meshStandardMaterial 
            color={sphere.color}
            emissive={sphere.color}
            emissiveIntensity={0.2}
            metalness={0.5}
            roughness={0.3}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Floating particles around DNA
function FloatingDots() {
  const dotsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2 + Math.random() * 2;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (dotsRef.current) {
      dotsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={dotsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color="#4285F4"
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4285F4" />
      <DNAHelix />
      <FloatingDots />
    </>
  );
}

export default function AnimatedDNA() {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
