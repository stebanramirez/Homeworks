import ItemMenu from "./ItemMenu";

function Sidebar({ menu }) {
  return (
    <nav className="sidebar">
      {menu.root.children.map((nodo) => (
        <ItemMenu key={nodo.link} node={nodo} />
      ))}
    </nav>
  );
}

export default Sidebar;
