import React, { lazy, Suspense, useEffect, useState } from "react";
const UpdateGunModel = lazy(() =>
  import("../../three/ModelViewer/UpgradeGunModel")
);

const UpgradeGun = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "WANNA UPGRADE YOUR GUN?";
  const typingSpeed = 100;
  const [isModelActive, setIsModelActive] = useState(false);

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

  return (
    <div className="pt-14 bg-black min-h-screen">
      <h1 className="text-2xl md:text-[10rem] mb-16 text-center font-bold text-red-500 uppercase bangers-regular opacity-90">
        {displayedText}
      </h1>

      <div
        className="relative"
        onMouseDown={() => setIsModelActive(true)}
        onMouseLeave={() => setIsModelActive(false)}
      >
        <Suspense
          fallback={
            <div className="h-[60vh] flex items-center justify-center">
              <div className="text-white text-xl animate-pulse">
                Loading 3D viewer...
              </div>
            </div>
          }
        >
          <UpdateGunModel isActive={isModelActive} />
        </Suspense>
        {!isModelActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent cursor-pointer">
            <span className="text-white text-sm bg-red-500 bg-opacity-70 px-4 py-2 rounded-full">
              Click to interact with 3D model
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpgradeGun;
