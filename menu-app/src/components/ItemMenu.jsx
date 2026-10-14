import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// se llama a si mismo para pintar los submenus
function ItemMenu({ node }) {
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  if (node.isLeaf()) {
    return (
      <NavLink to={node.link} className="item">
        {node.title}
      </NavLink>
    );
  }

  const alternar = () => {
    setAbierto(!abierto);
    navigate(node.link);
  };

  return (
    <div>
      <button className="item padre" onClick={alternar}>
        {node.title}
        <span>{abierto ? "▲" : "▼"}</span>
      </button>
      {abierto && (
        <div className="submenu">
          {node.children.map((hijo) => (
            <ItemMenu key={hijo.link} node={hijo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemMenu;
