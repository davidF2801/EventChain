import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';

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
    pauseOnHover: true
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
            <img src={require('./images/hackupc.jpg')} alt="HackUPC" />
          </div>
          <div>
            <img src={require('./images/mcloving_telecofara.jpg')} alt="Mcloving Telecofara" />
          </div>
          <div>
            <img src={require('./images/mcloving.jpg')} alt="Mcloving" />
          </div>
          <div>
            <img src={require('./images/menorca11.jpg')} alt="Menorca" />
          </div>
          <div>
            <img src={require('./images/menorca2.jpg')} alt="Menorca 2" />
          </div>
          <div>
            <img src={require('./images/menorca3.jpg')} alt="Menorca 3" />
          </div>
          <div>
            <img src={require('./images/menorca4.jpg')} alt="Menorca 4" />
          </div>
          <div>
            <img src={require('./images/menorca5.jpg')} alt="Menorca 5" />
          </div>
          <div>
            <img src={require('./images/menorca6.jpg')} alt="Menorca 6" />
          </div>
          <div>
            <img src={require('./images/menorca7.jpg')} alt="Menorca 7" />
          </div>
          <div>
            <img src={require('./images/menorca8.jpg')} alt="Menorca 8" />
          </div>
          <div>
            <img src={require('./images/menorca9.jpg')} alt="Menorca 9" />
          </div>
          <div>
            <img src={require('./images/telecos.jpg')} alt="Telecos" />
          </div>
          <div>
            <img src={require('./images/telecos1.jpg')} alt="Telecos 1" />
          </div>
          <div>
            <img src={require('./images/telecos2.jpg')} alt="Telecos 2" />
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
