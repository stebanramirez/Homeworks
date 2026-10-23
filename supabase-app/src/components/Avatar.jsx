import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

function Avatar() {
  const { user, guardarAvatar } = useAuth();
  const [error, setError] = useState("");
  const [subiendo, setSubiendo] = useState(false);

  const url = user.user_metadata?.avatar_url;

  const subir = async (evt) => {
    const file = evt.target.files[0];
    if (!file) return;

    setError("");
    setSubiendo(true);

    // la carpeta se llama como el id del usuario, lo exige la politica del bucket
    const extension = file.name.split(".").pop();
    const ruta = `${user.id}/${Date.now()}.${extension}`;

        const { error: errorSubida } = await supabase.storage
      .from("avatars")
      .upload(ruta, file);

    if (errorSubida) {
      setError(errorSubida.message);
      setSubiendo(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(ruta);

    try {
      await guardarAvatar(data.publicUrl);
    } catch (err) {
      setError(err.message);
    }
    setSubiendo(false);
  };

  return (
    <div className="avatar-box">
      {url ? <img className="avatar" src={url} alt="Avatar" /> : <div className="avatar vacio-avatar" />}
      <div>
        <label className="boton-archivo">
          {subiendo ? "Subiendo..." : "Cambiar foto"}
          <input type="file" accept="image/*" onChange={subir} disabled={subiendo} hidden />
        </label>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Avatar;