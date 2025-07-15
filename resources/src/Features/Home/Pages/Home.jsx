import React from "react";
import Hero from "../Components/Hero";

import NavBar from "../../../Components/NavBar";
import FeaturesSection from "../Components/FeaturesSection";
import Footer from "../../../Components/Footer";
const Home = () => {
  return (
    <div className="">
      <NavBar />
      <Hero />
      <FeaturesSection />
      <Footer/>
    </div>
  );
};

export default Home;
