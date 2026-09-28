import { useState } from "react";
import { Pila } from "../data/Pila";
import { mockLibros } from "../data/mockLibros";

function Libros() {
  const [pila, setPila] = useState(() => {
    const inicial = new Pila();
    mockLibros.forEach((libro) => inicial.apilar(libro));
    return inicial;
  });

  const [name, setName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [editorial, setEditorial] = useState("");

  const agregarLibro = (evt) => {
    evt.preventDefault();

    if (!name.trim() || !isbn.trim() || !author.trim() || !editorial.trim()) return;

    setPila((prev) => {
      const copia = new Pila(...prev);
      copia.apilar({ id: Date.now(), name, isbn, author, editorial });
      return copia;
    });

    setName("");
    setIsbn("");
    setAuthor("");
    setEditorial("");
  };

  const retirarLibro = () => {
    setPila((prev) => {
      const copia = new Pila(...prev);
      copia.desapilar();
      return copia;
    });
  };

  const libros = pila.toArray();
  const librosOrdenados = [...libros].reverse();

  return (
    <section className="content">
      <h1>Pila de libros</h1>
      <p className="subtitle">
        {pila.tamano()} libro{pila.tamano() !== 1 ? "s" : ""} en la pila
      </p>

      <form className="book-form" onSubmit={agregarLibro}>
        <input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        <input placeholder="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input placeholder="Editorial" value={editorial} onChange={(e) => setEditorial(e.target.value)} />
        <button type="submit">Apilar libro</button>
      </form>

      {libros.length === 0 ? (
        <p className="empty">No hay libros en la pila.</p>
      ) : (
        <ul className="book-list">
          {librosOrdenados.map((libro, index) => (
            <li key={libro.id} className={index === 0 ? "top-item" : ""}>
              <div>
                <strong>{libro.name}</strong>
                <span className="meta">{libro.author} — {libro.editorial}</span>
                <span className="meta">ISBN: {libro.isbn}</span>
              </div>
              {index === 0 && <button onClick={retirarLibro}>Retirar</button>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Libros;
