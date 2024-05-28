import React, { Fragment } from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/Hero-Section/HeroSection";


import Testimonials from "../components/Testimonial/Testimonials";


import Footer from "../components/Footer/Footer";




// import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <HeroSection />
   
      <Testimonials />
    
      <Footer />
    </Fragment>
  );
};

export default Home;
