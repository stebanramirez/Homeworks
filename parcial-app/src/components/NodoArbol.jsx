import { useState } from "react";
import { useFiles } from "../hooks/useFiles";

// se llama a si mismo para dibujar las carpetas anidadas
function NodoArbol({ node }) {
  const { createNode, deleteNode, canDelete } = useFiles();
  const [abierto, setAbierto] = useState(true);
  const [creando, setCreando] = useState(null); // "folder" | "file" | null
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  const guardar = async (evt) => {
    evt.preventDefault();
    if (nombre.trim() === "") return;

    try {
      await createNode(node.id, nombre.trim(), creando);
      setNombre("");
      setCreando(null);
      setError("");
      setAbierto(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const borrar = async () => {
    try {
      await deleteNode(node);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <li className="nodo">
      <div className="fila">
        {node.isFolder() ? (
          <button className="toggle" onClick={() => setAbierto(!abierto)}>
            {abierto ? "-" : "+"}
          </button>
        ) : (
          <span className="toggle" />
        )}

        <span className={node.isFolder() ? "icono carpeta" : "icono archivo"}></span>
        <span className="nombre">{node.name}</span>
        <span className="dueno">{node.ownerEmail}</span>

        <div className="acciones">
          {/* solo las carpetas pueden recibir hijos */}
          {node.isFolder() && (
            <>
              <button onClick={() => setCreando("folder")}>+ Carpeta</button>
              <button onClick={() => setCreando("file")}>+ Archivo</button>
            </>
          )}
          {canDelete(node) && (
            <button className="peligro" onClick={borrar}>
              Eliminar
            </button>
          )}
        </div>
      </div>

      {creando && (
        <form className="form-nodo" onSubmit={guardar}>
          <input
            autoFocus
            placeholder={creando === "folder" ? "Nombre de la carpeta" : "Nombre del archivo"}
            value={nombre}
            onChange={(evt) => setNombre(evt.target.value)}
          />
          <button type="submit">Crear</button>
          <button type="button" onClick={() => setCreando(null)}>
            Cancelar
          </button>
        </form>
      )}

      {error && <p className="error">{error}</p>}

      {node.isFolder() && abierto && node.children.length > 0 && (
        <ul className="lista">
          {node.children.map((hijo) => (
            <NodoArbol key={hijo.id} node={hijo} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default NodoArbol;