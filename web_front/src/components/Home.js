import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

// Ajusta la ruta de las imágenes para que coincida con la estructura de directorios
import hackupcImage from "./images/hackupc.jpg";
import mclovingTelecofaraImage from "./images/mcloving_telecofara.jpg";
import mclovingImage from "./images/mcloving.jpg";
import menorca11Image from "./images/menorca11.jpg";
import menorca2Image from "./images/menorca2.jpg";
import menorca3Image from "./images/menorca3.jpg";
import menorca4Image from "./images/menorca4.jpg";
import menorca5Image from "./images/menorca5.jpg";
import menorca6Image from "./images/menorca6.jpg";
import menorca7Image from "./images/menorca7.jpg";
import menorca8Image from "./images/menorca8.jpg";
import menorca9Image from "./images/menorca9.jpg";
import telecosImage from "./images/telecos.jpg";
import telecos1Image from "./images/telecos1.jpg";
import telecos2Image from "./images/telecos2.jpg";

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
    <div className="Home">
      <div className="Home-header">
        <h2 className="subtitulo">EventChain</h2>
        <h1 className="titulo">Menorcas & telecos memories</h1>
      </div>
      <div className="Home-content">
        <Slider ref={sliderRef} {...settings}>
          <div>
            <img src={hackupcImage} alt="HackUPC" />
          </div>
          <div>
            <img src={mclovingTelecofaraImage} alt="Mcloving Telecofara" />
          </div>
          <div>
            <img src={mclovingImage} alt="Mcloving" />
          </div>
          <div>
            <img src={menorca11Image} alt="Menorca" />
          </div>
          <div>
            <img src={menorca2Image} alt="Menorca 2" />
          </div>
          <div>
            <img src={menorca3Image} alt="Menorca 3" />
          </div>
          <div>
            <img src={menorca4Image} alt="Menorca 4" />
          </div>
          <div>
            <img src={menorca5Image} alt="Menorca 5" />
          </div>
          <div>
            <img src={menorca6Image} alt="Menorca 6" />
          </div>
          <div>
            <img src={menorca7Image} alt="Menorca 7" />
          </div>
          <div>
            <img src={menorca8Image} alt="Menorca 8" />
          </div>
          <div>
            <img src={menorca9Image} alt="Menorca 9" />
          </div>
          <div>
            <img src={telecosImage} alt="Telecos" />
          </div>
          <div>
            <img src={telecos1Image} alt="Telecos 1" />
          </div>
          <div>
            <img src={telecos2Image} alt="Telecos 2" />
          </div>
        </Slider>
      </div>

      <footer>
        <p>© 2024 EventChain. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
