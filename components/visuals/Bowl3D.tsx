"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { palette } from "@/lib/palette";

const Z_SCALE = 0.35;
function bowl(x: number, y: number) {
  return (x * x + y * y) * Z_SCALE;
}

function Bowl() {
  const geometry = useMemo(() => {
    const seg = 100;
    const size = 6;
    const geo = new THREE.PlaneGeometry(size, size, seg, seg);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const cTop = new THREE.Color(palette.amber);
    const cMid = new THREE.Color("#34D399");
    const cBot = new THREE.Color(palette.teal);
    let zMax = 0;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = bowl(x, y);
      pos.setZ(i, z);
      zMax = Math.max(zMax, z);
    }
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      const t = THREE.MathUtils.clamp(z / zMax, 0, 1);
      const c = t < 0.5
        ? cBot.clone().lerp(cMid, t * 2)
        : cMid.clone().lerp(cTop, (t - 0.5) * 2);
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
      <meshStandardMaterial vertexColors roughness={0.78} side={THREE.DoubleSide} />
    </mesh>
  );
}

function BowlContours() {
  const lines = useMemo(() => {
    const levels = [0.5, 1.2, 2.0, 3.0, 4.0, 5.0];
    const out: THREE.Vector3[][] = [];
    for (const level of levels) {
      const ring: THREE.Vector3[] = [];
      const r = Math.sqrt(level / Z_SCALE);
      const N = 96;
      for (let i = 0; i <= N; i++) {
        const t = (i / N) * Math.PI * 2;
        ring.push(new THREE.Vector3(Math.cos(t) * r, level + 0.01, -Math.sin(t) * r));
      }
      out.push(ring);
    }
    return out;
  }, []);
  return (
    <group>
      {lines.map((points, i) => {
        const geom = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={i}>
            <primitive object={geom} attach="geometry" />
            <lineBasicMaterial color={palette.ink} transparent opacity={0.22} />
          </line>
        );
      })}
    </group>
  );
}

function Arrow({
  from,
  to,
  color,
  emissive = false,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  emissive?: boolean;
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
        <cylinderGeometry args={[0.055, 0.055, Math.max(len - 0.22, 0.01), 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.45 : 0}
        />
      </mesh>
      <mesh position={v2.toArray()} quaternion={quat}>
        <coneGeometry args={[0.13, 0.24, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.45 : 0}
        />
      </mesh>
    </group>
  );
}

function AutoRotate({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.1;
  });
  return <group ref={ref}>{children}</group>;
}

function PulsePoint({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 2.4) * 0.2;
    ref.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.14, 24, 24]} />
      <meshStandardMaterial
        color={palette.ink}
        emissive={palette.amber}
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

export function Bowl3D({ className }: { className?: string }) {
  const px = 1;
  const py = 2;
  const pz = bowl(px, py);
  const here: [number, number, number] = [px, pz + 0.05, -py];
  const gx = 2;
  const gy = 4;
  const glen = Math.hypot(gx, gy);
  const ux = gx / glen;
  const uy = gy / glen;
  const reach = 1.3;
  const tip: [number, number, number] = [
    px + ux * reach,
    bowl(px + ux * reach, py + uy * reach) + 0.05,
    -(py + uy * reach),
  ];

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [4.2, 4.2, 5.4], fov: 36 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <color attach="background" args={[palette.paper]} />
        <fog attach="fog" args={[palette.paper, 9, 18]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 9, 4]} intensity={1.3} />
        <directionalLight position={[-4, 3, -5]} intensity={0.3} color="#BFDBFE" />
        <AutoRotate>
          <Bowl />
          <BowlContours />
          <PulsePoint position={here} />
          <Arrow from={here} to={tip} color={palette.amber} emissive />
        </AutoRotate>
      </Canvas>
    </div>
  );
}
