import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Stage,
  PresentationControls,
  Environment,
} from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";

import glbFile from "/src/assets/images/wolf_cola.glb";

const Model = () => {
  const group = useRef();
  const { scene } = useGLTF(glbFile);

  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  const clonedScene = scene.clone();

  clonedScene.traverse((node) => {
    if (node.isMesh) {
      if (node.material) {
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
    }
  });

  return (
    <group ref={group}>
      <primitive
        object={clonedScene}
        scale={[2.5, 2.5, 2.5]}
        position={[0, -1, 0]}
      />
    </group>
  );
};

const FallbackComponent = () => (
  <div className="text-center p-4 text-red-500 text-xl">
    Error loading 3D model. Please try again later.
  </div>
);

const ModelViewerNewEdiction = () => {
  const [error, setError] = useState(null);

  const handleError = (error) => {
    console.error("Error in ModelViewer:", error);
    setError(error);
  };

  if (error) {
    return <FallbackComponent />;
  }

  return (
    <div className="p-10 bg-red-500">
      <div className="h-[60vh] w-full p-10 bg-green-600">
        <ErrorBoundary
          FallbackComponent={FallbackComponent}
          onError={handleError}
        >
          <Canvas
            camera={{ position: [0, 0, 10], fov: 45 }}
            style={{ background: "transparent" }}
            dpr={[1, 2]}
          >
            <PresentationControls
              global
              rotation={[0, -Math.PI / 4, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <Stage environment="city" intensity={0} contactShadow={false}>
                <Suspense fallback={null}>
                  <Model />
                </Suspense>
              </Stage>
            </PresentationControls>

            <Environment preset="sunset" background={false} />

            <ambientLight intensity={0.7} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1.5}
              castShadow
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <pointLight
              position={[10, 0, -10]}
              color="#ff0000"
              intensity={0.5}
            />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 4}
              maxDistance={20}
              minDistance={5}
            />
          </Canvas>
        </ErrorBoundary>
      </div>
    </div>
  );
};

useGLTF.preload(glbFile);

export default ModelViewerNewEdiction;
