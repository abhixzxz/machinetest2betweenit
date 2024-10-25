import React, { useState, useEffect } from "react";
import colaImage from "../../assets/images/hero.png";
const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const colors = [
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-yellow-600",
    "bg-pink-600",
  ];

  const fullText = "BULLET FORGE";
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

  useEffect(() => {
    let intervalId;
    if (isHovered) {
      intervalId = setInterval(() => {
        setCurrentColorIndex((prev) => (prev + 1) % colors.length);
      }, 500);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered]);

  return (
    <div className="w-full text-center flex flex-col items-center">
      <h1 className="text-2xl md:text-[16rem] font-bold text-red-500 uppercase bangers-regular opacity-90 m-2 hover:text-red-600">
        {displayedText}
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center w-full mx-auto m-8 md:m-16 p-5 rounded-lg shadow-lg">
        <div className="flex-1 text-center p-5">
          <span className="text-2xl md:text-[2.5rem] line-clamp-6 font-bold text-red-500 uppercase bangers-regular leading-[1] hover:text-red-600">
            " Forge Your Legacy with Every Shot! " Welcome to BulletForge, where
            quality meets precision. Our premium firearms and accessories are
            expertly curated to empower your pursuits and elevate your shooting
            experience. From first-time buyers to seasoned collectors, we
            provide a range of reliable firearms crafted for performance. Get
            ready to make every shot count with BulletForge—where every choice
            strengthens your aim and builds your legacy.
          </span>
        </div>
      </div>

      <div className="flex text-center">
        <div
          className={`image-container transition-colors duration-300 ${
            isHovered ? colors[currentColorIndex] : "bg-red-600"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setCurrentColorIndex(0);
          }}
        >
          <img
            src={colaImage}
            alt="hero"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
