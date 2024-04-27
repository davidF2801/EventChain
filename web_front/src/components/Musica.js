import React from "react";
import { Link } from "react-router-dom";

const Musica = () => {
  const eventosMusicales = [
    {
      nombre: "Concierto de Justin Bieber",
      imagen: "url_del_concierto.jpg",
      fecha: "5 de Agosto, 2024",
      lugar: "Estadio Santiago Bernabéu, Madrid",
    },
    // Puedes agregar más objetos para representar más eventos musicales
  ];

  return (
    <div>
      <h1>Música</h1>
      <div className="eventos-container">
        {eventosMusicales.map((evento, index) => (
          <div key={index} className="evento">
            <img src={evento.imagen} alt={evento.nombre} />
            <h2>{evento.nombre}</h2>
            <p>Fecha: {evento.fecha}</p>
            <p>Lugar: {evento.lugar}</p>
            <Link to="/auth">
              <button>Comprar entradas</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Musica;
