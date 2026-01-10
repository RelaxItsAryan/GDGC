import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Animated wave grid background
function Grid() {
  const meshRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const gridSize = 30;
    const spacing = 0.4;
    const count = gridSize * gridSize;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const googleColors = [
      [0.259, 0.522, 0.957], // Blue #4285F4
      [0.918, 0.263, 0.208], // Red #EA4335
      [0.984, 0.737, 0.016], // Yellow #FBBC04
      [0.204, 0.659, 0.325], // Green #34A853
    ];
    
    let i = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        positions[i * 3] = (x - gridSize / 2) * spacing;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (z - gridSize / 2) * spacing;
        
        const color = googleColors[(x + z) % 4];
        colors[i * 3] = color[0];
        colors[i * 3 + 1] = color[1];
        colors[i * 3 + 2] = color[2];
        
        i++;
      }
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      const gridSize = 30;
      
      let i = 0;
      for (let x = 0; x < gridSize; x++) {
        for (let z = 0; z < gridSize; z++) {
          const xPos = positions[i * 3];
          const zPos = positions[i * 3 + 2];
          positions[i * 3 + 1] = 
            Math.sin(xPos * 0.5 + time) * 0.3 + 
            Math.cos(zPos * 0.5 + time * 0.8) * 0.3;
          i++;
        }
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
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
        size={0.08} 
        vertexColors
        transparent 
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Grid />
    </>
  );
}

export default function WaveGrid() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas
        camera={{ position: [0, 5, 8], fov: 60, rotation: [-0.5, 0, 0] }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
