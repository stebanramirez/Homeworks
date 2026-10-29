import { useCallback, useState } from "react";
import { Graph as GrafoD3 } from "react-d3-graph";

const config = {
  directed: false,
  height: 460,
  nodeHighlightBehavior: true,
  node: {
    labelProperty: "label",
    fontSize: 13,
    highlightFontSize: 13,
    highlightStrokeColor: "#1a1a2e",
  },
  link: {
    color: "#9aa5b5",
    highlightColor: "#1a1a2e",
  },
  d3: {
    gravity: -350,
    linkLength: 140,
  },
};

function GrafoVisual({ data }) {
  const [ancho, setAncho] = useState(800);

  // mide el contenedor para que el grafo use todo el ancho
  const contenedorRef = useCallback((nodo) => {
    if (nodo !== null) {
      setAncho(nodo.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div className="grafo-visual" ref={contenedorRef}>
      <GrafoD3 id="grafo-amigos" data={data} config={{ ...config, width: ancho }} />
    </div>
  );
}

export default GrafoVisual;