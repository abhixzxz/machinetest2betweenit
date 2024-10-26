import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import "./App.css";
import Header from "./components/Header/Header";
import LoadingScreen from "./components/LoadingScreen";
import glbFile from "/src/assets/images/custom_short_barrel_ar_rifle..glb";

const Home = React.lazy(() => import("./components/home/Home"));
const About = React.lazy(() => import("./components/About/About"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadModel = async () => {
      try {
        if (isMounted) setLoadingProgress(10);
        await useGLTF.preload(glbFile);
        if (isMounted) setLoadingProgress(60);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (isMounted) setLoadingProgress(80);

        await new Promise((resolve) => setTimeout(resolve, 500));
        if (isMounted) setLoadingProgress(100);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (isMounted) setIsLoading(false);
      } catch (error) {
        console.error("Error loading 3D model:", error);
        if (isMounted) {
          setLoadingProgress(100);
          setIsLoading(false);
        }
      }
    };

    loadModel();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <Router>
      <Header />
      <Suspense fallback={<LoadingScreen progress={100} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
