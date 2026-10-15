import { createContext, useEffect, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCollection } from "../hooks/useCollection";
import { FileTree } from "../classes/FileTree";

export const FilesContext = createContext(null);

export function FilesProvider({ children }) {
  const { user } = useAuth();
  const { results, isPending, error, getAll, add, remove } = useCollection("nodes");

  const cargar = () => user && getAll();

  useEffect(() => {
    cargar();
  }, [user?.uid]);

  // el arbol se reconstruye desde la lista plana guardada en Firestore
  const tree = useMemo(() => FileTree.fromList(results), [results]);

  // valida las reglas antes de guardar
  const createNode = async (parentId, name, type) => {
    if (!user) throw new Error("Debes iniciar sesion para crear");

    if (parentId !== null) {
      const padre = tree.find(parentId);
      if (!padre) throw new Error("La carpeta padre no existe");
      if (!padre.isFolder()) throw new Error("Un archivo no puede tener hijos");
    }

    await add({
      name,
      type,
      parentId,
      ownerEmail: user.email,
      createdAt: Date.now(),
    });
    await cargar();
  };

  // solo se puede borrar si todo lo que contiene es del usuario
  const canDelete = (node) =>
    !!user && tree.subtree(node.id).every((n) => n.ownerEmail === user.email);

  const deleteNode = async (node) => {
    if (!canDelete(node)) throw new Error("Solo puedes borrar lo que creaste");
    for (const n of tree.subtree(node.id)) {
      await remove(n.id);
    }
    await cargar();
  };

  const value = { tree, isPending, error, createNode, deleteNode, canDelete };
  return <FilesContext.Provider value={value}>{children}</FilesContext.Provider>;
}
