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

function SmallModel({ position, type, scale = 1 }: { position: [number, number, number]; type: 'plane' | 'kite' | 'cloud' | 'phone' | 'device'; scale?: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime + position[0]) * 0.25;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime + position[1]) * 0.1;
      // subtle bobbing
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {type === 'plane' && (
        <mesh rotation={[0.2, 0.5, 0]}>
          <coneGeometry args={[0.12, 0.6, 3]} />
          <meshStandardMaterial color="#4285F4" metalness={0.25} roughness={0.4} />
        </mesh>
      )}

      {type === 'kite' && (
        <group>
          <mesh rotation={[0, 0.3, 0]}> 
            <boxGeometry args={[0.22, 0.01, 0.22]} />
            <meshStandardMaterial color="#FB923C" />
          </mesh>
          <mesh position={[0, -0.14, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.28, 6]} />
            <meshStandardMaterial color="#6B7280" />
          </mesh>
        </group>
      )}

      {type === 'cloud' && (
        <group>
          <mesh position={[-0.12, 0, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#f3f4f6" />
          </mesh>
          <mesh position={[0.14, 0.05, 0]}>
            <sphereGeometry args={[0.14, 8, 8]} />
            <meshStandardMaterial color="#f3f4f6" />
          </mesh>
          <mesh position={[0.38, -0.02, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#f3f4f6" />
          </mesh>
        </group>
      )}

      {type === 'phone' && (
        <mesh>
          <boxGeometry args={[0.18, 0.28, 0.02]} />
          <meshStandardMaterial color="#111827" metalness={0.1} roughness={0.3} />
        </mesh>
      )}

      {type === 'device' && (
        <group>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.5, 0.05, 0.3]} />
            <meshStandardMaterial color="#E5E7EB" />
          </mesh>
          <mesh position={[0, 0.08, 0.02]}>
            <planeGeometry args={[0.44, 0.22]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
        </group>
      )}
    </group>
  );
}

function Scene() {
  // moved models further to the edges and separated them more to avoid overlapping the headline
  const models = [
    { position: [-6.0, 2.2, 2.0], type: 'cloud', scale: 1.6 },
    { position: [-5.0, 0.8, 1.8], type: 'plane', scale: 1.0 },
    { position: [-3.8, -1.0, 1.6], type: 'kite', scale: 1.0 },
    { position: [4.8, 2.0, 2.1], type: 'cloud', scale: 1.4 },
    { position: [5.2, 0.6, 2.0], type: 'kite', scale: 1.0 },
    { position: [4.6, -1.0, 2.2], type: 'device', scale: 1.0 },
    { position: [2.5, -2.2, 1.6], type: 'phone', scale: 0.9 },
    { position: [-5.2, -1.6, 1.9], type: 'plane', scale: 0.9 },
    { position: [3.6, 0.6, 1.8], type: 'kite', scale: 0.9 },
  ];

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 5]} intensity={1.0} />
      <hemisphereLight intensity={0.4} />

      <Particles count={140} />

      {/* existing floating shapes */}
      <FloatingShape position={[-3.5, 1.6, 1.2]} color="#4285F4" shape="sphere" />
      <FloatingShape position={[3.2, -0.8, 1.2]} color="#EA4335" shape="box" />
      <FloatingShape position={[-2.8, -1.6, 1.1]} color="#FBBC04" shape="torus" />
      <FloatingShape position={[2.8, 1.6, 1.2]} color="#34A853" shape="sphere" />

      {/* extra small decorative 3D models */}
      {models.map((m, i) => (
        <SmallModel key={i} position={m.position as [number, number, number]} type={m.type as any} scale={m.scale} />
      ))}
    </>
  );
}

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        className="pointer-events-none"
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
