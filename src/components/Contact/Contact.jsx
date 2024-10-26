import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import contactUS from "../../assets/images/contact.png";

const Contact = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  const handleImageClick = () => {
    setIsAnimated(true);
    setTimeout(() => setIsAnimated(false), 1000);
  };

  const baseTextColor = isAnimated ? "text-green-500" : "text-white";
  const baseHoverColor = isAnimated
    ? "hover:text-green-400"
    : "hover:text-red-500";

  return (
    <div className="bg-black px-3 py-6 md:px-8">
      <h2
        className={`text-2xl md:text-4xl ${
          isAnimated ? "text-green-500" : "text-red-500"
        } mb-6 text-center bangers-regular transition-colors duration-300`}
      >
        Contact Us for Upgrades
      </h2>

      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2">
          <img
            src={contactUS}
            alt="contact"
            className={`w-full h-auto rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 ${
              isAnimated ? "scale-105" : ""
            }`}
            onClick={handleImageClick}
          />
        </div>

        <div className="w-full lg:w-1/2">
          <div
            className={`max-w-4xl mx-auto p-4 md:p-8 bg-zinc-900/80 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 ${
              isAnimated ? "scale-102" : ""
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-4">
                <div
                  className={`flex items-center space-x-3 ${baseTextColor} ${baseHoverColor} transition-colors duration-300 group bg-zinc-800/50 p-3 rounded-lg`}
                >
                  <Phone
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      isAnimated
                        ? "animate-bounce"
                        : "group-hover:animate-pulse"
                    }`}
                  />
                  <div className="text-sm md:text-base">
                    <p className="font-semibold">Phone</p>
                    <a
                      href="tel:+918943936250"
                      className="hover:underline transition-all duration-300"
                    >
                      +91 8943936250
                    </a>
                  </div>
                </div>

                <div
                  className={`flex items-center space-x-3 ${baseTextColor} ${baseHoverColor} transition-colors duration-300 group bg-zinc-800/50 p-3 rounded-lg`}
                >
                  <Mail
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      isAnimated
                        ? "animate-bounce"
                        : "group-hover:animate-pulse"
                    }`}
                  />
                  <div className="text-sm md:text-base">
                    <p className="font-semibold">Email</p>
                    <a
                      href="mailto:abhirajk0123@gmail.com"
                      className="hover:underline transition-all duration-300"
                    >
                      abhirajk0123@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className={`flex items-center space-x-3 ${baseTextColor} ${baseHoverColor} transition-colors duration-300 group bg-zinc-800/50 p-3 rounded-lg`}
                >
                  <MapPin
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      isAnimated
                        ? "animate-bounce"
                        : "group-hover:animate-pulse"
                    }`}
                  />
                  <div className="text-sm md:text-base">
                    <p className="font-semibold">Location</p>
                    <p>Kalamasheey HMT</p>
                    <p>Kochi, Kerala</p>
                  </div>
                </div>

                <div
                  className={`flex items-center space-x-3 ${baseTextColor} ${baseHoverColor} transition-colors duration-300 group bg-zinc-800/50 p-3 rounded-lg`}
                >
                  <Clock
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      isAnimated
                        ? "animate-bounce"
                        : "group-hover:animate-pulse"
                    }`}
                  />
                  <div className="text-sm md:text-base">
                    <p className="font-semibold">Business Hours</p>
                    <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                    <p>Sat: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-700 text-zinc-400 text-xs md:text-sm text-center">
              <div className="inline-flex px-3 py-1 md:px-4 md:py-2 bg-zinc-800 rounded-full mb-3">
                <p
                  className={`${
                    isAnimated ? "text-green-500" : "text-red-500"
                  } font-semibold transition-colors duration-300`}
                >
                  FFL# 1-23-456-78-9A-12345
                </p>
              </div>
              <p
                className={`mt-2 ${
                  isAnimated ? "text-green-400" : "text-zinc-400"
                } transition-colors duration-300`}
              >
                All upgrades and modifications are performed by certified
                gunsmiths in compliance with federal and state regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
