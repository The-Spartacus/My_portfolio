import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';


const Particles = () => {
  const ref = useRef();

  const count = 200;

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities.push({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      });
    }

    return [positions, velocities];
  }, []);

  useFrame(() => {
    const positionArray = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      positionArray[i * 3] += velocities[i].x;
      positionArray[i * 3 + 1] += velocities[i].y;
      positionArray[i * 3 + 2] += velocities[i].z;

      // Boundary check
      if (Math.abs(positionArray[i * 3]) > 10) velocities[i].x *= -1;
      if (Math.abs(positionArray[i * 3 + 1]) > 10) velocities[i].y *= -1;
      if (Math.abs(positionArray[i * 3 + 2]) > 5) velocities[i].z *= -1;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y += 0.001;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#3b82f6"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;