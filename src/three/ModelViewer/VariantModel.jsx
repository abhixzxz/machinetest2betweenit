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
import glbFile from "/src/assets/images/equpment1.glb";
import variant2 from "/src/assets/images/variant2.glb";
import variant3 from "/src/assets/images/variant4.glb";

const Model = ({ zoom = 1, modelPath }) => {
  const group = useRef();
  const { scene } = useGLTF(modelPath);

  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
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
        scale={[2 * zoom, 2 * zoom, 2 * zoom]}
        position={[0, -0.5, 0]}
        rotation={[0.1, 0, 0]}
      />
    </group>
  );
};

const ModelCanvas = ({
  zoom,
  cameraPosition,
  modelPath,
  adjustCamera = false,
}) => (
  <Canvas
    camera={{
      position: cameraPosition,
      fov: 50,
      near: 0.1,
      far: 1000,
    }}
    style={{ background: "transparent" }}
    dpr={[1, 2]}
  >
    <PresentationControls
      global
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
        adjustCamera={adjustCamera}
        preset="rembrandt"
      >
        <Suspense fallback={null}>
          <Model zoom={zoom} modelPath={modelPath} />
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
      maxDistance={15}
      minDistance={4}
      target={[0, 0, 0]}
    />
  </Canvas>
);

const FallbackComponent = () => (
  <div className="text-center p-4 text-red-500 text-xl">
    Error loading 3D model. Please try again later.
  </div>
);

const ModelViewer = () => {
  const [error, setError] = useState(null);
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "BUY EQUPMENTS";
  const typingSpeed = 250;

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;

    const typeCharacter = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeCharacter, typingSpeed);
      }
    };
    typeCharacter();
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
  const handleError = (error) => {
    console.error("Error in ModelViewer:", error);
    setError(error);
  };

  if (error) {
    return <FallbackComponent />;
  }

  const variants = [
    {
      zoom: 13,
      cameraPosition: [0, 0, 8],
      modelPath: glbFile,
      label: "Trijicon 5X",
      adjustCamera: false,
    },
    {
      zoom: 18,
      cameraPosition: [0, 0, 12],
      modelPath: variant2,
      label: "Trijicon ACOG w/ Trijicon RMR",
      adjustCamera: true,
    },
    {
      zoom: 0.4,
      cameraPosition: [0, 0, 14],
      modelPath: variant3,
      label: "G19 Magazine",
      adjustCamera: true,
    },
  ];

  return (
    <>
      <h1 className="text-2xl md:text-[10rem] mb-16 text-center font-bold text-red-500 uppercase bangers-regular opacity-90  hover:text-red-600">
        {displayedText}
      </h1>
      <div className="w-full p-2">
        <div className="grid grid-cols-1 md:grid-cols-3   gap-4">
          {variants.map((variant, index) => (
            <div
              key={index}
              className="relative border-[2px] hover:bg-red-500 hover:text-black text-red-500 border-red-500 h-[40vh] md:h-[60vh] w-full  rounded-lg overflow-hidden shadow-lg"
            >
              <div className="absolute top-2 left-2 hover:text-black z-10  uppercase bangers-regular px-2 py-1 rounded">
                {variant.label}
              </div>
              <ErrorBoundary
                FallbackComponent={FallbackComponent}
                onError={handleError}
              >
                <ModelCanvas
                  zoom={variant.zoom}
                  cameraPosition={variant.cameraPosition}
                  modelPath={variant.modelPath}
                  adjustCamera={variant.adjustCamera}
                />
              </ErrorBoundary>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Preload all models
[glbFile, variant2, variant3].forEach((path) => useGLTF.preload(path));

export default ModelViewer;
