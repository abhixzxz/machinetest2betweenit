import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Stage,
  PresentationControls,
  Environment,
} from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import glbFile from "/src/assets/images/upgrade4.glb";

const Model = ({ zoom = 0 }) => {
  const group = useRef();
  const { scene } = useGLTF(glbFile);

  useFrame((state) => {
    // Increased the multiplier from 0.3 to 0.8 for faster rotation
    // Increased the amplitude from 0.1 to 0.15 for wider rotation range
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
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
        scale={[0.2 * zoom, 0.2 * zoom, 0.2 * zoom]}
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

const UpdateGunModel = () => {
  return (
    <div className="relative h-[60vh] w-full rounded-lg overflow-hidden shadow-lg">
      <div className="absolute top-2 left-2 hover:text-black z-10 uppercase bangers-regular px-2 py-1 rounded">
        Trijicon 5X
      </div>
      <ErrorBoundary FallbackComponent={FallbackComponent}>
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
          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 6, 0]}
            polar={[-Math.PI / 2, Math.PI / 2]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
            config={{ mass: 2, tension: 400 }}
          >
            <Stage
              environment="city"
              intensity={0.6}
              contactShadow={false}
              preset="rembrandt"
            >
              <Suspense fallback={null}>
                <Model zoom={3} />
              </Suspense>
            </Stage>
          </PresentationControls>
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
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI - 0.5}
            minPolarAngle={0.2}
            maxDistance={30}
            minDistance={8}
            target={[0, 0, 0]}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
};

useGLTF.preload(glbFile);

export default UpdateGunModel;
