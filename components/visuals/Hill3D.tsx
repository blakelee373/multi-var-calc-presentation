"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { palette } from "@/lib/palette";

type Mode = "many" | "best" | "partials" | "gradient" | "static";

type Hill3DProps = {
  mode: Mode;
  className?: string;
  interactive?: boolean;
};

/**
 * f(x,y) = exp(-((x-0.4)^2 + (y-0.2)^2) * 0.6) * 4 - 0.8
 * Sampled on [-3, 3] x [-3, 3]. The "you are here" point sits on the
 * descending flank so the gradient direction is visually meaningful.
 */
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
    const seg = 80;
    const size = 6;
    const geo = new THREE.PlaneGeometry(size, size, seg, seg);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const cTop = new THREE.Color(palette.amber);
    const cBot = new THREE.Color(palette.teal);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = f(x, y);
      pos.setZ(i, z);
      const t = THREE.MathUtils.clamp((z + 0.8) / (A + 0.8), 0, 1);
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
      <meshStandardMaterial vertexColors flatShading={false} roughness={0.85} />
    </mesh>
  );
}

function Arrow({
  from,
  to,
  color,
  thickness = 0.04,
  headSize = 0.18,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  thickness?: number;
  headSize?: number;
}) {
  const v1 = new THREE.Vector3(...from);
  const v2 = new THREE.Vector3(...to);
  const dir = v2.clone().sub(v1);
  const len = dir.length();
  const mid = v1.clone().add(dir.clone().multiplyScalar(0.5));
  const up = new THREE.Vector3(0, 1, 0);
  const quat = new THREE.Quaternion().setFromUnitVectors(
    up,
    dir.clone().normalize()
  );

  return (
    <group>
      <mesh position={mid.toArray()} quaternion={quat}>
        <cylinderGeometry args={[thickness, thickness, Math.max(len - headSize, 0.01), 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={v2.toArray()} quaternion={quat}>
        <coneGeometry args={[headSize * 0.6, headSize, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function originAt(x: number, y: number): [number, number, number] {
  // r3f surface is rotated -PI/2 around X, so world Y ↔ z, world Z ↔ -y.
  // We translate (x, y, z=f) → world (x, f, -y) for visual readability.
  return [x, f(x, y) + 0.06, -y];
}

function offset(
  origin: [number, number, number],
  dx: number,
  dz: number,
  scale = 0.7
): [number, number, number] {
  // dx in x, dz in surface-y → translate to world (x+dx*s, ?, -(y+dz*s))
  const x = origin[0] + dx * scale;
  const yw = -origin[2] + dz * scale; // back to surface-y
  return [x, f(x, yw) + 0.06, -yw];
}

export function Hill3D({ mode, className, interactive = false }: Hill3DProps) {
  // Sample point on the descending flank
  const px = 1.4;
  const py = -1.0;
  const here = originAt(px, py);

  // Gradient of f at (px, py)
  const gx = fx(px, py);
  const gy = fy(px, py);
  const glen = Math.hypot(gx, gy) || 1;
  const ugx = gx / glen;
  const ugy = gy / glen;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [4.5, 4.2, 5.5], fov: 38 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <color attach="background" args={[palette.paper]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 8, 4]} intensity={1.1} />
        <directionalLight position={[-4, 3, -5]} intensity={0.3} />

        <Surface />

        {/* you-are-here marker */}
        {mode !== "static" && (
          <mesh position={here}>
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshStandardMaterial color={palette.ink} />
          </mesh>
        )}

        {/* MANY candidate arrows */}
        {mode === "many" &&
          Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
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

        {/* BEST arrow highlighted, others faded */}
        {mode === "best" && (
          <>
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
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
              to={offset(here, ugx, ugy, 1.0)}
              color={palette.amber}
              thickness={0.05}
              headSize={0.22}
            />
          </>
        )}

        {/* PARTIALS: fx (along +x) and fy (along +y) */}
        {mode === "partials" && (
          <>
            <Arrow
              from={here}
              to={offset(here, 1, 0, 0.9)}
              color={palette.teal}
              thickness={0.045}
              headSize={0.2}
            />
            <Arrow
              from={here}
              to={offset(here, 0, 1, 0.9)}
              color="#0F766E"
              thickness={0.045}
              headSize={0.2}
            />
          </>
        )}

        {/* GRADIENT: fx + fy → ∇f */}
        {mode === "gradient" && (
          <>
            <Arrow
              from={here}
              to={offset(here, 1, 0, 0.7)}
              color={palette.teal}
              thickness={0.03}
              headSize={0.14}
            />
            <Arrow
              from={here}
              to={offset(here, 0, 1, 0.7)}
              color="#0F766E"
              thickness={0.03}
              headSize={0.14}
            />
            <Arrow
              from={here}
              to={offset(here, ugx, ugy, 1.0)}
              color={palette.amber}
              thickness={0.055}
              headSize={0.24}
            />
          </>
        )}

        {interactive && <OrbitControls enablePan={false} />}
      </Canvas>
    </div>
  );
}
