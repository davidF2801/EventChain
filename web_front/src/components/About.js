import React from "react";
import erikImage from "./images/erik.jpeg";
import joelImage from "./images/joel.jpeg";
import gokarnaImage from "./images/gokarna.jpeg";
import davidImage from "./images/david.jpeg";

function About() {
  return (
    <div className="container mx-auto p-8">
      <h1>About Us</h1>
      <section>
        <p>Los jefes del blockchain</p>
      </section>
      <section>
        <h3>What we do</h3>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p>Nos vamos con las samaritanas del amor</p>
        </div>
      </section>

      <section>
        <h3>Our team</h3>
        <div
          className="estudiantes"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ display: "flex", marginRight: "10px" }}>
            <div className="estudiante" style={{ marginRight: "10px" }}>
              <a
                href="https://www.linkedin.com/in/eriksole/"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={erikImage}
                  alt="Erik Sole"
                  className="foto-erik"
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                  }}
                />
                <p>
                  <strong style={{ color: "deepskyblue" }}>Erik Sole</strong>
                </p>
              </a>
              <p>
                Network
                <br />
                Engineer
              </p>
            </div>
            <div className="estudiante" style={{ marginRight: "10px" }}>
              <a
                href="https://www.linkedin.com/in/joel-jurado-4a9a8b208/"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={joelImage}
                  alt="Joel Jurado"
                  className="foto-joel"
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                  }}
                />
                <p>
                  <strong style={{ color: "deepskyblue" }}>Joel Jurado</strong>
                </p>
              </a>
              <p>
                Electrial
                <br /> Engineer
              </p>
            </div>
          </div>
        </div>
        <div
          className="estudiantes"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ display: "flex", marginRight: "10px" }}>
            <div className="estudiante" style={{ marginRight: "10px" }}>
              <a
                href="https://www.linkedin.com/in/gdum/"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={gokarnaImage}
                  alt="Gokarna Dumre"
                  className="foto-gokarna"
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                  }}
                />
                <p>
                  <strong style={{ color: "deepskyblue" }}>
                    Gokarna Dumre
                  </strong>
                </p>
              </a>
              <p>
                Network
                <br /> Engineer
              </p>
            </div>
            <div className="estudiante" style={{ marginRight: "10px" }}>
              <a
                href="https://www.linkedin.com/in/david-forn%C3%B3s/"
                style={{ textDecoration: "none" }}
              >
                <img
                  src={davidImage}
                  alt="David Fornos"
                  className="foto-david"
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                  }}
                />
                <p>
                  <strong style={{ color: "deepskyblue" }}>David Fornos</strong>
                </p>
              </a>
              <p>
                Electrial
                <br /> Engineer
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
