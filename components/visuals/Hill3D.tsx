"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { palette } from "@/lib/palette";

type Mode = "many" | "best" | "partials" | "gradient" | "static";

type Hill3DProps = {
  mode: Mode;
  className?: string;
  interactive?: boolean;
  rotate?: boolean;
};

const A = 4;
const B = 0.6;
const CX = 0.4;
const CY = 0.2;
function f(x: number, y: number) {
  return A * Math.exp(-B * ((x - CX) ** 2 + (y - CY) ** 2)) - 0.8;
}
function fx(x: number, y: number) {
  return -2 * B * (x - CX) * (f(x, y) + 0.8);
}
function fy(x: number, y: number) {
  return -2 * B * (y - CY) * (f(x, y) + 0.8);
}

function Surface() {
  const geometry = useMemo(() => {
    const seg = 100;
    const size = 6;
    const geo = new THREE.PlaneGeometry(size, size, seg, seg);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const cTop = new THREE.Color(palette.amber);
    const cMid = new THREE.Color("#34D399");
    const cBot = new THREE.Color(palette.teal);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = f(x, y);
      pos.setZ(i, z);
      const t = THREE.MathUtils.clamp((z + 0.8) / (A + 0.8), 0, 1);
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
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
      <meshStandardMaterial
        vertexColors
        flatShading={false}
        roughness={0.78}
        metalness={0.05}
      />
    </mesh>
  );
}

function ContourLines() {
  const lines = useMemo(() => {
    const result: { points: THREE.Vector3[] }[] = [];
    const levels = [0, 0.6, 1.2, 1.8, 2.4, 3.0];
    const grid = 140;
    const range = 3;
    const step = (range * 2) / grid;
    for (const level of levels) {
      const segments: THREE.Vector3[] = [];
      // marching squares
      for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
          const x0 = -range + i * step;
          const x1 = x0 + step;
          const y0 = -range + j * step;
          const y1 = y0 + step;
          const v00 = f(x0, y0) - level;
          const v10 = f(x1, y0) - level;
          const v11 = f(x1, y1) - level;
          const v01 = f(x0, y1) - level;
          const edges: THREE.Vector3[] = [];
          function add(a: number, b: number, ax: number, ay: number, bx: number, by: number) {
            if ((a < 0) !== (b < 0)) {
              const t = a / (a - b);
              edges.push(new THREE.Vector3(
                ax + (bx - ax) * t,
                level + 0.01,
                -(ay + (by - ay) * t)
              ));
            }
          }
          add(v00, v10, x0, y0, x1, y0);
          add(v10, v11, x1, y0, x1, y1);
          add(v11, v01, x1, y1, x0, y1);
          add(v01, v00, x0, y1, x0, y0);
          if (edges.length === 2) {
            segments.push(edges[0], edges[1]);
          }
        }
      }
      result.push({ points: segments });
    }
    return result;
  }, []);

  return (
    <group>
      {lines.map((l, idx) => {
        const geom = new THREE.BufferGeometry().setFromPoints(l.points);
        return (
          <lineSegments key={idx} geometry={geom}>
            <lineBasicMaterial
              color={palette.ink}
              transparent
              opacity={0.18}
            />
          </lineSegments>
        );
      })}
    </group>
  );
}

function Arrow({
  from,
  to,
  color,
  thickness = 0.045,
  headSize = 0.2,
  emissive = false,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  thickness?: number;
  headSize?: number;
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
        <cylinderGeometry args={[thickness, thickness, Math.max(len - headSize, 0.01), 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.45 : 0}
          roughness={0.4}
        />
      </mesh>
      <mesh position={v2.toArray()} quaternion={quat}>
        <coneGeometry args={[headSize * 0.55, headSize, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.45 : 0}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

function originAt(x: number, y: number): [number, number, number] {
  return [x, f(x, y) + 0.06, -y];
}

function offset(
  origin: [number, number, number],
  dx: number,
  dz: number,
  scale = 0.7
): [number, number, number] {
  const x = origin[0] + dx * scale;
  const yw = -origin[2] + dz * scale;
  return [x, f(x, yw) + 0.06, -yw];
}

function AutoRotate({
  children,
  enabled,
}: {
  children: React.ReactNode;
  enabled: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current && enabled) {
      ref.current.rotation.y += dt * 0.12;
    }
  });
  return <group ref={ref}>{children}</group>;
}

function PulseSphere({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 2.4) * 0.18;
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

export function Hill3D({
  mode,
  className,
  interactive = false,
  rotate = true,
}: Hill3DProps) {
  const px = 1.4;
  const py = -1.0;
  const here = originAt(px, py);
  const gx = fx(px, py);
  const gy = fy(px, py);
  const glen = Math.hypot(gx, gy) || 1;
  const ugx = gx / glen;
  const ugy = gy / glen;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [4.8, 4.4, 5.8], fov: 36 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        shadows
      >
        <color attach="background" args={[palette.paper]} />
        <fog attach="fog" args={[palette.paper, 9, 18]} />
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[6, 9, 4]}
          intensity={1.3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-4, 3, -5]} intensity={0.3} color="#BFDBFE" />

        <AutoRotate enabled={rotate}>
          <Surface />
          <ContourLines />

          {mode !== "static" && <PulseSphere position={here} />}

          {mode === "many" &&
            Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              const dx = Math.cos(a);
              const dz = Math.sin(a);
              const tip = offset(here, dx, dz, 0.55);
              return (
                <Arrow
                  key={i}
                  from={here}
                  to={tip}
                  color={palette.slate}
                  thickness={0.025}
                  headSize={0.14}
                />
              );
            })}

          {mode === "best" && (
            <>
              {Array.from({ length: 10 }).map((_, i) => {
                const a = (i / 10) * Math.PI * 2;
                const dx = Math.cos(a);
                const dz = Math.sin(a);
                const tip = offset(here, dx, dz, 0.5);
                return (
                  <Arrow
                    key={i}
                    from={here}
                    to={tip}
                    color="#CBD5E1"
                    thickness={0.018}
                    headSize={0.1}
                  />
                );
              })}
              <Arrow
                from={here}
                to={offset(here, ugx, ugy, 1.1)}
                color={palette.amber}
                thickness={0.055}
                headSize={0.26}
                emissive
              />
            </>
          )}

          {mode === "partials" && (
            <>
              <Arrow
                from={here}
                to={offset(here, 1, 0, 1.0)}
                color={palette.teal}
                thickness={0.05}
                headSize={0.22}
                emissive
              />
              <Arrow
                from={here}
                to={offset(here, 0, 1, 1.0)}
                color="#0F766E"
                thickness={0.05}
                headSize={0.22}
                emissive
              />
            </>
          )}

          {mode === "gradient" && (
            <>
              <Arrow
                from={here}
                to={offset(here, 1, 0, 0.7)}
                color={palette.teal}
                thickness={0.032}
                headSize={0.15}
              />
              <Arrow
                from={here}
                to={offset(here, 0, 1, 0.7)}
                color="#0F766E"
                thickness={0.032}
                headSize={0.15}
              />
              <Arrow
                from={here}
                to={offset(here, ugx, ugy, 1.15)}
                color={palette.amber}
                thickness={0.06}
                headSize={0.28}
                emissive
              />
            </>
          )}
        </AutoRotate>

        {interactive && <OrbitControls enablePan={false} />}
      </Canvas>
    </div>
  );
}
