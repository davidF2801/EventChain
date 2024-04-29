import React from "react";
import { Link } from "react-router-dom";

// Suponiendo que tienes un array de objetos con información sobre los eventos deportivos
const eventosDeportivos = [
  {
    nombre: "Partido Real Madrid vs Barcelona",
    imagen: "url_de_la_imagen1.jpg",
    precioEntrada: "$100",
    // Otros datos relevantes
  },
  {
    nombre: "Otro Partido de Fútbol",
    imagen: "url_de_la_imagen2.jpg",
    precioEntrada: "$80",
    // Otros datos relevantes
  },
];

const Deportes = () => {
  return (
    <div className="container mx-auto p-">
      <h1>Eventos Deportivos</h1>
      <div className="container mx-auto p-8">
        {eventosDeportivos.map((evento, index) => (
          <div key={index} className="evento">
            <img src={evento.imagen} alt={evento.nombre} />
            <h2>{evento.nombre}</h2>
            <p>Precio de la entrada: {evento.precioEntrada}</p>
            {/* Otros detalles del evento */}
            <Link to={`/auth`}>
              <button className="button-cool">Buy ticket</button>
            </Link>
          </div>
        ))}
      </div>
      {/* Agrega un enlace para volver a EventGeneric */}
      <Link to="/events">
        <button className="button">All Events</button>
      </Link>
    </div>
  );
};

export default Deportes;
