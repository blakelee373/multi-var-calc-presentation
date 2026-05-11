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

// f(x, y) = A * exp(-B * ((x-CX)^2 + (y-CY)^2)) - 0.8
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

// Surface is rotated -π/2 around X, so:
//   input-x  → world +x
//   input-y  → world -z
//   height z → world +y
function toWorld(xIn: number, yIn: number): [number, number, number] {
  return [xIn, f(xIn, yIn), -yIn];
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
      const c =
        t < 0.5
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
          function add(
            a: number,
            b: number,
            ax: number,
            ay: number,
            bx: number,
            by: number
          ) {
            if ((a < 0) !== (b < 0)) {
              const t = a / (a - b);
              edges.push(
                new THREE.Vector3(
                  ax + (bx - ax) * t,
                  level + 0.01,
                  -(ay + (by - ay) * t)
                )
              );
            }
          }
          add(v00, v10, x0, y0, x1, y0);
          add(v10, v11, x1, y0, x1, y1);
          add(v11, v01, x1, y1, x0, y1);
          add(v01, v00, x0, y1, x0, y0);
          if (edges.length === 2) segments.push(edges[0], edges[1]);
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
            <lineBasicMaterial color={palette.ink} transparent opacity={0.18} />
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
  thickness = 0.05,
  headSize = 0.22,
  emissive = false,
  delay = 0,
  duration = 0.9,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  thickness?: number;
  headSize?: number;
  emissive?: boolean;
  delay?: number;
  duration?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const startRef = useRef<number | null>(null);

  const { mid, len, quat, localMid, localTip } = useMemo(() => {
    const v1 = new THREE.Vector3(...from);
    const v2 = new THREE.Vector3(...to);
    const d = v2.clone().sub(v1);
    const l = d.length();
    const m = v1.clone().add(d.clone().multiplyScalar(0.5));
    const up = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(up, d.clone().normalize());
    return {
      mid: m,
      len: l,
      quat: q,
      localMid: m.clone().sub(v1),
      localTip: v2.clone().sub(v1),
    };
  }, [from, to]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    if (startRef.current == null) startRef.current = clock.elapsedTime;
    const t = clock.elapsedTime - startRef.current - delay;
    const p = Math.max(0, Math.min(1, t / duration));
    groupRef.current.scale.set(p, p, p);
  });

  if (len < 0.001) return null;

  return (
    <group ref={groupRef} position={from}>
      <mesh position={localMid.toArray()} quaternion={quat}>
        <cylinderGeometry
          args={[thickness, thickness, Math.max(len - headSize, 0.01), 16]}
        />
        <meshStandardMaterial
          color={color}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.4 : 0}
          roughness={0.45}
        />
      </mesh>
      <mesh position={localTip.toArray()} quaternion={quat}>
        <coneGeometry args={[headSize * 0.55, headSize, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.4 : 0}
          roughness={0.45}
        />
      </mesh>
      {/* avoid unused-var TS warning for mid */}
      <group visible={false} position={mid.toArray()} />
    </group>
  );
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
    if (ref.current && enabled) ref.current.rotation.y += dt * 0.12;
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
      <sphereGeometry args={[0.13, 24, 24]} />
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
  // Sample point on the descending flank.
  const px = 1.4;
  const py = -1.0;
  const here = toWorld(px, py);
  // lift arrows slightly above surface for visibility
  const ARROW_LIFT = 0.06;
  const lifted: [number, number, number] = [
    here[0],
    here[1] + ARROW_LIFT,
    here[2],
  ];

  // Gradient direction in input space
  const gx = fx(px, py);
  const gy = fy(px, py);
  const glen = Math.hypot(gx, gy) || 1;
  const ugx = gx / glen;
  const ugy = gy / glen;

  // Length of demo arrows in INPUT space (not lifted up the surface)
  const LEN = 1.2;
  // Partial arrows: pure +x and pure +y (input) directions, flat
  const fxTip: [number, number, number] = [px + LEN, lifted[1], -py];
  const fyTip: [number, number, number] = [px, lifted[1], -(py + LEN)];
  // Gradient arrow: flat in input plane along (ugx, ugy)
  const gradTip: [number, number, number] = [
    px + ugx * LEN,
    lifted[1],
    -(py + ugy * LEN),
  ];

  // Rotate every mode — the arrows still represent their input-space
  // directions; viewer perspective just changes.
  const wantsRotation = rotate;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [4.8, 4.4, 5.8], fov: 36 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <color attach="background" args={[palette.paper]} />
        <fog attach="fog" args={[palette.paper, 9, 18]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 9, 4]} intensity={1.25} />
        <directionalLight
          position={[-4, 3, -5]}
          intensity={0.3}
          color="#BFDBFE"
        />

        <AutoRotate enabled={wantsRotation}>
          <Surface />
          <ContourLines />

          {mode !== "static" && <PulseSphere position={lifted} />}

          {/* CANDIDATES (many) */}
          {mode === "many" &&
            Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              const cx = Math.cos(a);
              const cy = Math.sin(a);
              const tip: [number, number, number] = [
                px + cx * 0.6,
                lifted[1],
                -(py + cy * 0.6),
              ];
              return (
                <Arrow
                  key={i}
                  from={lifted}
                  to={tip}
                  color={palette.slate}
                  thickness={0.025}
                  headSize={0.14}
                />
              );
            })}

          {/* BEST: many faded + one amber */}
          {mode === "best" && (
            <>
              {Array.from({ length: 10 }).map((_, i) => {
                const a = (i / 10) * Math.PI * 2;
                const cx = Math.cos(a);
                const cy = Math.sin(a);
                const tip: [number, number, number] = [
                  px + cx * 0.55,
                  lifted[1],
                  -(py + cy * 0.55),
                ];
                return (
                  <Arrow
                    key={i}
                    from={lifted}
                    to={tip}
                    color="#CBD5E1"
                    thickness={0.018}
                    headSize={0.1}
                  />
                );
              })}
              <Arrow
                from={lifted}
                to={gradTip}
                color={palette.amber}
                thickness={0.055}
                headSize={0.26}
                emissive
              />
            </>
          )}

          {/* PARTIALS: flat +x and +y arrows (no in-3D labels; caption is in HTML) */}
          {mode === "partials" && (
            <>
              <Arrow
                from={lifted}
                to={fxTip}
                color={palette.teal}
                thickness={0.07}
                headSize={0.3}
                emissive
                delay={0.2}
              />
              <Arrow
                from={lifted}
                to={fyTip}
                color="#0F766E"
                thickness={0.07}
                headSize={0.3}
                emissive
                delay={0.8}
              />
            </>
          )}

          {/* GRADIENT: partials + ∇f arrow (caption in HTML) */}
          {mode === "gradient" && (
            <>
              <Arrow
                from={lifted}
                to={[px + LEN * 0.65, lifted[1], -py]}
                color={palette.teal}
                thickness={0.045}
                headSize={0.2}
                delay={0.2}
              />
              <Arrow
                from={lifted}
                to={[px, lifted[1], -(py + LEN * 0.65)]}
                color="#0F766E"
                thickness={0.045}
                headSize={0.2}
                delay={0.7}
              />
              <Arrow
                from={lifted}
                to={gradTip}
                color={palette.amber}
                thickness={0.075}
                headSize={0.34}
                emissive
                delay={1.2}
                duration={1.0}
              />
            </>
          )}
        </AutoRotate>

        {interactive && <OrbitControls enablePan={false} />}
      </Canvas>
    </div>
  );
}
