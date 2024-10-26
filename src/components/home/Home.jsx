import React, { useState } from "react";
import ModelViewer from "../../three/ModelViewer/MainHomeModel";
import { SiCocacola } from "react-icons/si";
import Hero from "../Hero/Hero";
import { GiChaingun } from "react-icons/gi";
import Contact from "../Contact/Contact";
import UpgradeGun from "../Upgrade/Upgrade";
import Brands from "../Brands/Brands";
import { Variants } from "../Variants/Variants";
import OfferSale from "../Offer/OfferSale";

const Home = () => {
  const [isModelActive, setIsModelActive] = useState(false);
  const mobile = window.innerWidth <= 768;
  return (
    <div className="bg-black text-white overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center">
        <div
          className=""
          style={{
            backgroundBlendMode: "overlay",
          }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="text-center">
              {!mobile && (
                <h1 className="text-2xl md:text-[46rem] font-bold text-red-500 uppercase bangers-regular opacity-90 m-2">
                  <GiChaingun className="animate-spin" />
                </h1>
              )}
            </div>
          </div>


          <div className="relative z-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-full relative"
                onMouseDown={() => setIsModelActive(true)}
                onMouseLeave={() => setIsModelActive(false)}
              >
                <ModelViewer isActive={isModelActive} />
                {!isModelActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-transparent cursor-pointer">
                    <span className="text-white text-sm bg-red-500 bg-opacity-70 px-4 py-2 rounded-full">
                      Click to interact with 3D model
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Hero />
      <Variants />
      <Brands />
      <OfferSale />
      <UpgradeGun />
      <Contact />
    </div>
  );
};

export default Home;
