import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stage, Environment, useGLTF } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";

const glbFile = "/src/assets/images/offersale.glb";

const Model = () => {
  const group = useRef();
  const { scene } = useGLTF(glbFile);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  const clonedScene = scene.clone();
  clonedScene.traverse((node) => {
    if (node.isMesh && node.material) {
      node.material.roughness = 0.2;
      node.material.metalness = 0.8;
      node.material.envMapIntensity = 1.5;

      if (node.name.toLowerCase().includes("body")) {
        node.material.color.setHex(0xff0000);
      }
      if (
        node.name.toLowerCase().includes("logo") ||
        node.name.toLowerCase().includes("text")
      ) {
        node.material.color.setHex(0xffffff);
      }
    }
  });

  return (
    <group ref={group}>
      <primitive
        object={clonedScene}
        scale={[0.3, 0.3, 0.3]}
        position={[0, -0.5, 0]}
        rotation={[0.1, 0, 0]}
      />
    </group>
  );
};

const FallbackComponent = () => (
  <div className="text-center p-4 text-red-500 text-xl">
    Error loading 3D model. Please try again later.
  </div>
);

const ThreeCanvas = () => (
  <Canvas
    camera={{
      position: [0, 0, 20],
      fov: 45,
      near: 0.1,
      far: 20000,
    }}
    style={{ background: "transparent" }}
    dpr={[1, 2]}
  >
    <Stage
      environment="city"
      intensity={0.6}
      contactShadow={false}
      preset="rembrandt"
    >
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Stage>
    <Environment preset="sunset" background={false} />
    <ambientLight intensity={0.5} />
    <spotLight
      position={[10, 15, 10]}
      angle={0.3}
      penumbra={1}
      intensity={1.2}
      castShadow
    />
    <pointLight position={[-10, -10, -10]} intensity={0.4} />
    <pointLight position={[10, 0, -10]} color="#ff0000" intensity={0.4} />
  </Canvas>
);

const OfferSaleModel = () => {
  return (
    <div className="relative h-[60vh] w-full rounded-lg overflow-hidden shadow-lg">
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <ThreeCanvas />
      </ErrorBoundary>
    </div>
  );
};

useGLTF.preload(glbFile);

export default OfferSaleModel;
