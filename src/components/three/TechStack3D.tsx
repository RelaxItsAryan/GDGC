import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center, RoundedBox, Cylinder, Cone, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// Spinning tech cube representing different technologies
function TechCube({ position, color, label }: { 
  position: [number, number, number]; 
  color: string;
  label: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <RoundedBox
        ref={meshRef}
        args={[0.6, 0.6, 0.6]}
        position={position}
        radius={0.08}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={color} 
          metalness={0.4} 
          roughness={0.3}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </RoundedBox>
    </Float>
  );
}

// Floating hexagon representing Web
function Hexagon({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <Cylinder
        ref={meshRef}
        args={[0.4, 0.4, 0.15, 6]}
        position={position}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </Cylinder>
    </Float>
  );
}

// Floating pyramid for ML/AI
function Pyramid({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.7}>
      <Cone
        ref={meshRef}
        args={[0.4, 0.7, 4]}
        position={position}
      >
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
      </Cone>
    </Float>
  );
}

// Icosahedron for Cloud
function CloudShape({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Icosahedron
        ref={meshRef}
        args={[0.35]}
        position={position}
      >
        <meshStandardMaterial 
          color={color} 
          metalness={0.6} 
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </Icosahedron>
    </Float>
  );
}

// Orbiting ring
function OrbitRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.5, 0.02, 16, 100]} />
      <meshStandardMaterial color="#4285F4" transparent opacity={0.4} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#EA4335" />
      <pointLight position={[0, -10, 5]} intensity={0.3} color="#34A853" />
      
      <OrbitRing />
      
      {/* Flutter/Mobile - Blue cube */}
      <TechCube position={[-1.8, 0.8, 0]} color="#4285F4" label="Flutter" />
      
      {/* Firebase - Yellow hexagon */}
      <Hexagon position={[1.8, 0.5, 0.5]} color="#FBBC04" />
      
      {/* ML/AI - Red pyramid */}
      <Pyramid position={[0, -1.2, 0]} color="#EA4335" />
      
      {/* Cloud - Green icosahedron */}
      <CloudShape position={[-1.5, -0.8, 0.5]} color="#34A853" />
      
      {/* Web - Blue cube */}
      <TechCube position={[1.5, -0.5, -0.5]} color="#4285F4" label="Web" />
      
      {/* Android - Green hexagon */}
      <Hexagon position={[0, 1.5, -0.5]} color="#34A853" />
    </>
  );
}

export default function TechStack3D() {
  return (
    <div className="w-full h-[350px] md:h-[450px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
