import React from "react";

// Importa las imágenes con la ruta correcta
import erikImage from "./images/erik.jpeg";
import joelImage from "./images/joel.jpeg";
import gokarnaImage from "./images/gokarna.jpeg";
import davidImage from "./images/david.jpeg";

function About() {
  return (
    <div>
      <h2 style={{ color: "navy" }}>About Us</h2>

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
          {/* Primera sección con tres personas */}
          <div style={{ display: "flex", marginRight: "10px" }}>
            <div className="estudiante" style={{ marginRight: "10px" }}>
              <a href="https://www.linkedin.com/in/eriksole/">
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
                  <strong>Erik Sole</strong>
                </p>
              </a>
              <p>
                {" "}
                Brazzer
                <br />
                Engineer
              </p>
            </div>
            <div className="estudiante" style={{ marginRight: "10px" }}>
              <a href="https://www.linkedin.com/in/joel-jurado-4a9a8b208/">
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
                  <strong>Joel Jurado</strong>
                </p>
              </a>
              <p>
                {" "}
                Pornhub
                <br /> Engineer
              </p>
            </div>
          </div>
        </div>
        <div
          className="estudiantes"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {/* Segunda sección con dos personas */}
          <div style={{ display: "flex", marginRight: "10px" }}>
            <div className="estudiante" style={{ marginRight: "10px" }}>
              <a href="https://www.linkedin.com/in/gdum/">
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
                  <strong>Gokarna Dumre</strong>
                </p>
              </a>
              <p>
                {" "}
                Exotic
                <br /> Engineer
              </p>
            </div>
            <div className="estudiante" style={{ marginRight: "10px" }}>
              <a href="https://www.linkedin.com/in/david-forn%C3%B3s/">
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
                  <strong>David Fornos</strong>
                </p>
              </a>
              <p>
                LatinasLover
                <br /> Engineer
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2024 Eventchain. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default About;
