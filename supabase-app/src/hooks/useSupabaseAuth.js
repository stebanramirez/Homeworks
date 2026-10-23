import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useSupabaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // sesion guardada localmente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // se dispara en login, logout y cuando cambian los datos del usuario
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evento, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const guardarAvatar = async (url) => {
    const { error } = await supabase.auth.updateUser({ data: { avatar_url: url } });
    if (error) throw error;
  };

  return { user, loading, login, register, logout, guardarAvatar };
}