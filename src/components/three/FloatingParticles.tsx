import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 50 }) {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const googleColors = [
      [0.259, 0.522, 0.957], // Blue
      [0.918, 0.263, 0.208], // Red
      [0.984, 0.737, 0.016], // Yellow
      [0.204, 0.659, 0.325], // Green
    ];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const color = googleColors[Math.floor(Math.random() * googleColors.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];
    }
    
    return { positions, colors };
  }, [count]);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingShape({ position, color, shape }: { position: [number, number, number], color: string, shape: 'sphere' | 'box' | 'torus' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {shape === 'sphere' && (
        <Sphere ref={meshRef} args={[0.3, 32, 32]} position={position}>
          <meshStandardMaterial color={color} transparent opacity={0.7} />
        </Sphere>
      )}
      {shape === 'box' && (
        <Box ref={meshRef} args={[0.4, 0.4, 0.4]} position={position}>
          <meshStandardMaterial color={color} transparent opacity={0.7} />
        </Box>
      )}
      {shape === 'torus' && (
        <Torus ref={meshRef} args={[0.3, 0.1, 16, 32]} position={position}>
          <meshStandardMaterial color={color} transparent opacity={0.7} />
        </Torus>
      )}
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Particles count={100} />
      
      <FloatingShape position={[-3, 2, -2]} color="#4285F4" shape="sphere" />
      <FloatingShape position={[3, -1, -3]} color="#EA4335" shape="box" />
      <FloatingShape position={[-2, -2, -1]} color="#FBBC04" shape="torus" />
      <FloatingShape position={[2, 2, -2]} color="#34A853" shape="sphere" />
      <FloatingShape position={[0, -3, -4]} color="#4285F4" shape="box" />
      <FloatingShape position={[-4, 0, -3]} color="#EA4335" shape="torus" />
    </>
  );
}

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
