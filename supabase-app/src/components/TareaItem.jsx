function TareaItem({ tarea, onCompletar, onBorrar }) {
  return (
    <li className={tarea.completada ? "tarea hecha" : "tarea"}>
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={(evt) => onCompletar(tarea.id, evt.target.checked)}
      />
      <span className="tarea-titulo">{tarea.titulo}</span>
      <button className="btn-borrar" onClick={() => onBorrar(tarea.id)}>
        Eliminar
      </button>
    </li>
  );
}

export default TareaItem;