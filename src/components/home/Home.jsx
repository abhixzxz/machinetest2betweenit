import React from "react";
import ModelViewer from "../../three/ModelViewer/MainHomeModel";
import { SiCocacola } from "react-icons/si";
import Hero from "../Hero/Hero";
import { GiChaingun } from "react-icons/gi";
import Contact from "../Contact/Contact";
import UpgradeGun from "../Upgrade/Upgrade";
import Brands from "../Brands/Brands";
import { Variants } from "../Variants/Variants";

const Home = () => {
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
          {/* Text Layer (Behind) */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="text-center">
              <h1 className="text-2xl md:text-[46rem] font-bold text-red-500 uppercase bangers-regular opacity-90 m-2">
                <GiChaingun className="animate-spin" />
              </h1>
            </div>
          </div>

          {/* 3D Model Layer (Front) */}
          <div className="relative h-96 z-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full">
                <ModelViewer />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Hero />
      <Variants />
      <Brands />
      <UpgradeGun />
      <Contact />
    </div>
  );
};

export default Home;
