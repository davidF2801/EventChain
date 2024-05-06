import React from "react";
import joelImage from "./images/joel.jpeg";
import gokarnaImage from "./images/gokarna.jpeg";
import davidImage from "./images/david.jpeg";

function About() {
  return (
    <div className="container mx-auto p-8" style={{ maxWidth: "90%" }}>
      {/* Sección 1: Título a la izquierda, texto a la derecha */}
      <section className="my-8" style={{ padding: "20px", maxWidth: "100%" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "2.5rem", textAlign: "center" }}>
              About Us
            </h3>
            <p style={{ fontSize: "1.1rem", textAlign: "left" }}>
              We are a team of telecommunications engineering students at UPC
              Barcelona who have carried out this EventChain project, combining
              one of the most profitable businesses with one of the most
              emerging technologies, such as online event and ticket
              buying/selling and blockchain technology.
            </p>
          </div>
        </div>
      </section>

      {/* Sección 2: Título a la derecha, texto a la izquierda */}
      <section className="my-8" style={{ padding: "20px", maxWidth: "100%" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 3 }}>
            <h3 style={{ fontSize: "2.5rem", textAlign: "center" }}>
              What we do
            </h3>
            <p style={{ fontSize: "1.1rem", textAlign: "left" }}>
              With Eventchain, you can easily execute event or ticket buying and
              selling thanks to its simple frontend built with React and a
              special combination of conventional CSS and Tailwind CSS, along
              with its robust backend made in TypeScript together with Solidity.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "20px", maxWidth: "100%" }}>
        <h1 style={{ fontSize: "2.5rem" }}>Our team</h1>
        <div
          className="estudiantes"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ display: "flex", marginRight: "10px" }}>
            <div className="estudiante" style={{ marginRight: "50px" }}>
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
                  <br />
                  <span style={{ color: "white", fontSize: "0.8rem" }}>
                    Electrical Engineer,
                    <br />
                    Responsible for Backend
                  </span>
                </p>
              </a>
            </div>

            <div className="estudiante" style={{ marginRight: "50px" }}>
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
                  <strong style={{ color: "deepskyblue" }}>David Fornós</strong>
                  <br />
                  <span style={{ color: "white", fontSize: "0.8rem" }}>
                    Electrical Engineer,
                    <br />
                    Responsible for Backend &
                    <br /> Backend-Frontend connection
                  </span>
                </p>
              </a>
            </div>

            <div className="estudiante" style={{ marginRight: "50px" }}>
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
                  <br />
                  <span style={{ color: "white", fontSize: "0.8rem" }}>
                    Electrical Engineer,
                    <br />
                    Responsible for Frontend
                  </span>
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
