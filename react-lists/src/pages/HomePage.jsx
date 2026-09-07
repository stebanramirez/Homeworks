import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section>
      <h1>Challenge 03 - Listas enlazadas</h1>
      <p>Estructuras de Datos II - Homework 03</p>
      <p>Elige una de las páginas para ver la lista en accion:</p>
      <ul className="nav-cards">
        <li>
          <Link to="/songs">Reproductor de canciones (Linked List)</Link>
        </li>
        <li>
          <Link to="/history">
            Historial de navegacion (Doubly Linked List)
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default HomePage;