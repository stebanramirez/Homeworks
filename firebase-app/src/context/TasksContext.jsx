import { createContext, useEffect } from "react";
import useCollection from "../hooks/useCollection";
import { useAuth } from "../hooks/useAuth";

export const TasksContext = createContext(null);

// contexto aparte para las tareas, asi las paginas no se pasan props
export function TasksProvider({ children }) {
  const { user } = useAuth();
  const { results, isPending, error, getAll, add, update, remove } =
    useCollection("tasks");

  // cada usuario solo ve sus tareas
  const cargarTareas = () => {
    if (!user) return;
    return getAll([["uid", "==", user.uid]]);
  };

  useEffect(() => {
    cargarTareas();
  }, [user?.uid]);

  const addTask = async (title) => {
    await add({ title, done: false, uid: user.uid, createdAt: Date.now() });
    await cargarTareas();
  };

  const editTask = async (id, title) => {
    await update(id, { title });
    await cargarTareas();
  };

  const toggleTask = async (id, done) => {
    await update(id, { done: !done });
    await cargarTareas();
  };

  const removeTask = async (id) => {
    await remove(id);
    await cargarTareas();
  };

  // las mas nuevas primero
  const tasks = [...results].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <TasksContext.Provider
      value={{ tasks, isPending, error, addTask, editTask, toggleTask, removeTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}
