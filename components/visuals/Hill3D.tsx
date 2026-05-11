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
};

const A = 4;
const B = 0.6;
const CX = 0.4;
const CY = 0.2;
function f(x: number, y: number) {
  return A * Math.exp(-B * ((x - CX) ** 2 + (y - CY) ** 2)) - 0.8;
}
function fxAt(x: number, y: number) {
  return -2 * B * (x - CX) * (f(x, y) + 0.8);
}
function fyAt(x: number, y: number) {
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
      <meshStandardMaterial vertexColors roughness={0.78} metalness={0.05} />
    </mesh>
  );
}

function ContourLines() {
  const lines = useMemo(() => {
    const result: THREE.Vector3[][] = [];
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
      result.push(segments);
    }
    return result;
  }, []);
  return (
    <group>
      {lines.map((points, idx) => {
        const geom = new THREE.BufferGeometry().setFromPoints(points);
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
  onTop = false,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  thickness?: number;
  headSize?: number;
  emissive?: boolean;
  delay?: number;
  duration?: number;
  onTop?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const startRef = useRef<number | null>(null);
  const { len, quat, localMid, localTip } = useMemo(() => {
    const v1 = new THREE.Vector3(...from);
    const v2 = new THREE.Vector3(...to);
    const d = v2.clone().sub(v1);
    const l = d.length();
    const m = v1.clone().add(d.clone().multiplyScalar(0.5));
    const up = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(
      up,
      d.clone().normalize()
    );
    return {
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
  const renderOrder = onTop ? 10 : 0;
  return (
    <group ref={groupRef} position={from}>
      <mesh
        position={localMid.toArray()}
        quaternion={quat}
        renderOrder={renderOrder}
      >
        <cylinderGeometry
          args={[thickness, thickness, Math.max(len - headSize, 0.01), 16]}
        />
        <meshStandardMaterial
          color={color}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.4 : 0}
          roughness={0.45}
          depthTest={!onTop}
          transparent={onTop}
          opacity={onTop ? 0.92 : 1}
        />
      </mesh>
      <mesh
        position={localTip.toArray()}
        quaternion={quat}
        renderOrder={renderOrder}
      >
        <coneGeometry args={[headSize * 0.55, headSize, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.4 : 0}
          roughness={0.45}
          depthTest={!onTop}
          transparent={onTop}
          opacity={onTop ? 0.92 : 1}
        />
      </mesh>
    </group>
  );
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
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

export function Hill3D({ mode, className, interactive = false }: Hill3DProps) {
  // Sample at (1.4, 1.4) in input space (on the descending side of the
  // bump). After the scene's 180° Y rotation below, this lands in the
  // front of the camera; +x and +y partials extend toward the viewer
  // and read clearly.
  const px = 1.4;
  const py = 1.4;
  const sampleY = f(px, py);
  const ARROW_LIFT = 0.08;
  const Yarrow = sampleY + ARROW_LIFT;

  const here: [number, number, number] = [px, sampleY, -py];
  const armOrigin: [number, number, number] = [px, Yarrow, -py];

  const gx = fxAt(px, py);
  const gy = fyAt(px, py);
  const glen = Math.hypot(gx, gy) || 1;
  const ugx = gx / glen;
  const ugy = gy / glen;

  const LEN = 1.2;
  const fxTip: [number, number, number] = [px + LEN, Yarrow, -py];
  const fyTip: [number, number, number] = [px, Yarrow, -(py + LEN)];
  const gradTip: [number, number, number] = [
    px + ugx * LEN,
    Yarrow,
    -(py + ugy * LEN),
  ];

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [5.6, 4.6, 6.0], fov: 38 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <color attach="background" args={[palette.paper]} />
        <fog attach="fog" args={[palette.paper, 10, 20]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 9, 4]} intensity={1.25} />
        <directionalLight position={[-4, 3, -5]} intensity={0.3} color="#BFDBFE" />

        {/* 180° rotation around Y brings the sample to the camera-facing
            side of the hill. Without it, the sample (and its arrows) sit
            behind the bump and read as missing in the still frame. */}
        <group rotation={[0, (3 * Math.PI) / 2, 0]}>
          <Surface />
          <ContourLines />

          {mode !== "static" && <PulseSphere position={here} />}

          {mode === "many" &&
            Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              const tip: [number, number, number] = [
                px + Math.cos(a) * 0.6,
                Yarrow,
                -(py + Math.sin(a) * 0.6),
              ];
              return (
                <Arrow
                  key={i}
                  from={armOrigin}
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
                const tip: [number, number, number] = [
                  px + Math.cos(a) * 0.55,
                  Yarrow,
                  -(py + Math.sin(a) * 0.55),
                ];
                return (
                  <Arrow
                    key={i}
                    from={armOrigin}
                    to={tip}
                    color="#CBD5E1"
                    thickness={0.018}
                    headSize={0.1}
                  />
                );
              })}
              <Arrow
                from={armOrigin}
                to={gradTip}
                color={palette.amber}
                thickness={0.055}
                headSize={0.26}
                emissive
                onTop
              />
            </>
          )}

          {mode === "partials" && (
            <>
              <Arrow
                from={armOrigin}
                to={fxTip}
                color={palette.teal}
                thickness={0.07}
                headSize={0.3}
                emissive
                delay={0.2}
              />
              <Arrow
                from={armOrigin}
                to={fyTip}
                color="#0F766E"
                thickness={0.07}
                headSize={0.3}
                emissive
                delay={0.8}
              />
            </>
          )}

          {mode === "gradient" && (
            <>
              <Arrow
                from={armOrigin}
                to={[px + LEN * 0.65, Yarrow, -py]}
                color={palette.teal}
                thickness={0.045}
                headSize={0.2}
                delay={0.2}
              />
              <Arrow
                from={armOrigin}
                to={[px, Yarrow, -(py + LEN * 0.65)]}
                color="#0F766E"
                thickness={0.045}
                headSize={0.2}
                delay={0.7}
              />
              <Arrow
                from={armOrigin}
                to={gradTip}
                color={palette.amber}
                thickness={0.075}
                headSize={0.34}
                emissive
                delay={1.2}
                duration={1.0}
                onTop
              />
            </>
          )}
        </group>

        {interactive && <OrbitControls enablePan={false} />}
      </Canvas>
    </div>
  );
}
