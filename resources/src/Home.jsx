import React from "react";
import Hero from "./Hero";
import { Link } from "react-router-dom";
import NavBar from "./Components/NavBar";
const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
    </div>
  );
};

export default Home;
