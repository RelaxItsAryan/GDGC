import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import gdgcLogo from '@/assets/gdgc-logo.png';


// 3D plane with logo texture and glow
function LogoPlane() {
  const texture = useLoader(TextureLoader, gdgcLogo);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
    }
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group>
      {/* Glow behind logo */}
      <mesh ref={glowRef} position={[0, 0, -0.08]}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial color="#4285F4" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Logo image */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial map={texture} transparent />
        </mesh>
      </Float>
    </group>
  );
}

// Matrix-like falling particles
function MatrixRain() {
  const pointsRef = useRef<THREE.Points>(null);
  const velocities = useRef<Float32Array>();

  const { positions, colors } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    velocities.current = new Float32Array(count);

    const googleColors = [
      [0.259, 0.522, 0.957], // Blue
      [0.918, 0.263, 0.208], // Red
      [0.984, 0.737, 0.016], // Yellow
      [0.204, 0.659, 0.325], // Green
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = Math.random() * 6 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

      const color = googleColors[Math.floor(Math.random() * 4)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];

      velocities.current[i] = 0.5 + Math.random() * 1.5;
    }

    return { positions, colors };
  }, []);

  useFrame(() => {
    if (pointsRef.current && velocities.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] -= velocities.current[i] * 0.02;

        if (positions[i * 3 + 1] < -2) {
          positions[i * 3 + 1] = 5;
          positions[i * 3] = (Math.random() - 0.5) * 4;
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Holographic projector base
function HolographicBase() {
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ringRef1.current) ringRef1.current.rotation.z = time * 0.3;
    if (ringRef2.current) ringRef2.current.rotation.z = -time * 0.4;
    if (ringRef3.current) ringRef3.current.rotation.z = time * 0.2;
  });

  return (
    <group position={[0, -2.2, 0]}>
      {/* Base platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 0.15, 64]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Glowing rings */}
      <mesh ref={ringRef1} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <torusGeometry args={[1.3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#4285F4" transparent opacity={0.8} />
      </mesh>
      
      <mesh ref={ringRef2} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
        <torusGeometry args={[1.1, 0.015, 16, 100]} />
        <meshBasicMaterial color="#34A853" transparent opacity={0.6} />
      </mesh>
      
      <mesh ref={ringRef3} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.14, 0]}>
        <torusGeometry args={[0.9, 0.01, 16, 100]} />
        <meshBasicMaterial color="#FBBC04" transparent opacity={0.5} />
      </mesh>

      {/* Light beam */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.8, 1.2, 3, 32, 1, true]} />
        <meshBasicMaterial 
          color="#4285F4" 
          transparent 
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Chromatic aberration / glitch lines
function GlitchLines() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, i) => {
        const time = state.clock.elapsedTime;
        const mesh = line as THREE.Mesh;
        mesh.position.x = Math.sin(time * 3 + i) * 0.05;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.1 + Math.sin(time * 5 + i * 2) * 0.1;
      });
    }
  });

  return (
    <group ref={linesRef}>
      {[...Array(15)].map((_, i) => (
        <mesh key={i} position={[(i - 7) * 0.3, 0, 0.5]}>
          <planeGeometry args={[0.01, 4]} />
          <meshBasicMaterial 
            color={i % 3 === 0 ? '#EA4335' : i % 3 === 1 ? '#4285F4' : '#34A853'} 
            transparent 
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Ambient floating particles
function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2 + Math.random() * 2;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#4285F4"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#4285F4" />
      <pointLight position={[0, -2, 3]} intensity={0.3} color="#34A853" />

      <MatrixRain />
      <GlitchLines />
      <AmbientParticles />
      <HolographicBase />

      {/* 3D logo plane with holographic effects */}
      <group ref={groupRef} position={[0, 0.3, 0]}>
        <LogoPlane />
      </group>
    </>
  );
}

export default function HolographicLogo() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
