import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-red-500 rounded-full animate-spin border-t-transparent" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-red-500 rounded-full animate-pulse opacity-75" />
          </div>
        </div>
        <h2 className="mt-4 text-xl text-red-500 font-bold bangers-regular">
          LOADING ARMORY...
        </h2>
        <p className="mt-2 text-red-400 text-sm">
          Please wait while we load your weapons
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
