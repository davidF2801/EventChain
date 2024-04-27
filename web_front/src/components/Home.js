import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo1 from "./images/logo1.png";

function Home() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="container mx-auto p-">
      <div className="text-center">
        <img src={logo1} alt="logo" className="mx-auto w-32" />
        <h2 className="text-white text-2xl font-bold text-center">hola</h2>
      </div>
      <div className="max-w-3xl mx-auto"></div>
    </div>
  );
}

export default Home;
