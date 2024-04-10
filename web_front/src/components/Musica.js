import React from 'react';

const Musica = () => {
  // Array de objetos con información sobre los eventos musicales
  const eventosMusicales = [
    {
      nombre: "Concierto de Justin Bieber",
      imagen: "url_del_concierto.jpg",
      fecha: "5 de Agosto, 2024",
      lugar: "Estadio Santiago Bernabéu, Madrid"
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

export default Musica;
