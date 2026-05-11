"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { palette } from "@/lib/palette";

/**
 * f(x,y) = x^2 + y^2, drawn over [-3,3]^2. Marker at (1, 2, 5).
 * Gradient ∇f(1,2) = ⟨2, 4⟩.
 */
function Bowl() {
  const geometry = useMemo(() => {
    const seg = 80;
    const size = 6;
    const geo = new THREE.PlaneGeometry(size, size, seg, seg);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const cTop = new THREE.Color(palette.amber);
    const cBot = new THREE.Color(palette.teal);
    let zMax = 0;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = (x * x + y * y) * 0.35;
      pos.setZ(i, z);
      zMax = Math.max(zMax, z);
    }
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      const t = THREE.MathUtils.clamp(z / zMax, 0, 1);
      const c = cBot.clone().lerp(cTop, t);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);
  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial vertexColors roughness={0.85} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Arrow({
  from,
  to,
  color,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
}) {
  const v1 = new THREE.Vector3(...from);
  const v2 = new THREE.Vector3(...to);
  const dir = v2.clone().sub(v1);
  const len = dir.length();
  const mid = v1.clone().add(dir.clone().multiplyScalar(0.5));
  const up = new THREE.Vector3(0, 1, 0);
  const quat = new THREE.Quaternion().setFromUnitVectors(up, dir.clone().normalize());
  return (
    <group>
      <mesh position={mid.toArray()} quaternion={quat}>
        <cylinderGeometry args={[0.05, 0.05, Math.max(len - 0.2, 0.01), 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={v2.toArray()} quaternion={quat}>
        <coneGeometry args={[0.12, 0.22, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export function Bowl3D({ className }: { className?: string }) {
  const px = 1;
  const py = 2;
  const pz = (px * px + py * py) * 0.35;
  const here: [number, number, number] = [px, pz + 0.05, -py];
  // Gradient at (1,2) is ⟨2,4⟩; scale for visuals.
  const gx = 2;
  const gy = 4;
  const glen = Math.hypot(gx, gy);
  const ux = gx / glen;
  const uy = gy / glen;
  const reach = 1.2;
  const tip: [number, number, number] = [
    px + ux * reach,
    (px + ux * reach) ** 2 * 0.35 + ((py + uy * reach) ** 2) * 0.35 + 0.05,
    -(py + uy * reach),
  ];

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [4, 4, 5.2], fov: 38 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <color attach="background" args={[palette.paper]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 8, 4]} intensity={1.1} />
        <directionalLight position={[-4, 3, -5]} intensity={0.3} />
        <Bowl />
        <mesh position={here}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshStandardMaterial color={palette.ink} />
        </mesh>
        <Arrow from={here} to={tip} color={palette.amber} />
      </Canvas>
    </div>
  );
}
