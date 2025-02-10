import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./landing-page/HeroSection";

import Footer from "./landing-page/Footer";
import PublicEvents from "./landing-page/PublicEvents";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <PublicEvents />
      <Footer />
    </div>
  );
};

export default LandingPage;
