import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useTareas() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    const cargar = async () => {
      const { data, error } = await supabase
        .from("tareas")
        .select("*")
        .order("created_at", { ascending: false });

      if (!activo) return;
      if (error) setError(error.message);
      else setTareas(data);
      setLoading(false);
    };
    cargar();

    // lista en vivo, escucha los cambios de la tabla
    const canal = supabase
      .channel("cambios-tareas")
      .on("postgres_changes", { event: "*", schema: "public", table: "tareas" }, (payload) => {
        if (payload.eventType === "INSERT") {
          setTareas((t) => (t.some((x) => x.id === payload.new.id) ? t : [payload.new, ...t]));
        }
        if (payload.eventType === "UPDATE") {
          setTareas((t) => t.map((x) => (x.id === payload.new.id ? payload.new : x)));
        }
        if (payload.eventType === "DELETE") {
          setTareas((t) => t.filter((x) => x.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      activo = false;
      supabase.removeChannel(canal);
    };
  }, []);

  const crear = async (titulo) => {
    const { data, error } = await supabase.from("tareas").insert({ titulo }).select().single();
    if (error) return setError(error.message);
    setTareas((t) => (t.some((x) => x.id === data.id) ? t : [data, ...t]));
  };

  const completar = async (id, valor) => {
    // se marca de una vez en pantalla y se deshace si Supabase falla
    setTareas((t) => t.map((x) => (x.id === id ? { ...x, completada: valor } : x)));

    const { error } = await supabase.from("tareas").update({ completada: valor }).eq("id", id);
    if (error) {
      setError(error.message);
      setTareas((t) => t.map((x) => (x.id === id ? { ...x, completada: !valor } : x)));
    }
  };

  const borrar = async (id) => {
    const { error } = await supabase.from("tareas").delete().eq("id", id);
    if (error) return setError(error.message);
    setTareas((t) => t.filter((x) => x.id !== id));
  };

  return { tareas, loading, error, crear, completar, borrar };
}