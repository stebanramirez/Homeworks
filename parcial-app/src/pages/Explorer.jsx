import { useState } from "react";
import NodoArbol from "../components/NodoArbol";
import { useFiles } from "../hooks/useFiles";

function Explorer() {
  const { tree, isPending, error, createNode } = useFiles();
  const [creando, setCreando] = useState(null);
  const [nombre, setNombre] = useState("");
  const [errorLocal, setErrorLocal] = useState("");

  const guardar = async (evt) => {
    evt.preventDefault();
    if (nombre.trim() === "") return;

    try {
      await createNode(null, nombre.trim(), creando);
      setNombre("");
      setCreando(null);
      setErrorLocal("");
    } catch (err) {
      setErrorLocal(err.message);
    }
  };

  return (
    <div className="explorer">
      <div className="explorer-top">
        <h1>Mis carpetas</h1>
        <div className="acciones">
          <button onClick={() => setCreando("folder")}>+ Carpeta</button>
          <button onClick={() => setCreando("file")}>+ Archivo</button>
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

      {errorLocal && <p className="error">{errorLocal}</p>}
      {error && <p className="error">{error}</p>}
      {isPending && <p className="cargando">Cargando...</p>}

      <div className="arbol">
        {tree.root.children.length === 0 && !isPending ? (
          <p className="vacio">Todavia no hay carpetas ni archivos</p>
        ) : (
          <ul className="lista raiz">
            {tree.root.children.map((nodo) => (
              <NodoArbol key={nodo.id} node={nodo} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Explorer;