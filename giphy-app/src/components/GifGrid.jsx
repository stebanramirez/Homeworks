export default function GifGrid({ gifs }) {
  return (
    <div className="grid">
      {gifs.map((g) => (
        <img key={g.id} src={g.url} alt={g.titulo} loading="lazy" />
      ))}
    </div>
  );
}