import React from "react";

const Teatro = () => {
  // Array de objetos con información sobre los espectáculos de teatro
  const espectaculosTeatro = [
    {
      nombre: "Show de Jose Mota",
      imagen: "url_del_espectaculo.jpg",
      fecha: "10 de Mayo, 2024",
      lugar: "Teatro Real, Madrid",
    },
    // Puedes agregar más objetos para representar más espectáculos de teatro
  ];

  return (
    <div>
      <h1>Teatro</h1>
      <div className="eventos-container">
        {espectaculosTeatro.map((espectaculo, index) => (
          <div key={index} className="evento">
            <img src={espectaculo.imagen} alt={espectaculo.nombre} />
            <h2>{espectaculo.nombre}</h2>
            <p>Fecha: {espectaculo.fecha}</p>
            <p>Lugar: {espectaculo.lugar}</p>
            <button>Comprar entradas</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teatro;
