export default function Buscador({ valor, onCambio }) {
  return (
    <input
      className="buscador"
      type="text"
      placeholder="Busca un gif (ej: smile, cats, football)"
      value={valor}
      onChange={(e) => onCambio(e.target.value)}
    />
  );
}