import React, { useState, useRef, useEffect } from "react";

import BrandImage1 from "../../../assets/images/brand1.jpg";
import BrandImage2 from "../../../assets/images/brand2.jpg";
import BrandImage3 from "../../../assets/images/brand3.jpg";
import BrandImage4 from "../../../assets/images/brand4.jpg";
import BrandImage5 from "../../../assets/images/brand5.jpg";
import BrandImage6 from "../../../assets/images/brand6.jpg";
import BrandImage7 from "../../../assets/images/brand7.jpg";
import BrandImage8 from "../../../assets/images/brand8.jpg";
import BrandImage9 from "../../../assets/images/brand9.jpg";
import BrandImage10 from "../../../assets/images/brand10.jpg";

const LazyImage = ({ src, alt, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = src;
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <img
      ref={imageRef}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      onLoad={handleLoad}
      loading="lazy"
    />
  );
};

const SpinningSlider = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState(0);
  const containerRef = useRef(null);

  const Images = [
    BrandImage1,
    BrandImage2,
    BrandImage3,
    BrandImage4,
    BrandImage5,
    BrandImage6,
    BrandImage7,
    BrandImage8,
    BrandImage9,
    BrandImage10,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  const shouldStartAnimation = loadedImages === Images.length;

  return (
    <div className="main-container" ref={containerRef}>
      {isVisible && (
        <div className="banner">
          <div
            className={`slider ${isHovered ? "paused" : ""} ${
              shouldStartAnimation ? "animate" : ""
            }`}
            style={{ "--quantity": 10 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {Images.map((image, index) => (
              <div
                key={index}
                className="item"
                style={{ "--position": index + 1 }}
              >
                <LazyImage
                  src={image}
                  alt={`Brand ${index + 1}`}
                  onLoad={handleImageLoad}
                />
              </div>
            ))}
          </div>
          <div className="content text-center">
            <h1 className="uppercase text-2xl md:text-[16rem] font-bold text-red-500 uppercase bangers-regular opacity-90 m-2 hover:text-red-600">
              OUR BRANDS
            </h1>
          </div>
        </div>
      )}
      <style jsx>{`
        .main-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .banner {
          width: 100%;
          height: 100vh;
          text-align: center;
          overflow: hidden;
          position: relative;
        }

        .banner .slider {
          position: absolute;
          width: 200px;
          height: 250px;
          top: 10%;
          left: calc(50% - 100px);
          transform-style: preserve-3d;
          transform: perspective(1000px);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .banner .slider.animate {
          animation: autoRun 20s linear infinite;
          opacity: 1;
        }

        .banner .slider.paused {
          animation-play-state: paused;
        }

        @keyframes autoRun {
          from {
            transform: perspective(1000px) rotateX(-16deg) rotateY(0deg);
          }
          to {
            transform: perspective(1000px) rotateX(-16deg) rotateY(360deg);
          }
        }

        .banner .slider .item {
          position: absolute;
          inset: 0 0 0 0;
          transform: rotateY(
              calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
            )
            translateZ(550px);
          transition: transform 0.3s ease;
        }

        .banner .slider .item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .banner .content {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(1400px, 100vw);
          height: max-content;
          padding-bottom: 100px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          z-index: 1;
        }

        @media screen and (max-width: 1023px) {
          .banner .slider {
            width: 160px;
            height: 200px;
            left: calc(50% - 80px);
          }

          .banner .slider .item {
            transform: rotateY(
                calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
              )
              translateZ(300px);
          }

          .banner .content {
            padding-bottom: 50px;
          }

          .banner .content h1 {
            font-size: 5rem;
            margin-bottom: 0;
          }
        }

        @media screen and (max-width: 767px) {
          .banner .slider {
            width: 100px;
            height: 150px;
            left: calc(50% - 50px);
            top: 20%;
          }

          .banner .slider .item {
            transform: rotateY(
                calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
              )
              translateZ(180px);
          }

          .banner .content {
            bottom: auto;
            top: 65%;
            padding-bottom: 0;
            height: auto;
          }

          .banner .content h1 {
            font-size: 3rem;
            width: 100%;
            text-align: center;
            margin: 0;
            padding: 0 1rem;
          }
        }

        @media screen and (max-width: 480px) {
          .banner .slider {
            top: 25%;
          }

          .banner .content {
            top: 60%;
          }

          .banner .content h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SpinningSlider;
