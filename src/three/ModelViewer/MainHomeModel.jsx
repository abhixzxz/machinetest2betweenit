import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Stage,
  PresentationControls,
  Environment,
} from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import glbFile from "/src/assets/images/custom_short_barrel_ar_rifle..glb";

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
        scale={[9, 9, 9]}
        position={[0, 2.4, -5]}
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

const ModelViewer = ({ isActive }) => {
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      if (!isActive || isMobile) {
        return;
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("wheel", handleScroll, { passive: true });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("wheel", handleScroll);
      }
    };
  }, [isActive, isMobile]);

  const handleError = (error) => {
    console.error("Error in ModelViewer:", error);
    setError(error);
  };

  if (error) {
    return <FallbackComponent />;
  }

  return (
    <div className="relative">
      <div
        className="h-[80vh] w-full"
        ref={canvasRef}
        style={{
          pointerEvents: isActive && !isMobile ? "auto" : "none",
          cursor: isMobile ? "default" : "auto",
        }}
      >
        <ErrorBoundary
          FallbackComponent={FallbackComponent}
          onError={handleError}
        >
          <Canvas
            camera={{
              position: [0, 0, 8],
              fov: 50,
              near: 0.1,
              far: 1000,
            }}
            style={{ background: "transparent" }}
            dpr={[1, 2]}
          >
            <PresentationControls
              global
              enabled={isActive && !isMobile}
              zoom={1}
              rotation={[0, -Math.PI / 6, 0]}
              polar={[-Math.PI / 2, Math.PI / 2]}
              azimuth={[-Math.PI / 2, Math.PI / 2]}
              config={{ mass: 2, tension: 400 }}
            >
              <Stage
                environment="city"
                intensity={0.6}
                contactShadow={false}
                adjustCamera={false}
                preset="rembrandt"
              >
                <Suspense fallback={null}>
                  <Model />
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
            <pointLight
              position={[10, 0, -10]}
              color="#ff0000"
              intensity={0.4}
            />

            <OrbitControls
              enabled={isActive && !isMobile}
              enablePan={isActive && !isMobile}
              enableZoom={isActive && !isMobile}
              enableRotate={isActive && !isMobile}
              maxPolarAngle={Math.PI - 0.5}
              minPolarAngle={0.2}
              maxDistance={15}
              minDistance={4}
              target={[0, 0, 0]}
            />
          </Canvas>
        </ErrorBoundary>
      </div>
      {isMobile && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-sm bg-red-500 bg-opacity-70 px-4 py-2 rounded-full">
            3D interaction available on desktop only
          </span>
        </div>
      )}
    </div>
  );
};

useGLTF.preload(glbFile);

export default ModelViewer;
