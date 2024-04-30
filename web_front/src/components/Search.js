import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Error from "./images/404.png";

const Search = () => {
  // Obtener la ubicación actual para acceder a la consulta de búsqueda
  const { search } = useLocation();
  // Parsear la cadena de consulta para obtener el valor de 'q'
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("q");

  // Verificar si la consulta está vacía
  if (!query) {
    return (
      <div className="container">
        <h1>No Search Query Found</h1>
        <img src={Error} alt="Error" />
        <Link to="/events">
          <button className="button">All Events</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-">
      <h1>Search Results</h1>
      <p>You searched for: {query}</p>
      <div className="hola">
        <Link to="/events">
          <button className="button">All Events</button>
        </Link>
      </div>
    </div>
  );
};

export default Search;
