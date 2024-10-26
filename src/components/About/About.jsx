import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import manImg from "../../assets/images/manabout.png";

const About = () => {
  const missionRef = useRef(null);
  const featuresRef = useRef(null);
  const experienceRef = useRef(null);
  const commitmentRef = useRef(null);

  const useScrollAnimation = (ref) => {
    return useInView(ref, { once: true, margin: "-100px" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "rgb(31, 41, 55)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
            scale: {
              type: "spring",
              damping: 5,
              stiffness: 100,
            },
          }}
          className="text-4xl md:text-[8rem] font-bold text-red-500 uppercase bangers-regular text-center leading-tight mb-12 bg-transparent"
        >
          ABOUT US
        </motion.h1>

        <motion.div
          ref={missionRef}
          initial="hidden"
          animate={useScrollAnimation(missionRef) ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center px-4 mb-24 bg-transparent"
        >
          <motion.h2
            variants={headingVariants}
            className="text-3xl md:text-5xl text-red-500 bangers-regular mb-8 bg-transparent"
          >
            Our Mission
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xs md:text-xl text-gray-300 leading-relaxed bg-transparent"
          >
            BulletForge stands at the forefront of precision ammunition retail,
            combining tradition with innovation. Our commitment to quality and
            safety sets the standard in the industry.
          </motion.p>
        </motion.div>

        <motion.div
          ref={featuresRef}
          initial="hidden"
          animate={useScrollAnimation(featuresRef) ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 bg-transparent"
        >
          {[
            {
              title: "Quality Assurance",
              text: "Every product in our inventory undergoes rigorous testing and certification to ensure maximum reliability and performance.",
            },
            {
              title: "Expert Support",
              text: "Our team of seasoned professionals provides comprehensive guidance to help you make informed decisions.",
            },
            {
              title: "Wide Selection",
              text: "From standard ammunition to specialized variants, we offer an extensive range to meet diverse needs.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={featureCardVariants}
              whileHover="hover"
              className="bg-gray-900 p-8 rounded-lg shadow-xl"
              style={{ backgroundColor: "rgb(17, 24, 39)" }}
            >
              <h3 className="text-2xl text-red-500 bangers-regular mb-4 bg-transparent">
                {feature.title}
              </h3>
              <p className="text-xs md:text-base text-gray-400 bg-transparent">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <img src={manImg} alt="manImg" />

        <motion.div
          ref={experienceRef}
          initial="hidden"
          animate={useScrollAnimation(experienceRef) ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-24 bg-transparent"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gray-900 p-8 md:p-12 rounded-lg shadow-xl"
            style={{ backgroundColor: "rgb(17, 24, 39)" }}
          >
            <motion.h2
              variants={headingVariants}
              className="text-3xl md:text-5xl text-red-500 bangers-regular mb-8 text-center bg-transparent"
            >
              Years of Excellence
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-transparent">
              <motion.div variants={itemVariants} className="bg-transparent">
                <p className="text-xs md:text-lg text-gray-300 leading-relaxed mb-6 bg-transparent">
                  With over a decade of experience in the ammunition industry,
                  BulletForge has established itself as a trusted name among
                  enthusiasts and professionals alike.
                </p>
                <p className="text-xs md:text-lg text-gray-300 leading-relaxed bg-transparent">
                  Our dedication to customer satisfaction and safety has earned
                  us recognition as an industry leader in ammunition retail.
                </p>
              </motion.div>
              <div className="space-y-6 bg-transparent">
                {[
                  { number: "10+", text: "Years of Experience" },
                  { number: "5000+", text: "Satisfied Customers" },
                  { number: "100%", text: "Quality Guaranteed" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center justify-center md:justify-start space-x-4 bg-transparent"
                  >
                    <span className="text-4xl md:text-5xl text-red-500 bangers-regular bg-transparent">
                      {stat.number}
                    </span>
                    <span className="text-xs md:text-lg text-gray-400 bg-transparent">
                      {stat.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={commitmentRef}
          initial="hidden"
          animate={useScrollAnimation(commitmentRef) ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-3xl mx-auto text-center px-4 mb-24 bg-transparent"
        >
          <motion.h2
            variants={headingVariants}
            className="text-3xl md:text-5xl text-red-500 bangers-regular mb-8 bg-transparent"
          >
            Our Commitment
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xs md:text-xl text-gray-300 leading-relaxed bg-transparent"
          >
            At BulletForge, we're more than just a retailer. We're committed to
            promoting responsible ownership, providing education, and ensuring
            our customers have access to the highest quality ammunition products
            available.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
