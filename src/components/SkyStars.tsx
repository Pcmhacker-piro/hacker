import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Group, InstancedMesh, Object3D, Shape, SRGBColorSpace } from "three";

type Palette = { core: Color; trail: Color; gold: Color };

function ShootingStar({ index, palette }: { index: number; palette: Palette }) {
  const star = useRef<Group>(null);
  const trail = useRef<InstancedMesh>(null);
  const time = useRef(index * 3 + 1);
  const { viewport } = useThree();
  const dummy = useMemo(() => new Object3D(), []);
  const shape = useMemo(() => {
    const result = new Shape();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const radius = i % 2 === 0 ? 0.095 : 0.024;
      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle) * radius;
      if (i === 0) result.moveTo(x, y);
      else result.lineTo(x, y);
    }
    result.closePath();
    return result;
  }, []);

  useFrame((_, rawDelta) => {
    if (!star.current || !trail.current) return;
    time.current += Math.min(rawDelta, 0.05);
    const progress = (time.current % 11) / 11;
    const x = (progress * 1.5 - 0.75) * viewport.width;
    const y = viewport.height * (0.32 - index * 0.19 - progress * 0.25);
    const z = -index * 0.35;
    const fade = Math.min(progress * 10, (1 - progress) * 10, 1);
    star.current.position.set(x, y, z);
    star.current.rotation.set(0.2, time.current * 0.6, -0.4);
    star.current.scale.setScalar(fade * (1 - index * 0.16));
    for (let i = 0; i < 26; i++) {
      const distance = i * 0.035;
      dummy.position.set(x - distance, y + distance * 0.17, z);
      dummy.scale.setScalar(0.023 * (1 - i / 26) * fade);
      dummy.updateMatrix();
      trail.current.setMatrixAt(i, dummy.matrix);
    }
    trail.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <group ref={star}>
        <mesh>
          <extrudeGeometry args={[shape, { depth: 0.025, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 2, steps: 1 }]} />
          <meshStandardMaterial color={index === 1 ? palette.gold : palette.core} metalness={0.65} roughness={0.2} emissive={palette.core} emissiveIntensity={0.35} />
        </mesh>
      </group>
      <instancedMesh ref={trail} args={[undefined, undefined, 26]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshBasicMaterial color={index === 1 ? palette.gold : palette.trail} transparent opacity={0.65} depthWrite={false} />
      </instancedMesh>
    </>
  );
}

export default function SkyStars() {
  const [palette, setPalette] = useState<Palette | null>(null);
  useEffect(() => {
    // Resolve semantic OKLCH tokens through the browser before passing them to Three.
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d");
    if (!context) return;
    const styles = getComputedStyle(document.documentElement);
    const resolve = (token: string) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = styles.getPropertyValue(token).trim();
      context.fillRect(0, 0, 1, 1);
      const pixel = context.getImageData(0, 0, 1, 1).data;
      return new Color().setRGB(pixel[0] / 255, pixel[1] / 255, pixel[2] / 255, SRGBColorSpace);
    };
    setPalette({ core: resolve("--sky-star-core"), trail: resolve("--sky-star-trail"), gold: resolve("--sky-star-gold") });
  }, []);
  if (!palette) return null;
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 35 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 5]} intensity={2} />
      <Environment resolution={32}>
        <Lightformer intensity={2} position={[0, 4, 3]} scale={[6, 6, 1]} color={palette.core} />
        <Lightformer intensity={1} position={[-4, 1, 2]} scale={[3, 3, 1]} color={palette.trail} />
      </Environment>
      {[0, 1, 2].map((index) => <ShootingStar key={index} index={index} palette={palette} />)}
    </Canvas>
  );
}