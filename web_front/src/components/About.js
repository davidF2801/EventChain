import React from "react";
import joelImage from "./images/joel.jpeg";
import gokarnaImage from "./images/gokarna.jpeg";
import davidImage from "./images/david.jpeg";

function About() {
  return (
    <div className="container mx-auto p-8">
      <h1 style={{ fontSize: "2rem" }}>About Us</h1>
      <section
        className="my-8"
        style={{
          fontSize: "1.2rem",
          fontStyle: "italic",
          borderRadius: "10px",
        }}
      >
        <p style={{ fontSize: "1.2rem" }}>
          We are a team of telecommunications engineering students at UPC
          Barcelona who have carried out this EventChain project, combining one
          of the most profitable businesses with one of the most emerging
          technologies, such as online event and ticket buying/selling and
          blockchain technology.
        </p>
      </section>
      <section
        className="button-cool3 my-8"
        style={{
          fontSize: "1.2rem",
          fontStyle: "italic",
          borderRadius: "40px",
        }}
      >
        <h3 style={{ fontSize: "1.5rem" }}>What we do</h3>
        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
          <p style={{ fontSize: "1.2rem" }}>
            With Eventchain, you can easily execute event or ticket buying and
            selling thanks to its simple frontend built with React and a special
            combination of conventional CSS and Tailwind CSS, along with its
            robust backend made in TypeScript together with Solidity.
          </p>
        </div>
      </section>

      <section>
        <h3 style={{ fontSize: "1.5rem" }}>Our team</h3>
        <div
          className="estudiantes"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ display: "flex", marginRight: "10px" }}>
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
              </a>
              <p>
                <strong style={{ color: "deepskyblue" }}>Joel Jurado</strong>
                <br />
                <span style={{ color: "white", fontSize: "0.9rem" }}>
                  Electrical Engineer,
                  <br />
                  Responsible for Backend
                </span>
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
              </a>
              <p>
                <strong style={{ color: "deepskyblue" }}>David Fornós</strong>
                <br />
                <span style={{ color: "white", fontSize: "0.9rem" }}>
                  Electrical Engineer,
                  <br />
                  Responsible for Backend and Backend-Frontend connection
                </span>
              </p>
            </div>
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
              </a>
              <p>
                <strong style={{ color: "deepskyblue" }}>Gokarna Dumre</strong>
                <br />
                <span style={{ color: "white", fontSize: "0.9rem" }}>
                  Electrical Engineer,
                  <br />
                  Responsible for Frontend
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
