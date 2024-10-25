import React, { useEffect, useState } from "react";
import UpdateGunModel from "../../three/ModelViewer/UpgradeGunModel";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const UpgradeGun = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "WANNA UPGRADE YOUR GUN?";
  const typingSpeed = 100;

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

  return (
    <div className="pt-14 bg-black min-h-screen">
      <h1 className="text-2xl md:text-[10rem] mb-16 text-center font-bold text-red-500 uppercase bangers-regular opacity-90">
        {displayedText}
      </h1>

      <UpdateGunModel />

      {/* Contact Details Section */}
    </div>
  );
};

export default UpgradeGun;
