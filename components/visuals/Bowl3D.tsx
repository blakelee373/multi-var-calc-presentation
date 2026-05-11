"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { palette } from "@/lib/palette";

const Z_SCALE = 0.22;
const HALF = 2.2;

function bowl(x: number, y: number) {
  return (x * x + y * y) * Z_SCALE;
}

function Bowl() {
  const geometry = useMemo(() => {
    const seg = 100;
    const size = HALF * 2;
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
        roughness={0.78}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function BowlContours() {
  const rings = useMemo(() => {
    const levels = [0.2, 0.5, 0.9, 1.3];
    const out: THREE.Vector3[][] = [];
    for (const level of levels) {
      const r = Math.sqrt(level / Z_SCALE);
      if (r > HALF) continue;
      const ring: THREE.Vector3[] = [];
      const N = 96;
      for (let i = 0; i <= N; i++) {
        const t = (i / N) * Math.PI * 2;
        // input (cos*r, sin*r) → after plane rotation [-π/2, 0, 0]:
        // world (x, height, -y_input)
        ring.push(
          new THREE.Vector3(Math.cos(t) * r, level + 0.01, -Math.sin(t) * r)
        );
      }
      out.push(ring);
    }
    return out;
  }, []);
  return (
    <group>
      {rings.map((points, i) => {
        const geom = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={i}>
            <primitive object={geom} attach="geometry" />
            <lineBasicMaterial color={palette.ink} transparent opacity={0.28} />
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
  delay = 0.3,
  duration = 1.0,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  delay?: number;
  duration?: number;
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
  // The bowl is convex outward, so any straight chord between two surface
  // points sits BELOW the rising rim along its full length. To guarantee
  // the arrow is visible regardless of where the sample sits on the
  // wall, render it on top of everything via depth-test off + high
  // renderOrder. This is the standard "X-ray annotation" approach for
  // showing gradient vectors on surfaces.
  return (
    <group ref={groupRef} position={from}>
      <mesh
        position={localMid.toArray()}
        quaternion={quat}
        renderOrder={20}
      >
        <cylinderGeometry args={[0.075, 0.075, Math.max(len - 0.3, 0.01), 16]} />
        <meshBasicMaterial color={color} depthTest={false} depthWrite={false} />
      </mesh>
      <mesh
        position={localTip.toArray()}
        quaternion={quat}
        renderOrder={21}
      >
        <cylinderGeometry args={[0, 0.2, 0.36, 20]} />
        <meshBasicMaterial color={color} depthTest={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

function PulsePoint({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 2.5) * 0.2;
    ref.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.16, 24, 24]} />
      <meshStandardMaterial
        color={palette.ink}
        emissive={palette.amber}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export function Bowl3D({ className }: { className?: string }) {
  // Coordinate mapping (plane has local rotation -π/2 around X):
  //   input (x, y) on plane → world (x, bowl(x,y), -y)
  //
  // Sample at input (-1.0, -1.0) lands at world (-1.0, 0.22, 1.0) — on
  // the front-LEFT wall, closest to camera. Gradient ∇f = ⟨2x, 2y⟩ at
  // that point is ⟨-2, -2⟩, which in world coords points (-x, +z) =
  // outward and toward the camera's bottom-left in screen space.
  const px = -1.0;
  const py = -1.0;
  const pz = bowl(px, py);
  const here: [number, number, number] = [px, pz, -py];

  const gx = 2 * px;
  const gy = 2 * py;
  const glen = Math.hypot(gx, gy);
  const ux = gx / glen;
  const uy = gy / glen;
  const reach = 1.0;
  const tipPx = px + ux * reach;
  const tipPy = py + uy * reach;
  // Tip lift is generous so even if the chord weren't depth-test-off,
  // it would still clear the rim. With depthTest=false on the arrow
  // material it's belt-and-suspenders.
  const tip: [number, number, number] = [
    tipPx,
    bowl(tipPx, tipPy) + 0.7,
    -tipPy,
  ];

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [4.2, 5.0, 5.4], fov: 38 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <color attach="background" args={[palette.paper]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 9, 4]} intensity={1.3} />
        <directionalLight position={[-4, 3, -5]} intensity={0.3} color="#BFDBFE" />

        <Bowl />
        <BowlContours />
        <PulsePoint position={here} />
        <Arrow from={here} to={tip} color={palette.amber} />
      </Canvas>
    </div>
  );
}
