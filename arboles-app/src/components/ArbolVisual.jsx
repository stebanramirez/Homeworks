import { useCallback, useState } from "react";
import Tree from "react-d3-tree";

function ArbolVisual({ data, encontrado }) {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // mide el contenedor para dejar la raiz centrada arriba
  const contenedorRef = useCallback((nodo) => {
    if (nodo !== null) {
      const { width } = nodo.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 50 });
    }
  }, []);

  const dibujarNodo = ({ nodeDatum }) => {
    const esHoja = !nodeDatum.children || nodeDatum.children.length === 0;
    const esEncontrado = nodeDatum.name === encontrado;

    let clase = "nodo-circulo";
    if (esHoja) clase += " nodo-hoja";
    if (esEncontrado) clase += " nodo-encontrado";

    return (
      <g>
        <circle className={clase} r="20" />
        <text className="nodo-texto" textAnchor="middle" dy=".35em">
          {nodeDatum.name}
        </text>
      </g>
    );
  };

  return (
    <div className="arbol-visual" ref={contenedorRef}>
      <Tree
        data={data}
        orientation="vertical"
        translate={translate}
        pathFunc="straight"
        collapsible={false}
        nodeSize={{ x: 70, y: 90 }}
        separation={{ siblings: 1, nonSiblings: 1.2 }}
        renderCustomNodeElement={dibujarNodo}
      />
    </div>
  );
}

export default ArbolVisual;
