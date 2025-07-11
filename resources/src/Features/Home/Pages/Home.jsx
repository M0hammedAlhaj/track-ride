import React from "react";
import Hero from "../Components/Hero";

import NavBar from "../../../Components/NavBar";
import FeaturesSection from "../Components/FeaturesSection";
const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col gap-10">
      <NavBar />
      <Hero />
      <FeaturesSection />
    </div>
  );
};

export default Home;
