import { useState } from "react";
import { useTareas } from "../hooks/useTareas";
import Avatar from "../components/Avatar";
import TareaItem from "../components/TareaItem";

function Tareas() {
  const { tareas, loading, error, crear, completar, borrar } = useTareas();
  const [titulo, setTitulo] = useState("");

  const agregar = async (evt) => {
    evt.preventDefault();
    if (titulo.trim() === "") return;
    await crear(titulo.trim());
    setTitulo("");
  };

  const pendientes = tareas.filter((t) => !t.completada).length;

  return (
    <div className="pagina">
      <Avatar />

      <h1>Tareas</h1>
      <p className="subtitulo">
        {tareas.length} en total, {pendientes} pendientes
      </p>

      <form className="form-tarea" onSubmit={agregar}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={titulo}
          onChange={(evt) => setTitulo(evt.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <p className="cargando">Cargando...</p>}
      {!loading && tareas.length === 0 && <p className="vacio">Todavia no tienes tareas</p>}

      <ul className="lista">
        {tareas.map((tarea) => (
          <TareaItem key={tarea.id} tarea={tarea} onCompletar={completar} onBorrar={borrar} />
        ))}
      </ul>
    </div>
  );
}

export default Tareas;