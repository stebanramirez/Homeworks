import { useRed } from "./hooks/useRed";
import FormCiudad from "./components/FormCiudad";
import FormPersona from "./components/FormPersona";
import GrafoVisual from "./components/GrafoVisual";
import PersonasPorCiudad from "./components/PersonasPorCiudad";
import Adyacencia from "./components/Adyacencia";
import "./styles/App.css";

function App() {
  const {
    red,
    data,
    seleccionada,
    ciudades,
    agregarCiudad,
    agregarPersona,
    eliminarPersona,
    eliminarCiudad,
    seleccionar,
  } = useRed();

  const borrarCiudad = (id) => {
    try {
      eliminarCiudad(id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="pagina">
      <h1>Grafo de amigos y ciudades</h1>
      <p className="subtitulo">Los cuadrados son ciudades y los circulos son personas</p>

      <div className="formularios">
        <FormCiudad onAgregar={agregarCiudad} />
        <FormPersona ciudades={ciudades} onAgregar={agregarPersona} />
      </div>

      <GrafoVisual data={data} />

      <div className="paneles">
        <PersonasPorCiudad
          red={red}
          ciudades={ciudades}
          seleccionada={seleccionada}
          onSeleccionar={seleccionar}
          onEliminarPersona={eliminarPersona}
          onEliminarCiudad={borrarCiudad}
        />
        <Adyacencia red={red} />
      </div>
    </div>
  );
}

export default App;