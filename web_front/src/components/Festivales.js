import React from "react";

const Festivales = () => {
  // Array de objetos con información sobre los festivales
  const festivales = [
    {
      nombre: "Tomorrowland",
      imagen: "url_del_festival.jpg",
      fecha: "20-22 de Julio, 2024",
      ubicacion: "Boom, Bélgica",
    },
    // Puedes agregar más objetos para representar más festivales
  ];

  return (
    <div>
      <h1>Festivales</h1>
      <div className="eventos-container">
        {festivales.map((festival, index) => (
          <div key={index} className="evento">
            <img src={festival.imagen} alt={festival.nombre} />
            <h2>{festival.nombre}</h2>
            <p>Fecha: {festival.fecha}</p>
            <p>Ubicación: {festival.ubicacion}</p>
            <button>Comprar entradas</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Festivales;
