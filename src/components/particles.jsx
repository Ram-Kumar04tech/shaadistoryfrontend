import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Proper 2D heart shape using ShapeGeometry
function createHeartShape(size = 1, segments = 24) {
  const x = 0, y = 0;
  const heartShape = new THREE.Shape();

  heartShape.moveTo(x, y + size * 0.25);
  heartShape.bezierCurveTo(
    x, y + size * 0.25,
    x - size * 0.5, y,
    x - size * 0.5, y - size * 0.3
  );
  heartShape.bezierCurveTo(
    x - size * 0.5, y - size * 0.6,
    x, y - size * 0.6,
    x, y - size * 0.3
  );
  heartShape.bezierCurveTo(
    x, y - size * 0.6,
    x + size * 0.5, y - size * 0.6,
    x + size * 0.5, y - size * 0.3
  );
  heartShape.bezierCurveTo(
    x + size * 0.5, y,
    x, y + size * 0.25,
    x, y + size * 0.25
  );

  return new THREE.ShapeGeometry(heartShape, segments);
}

const Particles = (props) => {
  const heartsRef = useRef();

  // Create heart geometries
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }).map(() => {
      const size = 0.2 + Math.random() * 0.2;
      const segments = 24;
      return {
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        geometry: createHeartShape(size, segments),
        color: Math.random() > 0.5 ? '#f472b6' : '#7c6bb1',
        opacity: 0.7,
        speed: 0.2 + Math.random() * 0.3,
        amplitude: 0.5 + Math.random() * 1,
        phase: Math.random() * Math.PI * 2
      };
    });
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (heartsRef.current) {
      heartsRef.current.children.forEach((heart, i) => {
        const heartData = hearts[i];
        heart.position.x = heartData.position[0] + Math.sin(time * heartData.speed + heartData.phase) * heartData.amplitude * 0.3;
        heart.position.y = heartData.position[1] + Math.cos(time * heartData.speed + heartData.phase) * heartData.amplitude * 0.5;
        heart.position.z = heartData.position[2] + Math.sin(time * heartData.speed * 0.5 + heartData.phase) * heartData.amplitude * 0.4;
        heart.rotation.x = heartData.rotation[0] + time * 0.1;
        heart.rotation.y = heartData.rotation[1] + time * 0.15;
        const scale = 1 + Math.sin(time * 0.5 + heartData.phase) * 0.1;
        heart.scale.set(scale, scale, scale);
      });
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <group ref={heartsRef}>
        {hearts.map((heart, i) => (
          <mesh key={i} position={heart.position} rotation={heart.rotation} geometry={heart.geometry}>
            <meshBasicMaterial color={heart.color} transparent opacity={heart.opacity} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default Particles;