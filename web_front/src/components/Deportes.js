import React from 'react';

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
    <div>
      <h1>Eventos Deportivos</h1>
      <div className="eventos-container">
        {eventosDeportivos.map((evento, index) => (
          <div key={index} className="evento">
            <img src={evento.imagen} alt={evento.nombre} />
            <h2>{evento.nombre}</h2>
            <p>Precio de la entrada: {evento.precioEntrada}</p>
            {/* Otros detalles del evento */}
            <button>Comprar entradas</button>
        </div>
        ))}
      </div>

      <footer>
        <p>© 2024 EventChain. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Deportes;
