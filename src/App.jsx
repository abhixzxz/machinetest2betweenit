import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import LoadingScreen from "./components/LoadingScreen";


const Home = React.lazy(() => import("./components/home/Home"));
const About = React.lazy(() => import("./components/About/About"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadModels = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading models:", error);
        setIsLoading(false);
      }
    };

    preloadModels();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Header />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
