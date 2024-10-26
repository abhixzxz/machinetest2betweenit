import React from "react";
import { FaGun } from "react-icons/fa6";

const LoadingScreen = ({ progress = 0 }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black min-h-screen">
      <div className="w-full max-w-sm mx-auto px-4 text-center">
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 animate-spin flex items-center justify-center">
            <FaGun
              size={64}
              className="text-red-500"
              style={{
                opacity: progress / 100,
              }}
            />
          </div>

          <div className="absolute inset-0">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full transform -rotate-90"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(239, 68, 68, 0.2)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgb(239, 68, 68)"
                strokeWidth="8"
                strokeDasharray={`${progress * 2.83} ${283 - progress * 2.83}`}
                className="transition-all duration-300 ease-in-out"
              />
            </svg>
          </div>

          {/* Progress text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <h2 className="mt-6 text-2xl text-red-500 font-bold bangers-regular">
          LOADING ARMORY...
        </h2>

        {/* Progress message */}
        <p className="mt-3 text-red-400 text-sm">
          {progress < 33
            ? "Initializing weapons system..."
            : progress < 66
            ? "Loading 3D models..."
            : progress < 100
            ? "Preparing your arsenal..."
            : "Ready to deploy!"}
        </p>

        <p className="mt-2 text-red-400 text-sm">
          Please wait while we load your weapons
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
