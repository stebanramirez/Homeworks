import { useMemo, useState } from "react";
import { LinkedList } from "../data/LinkedList";
import { mockSongs } from "../data/mockData";

function SongsPage() {
  const playlist = useMemo(() => {
    const list = new LinkedList();
    mockSongs.forEach((song) => list.append(song));
    return list;
  }, []);

  const [currentNode, setCurrentNode] = useState(playlist.head);

  const playNext = () => {
    if (currentNode && currentNode.next) {
      setCurrentNode(currentNode.next);
    }
  };

  const restart = () => setCurrentNode(playlist.head);

  const currentSong = currentNode?.value;
  const songsList = playlist.toArray();
  const currentIndex = songsList.findIndex((s) => s === currentSong);

  return (
    <section>
      <h1>Reproductor de canciones (Linked List)</h1>
      <p>
        Lista enlazada simple: {playlist.size()} canciones cargadas con{" "}
        <code>append()</code>.
      </p>

      <div className="player-card">
        {currentSong ? (
          <>
            <h2>{currentSong.title}</h2>
            <p className="artist">{currentSong.artist}</p>
            <p className="position">
              Cancion {currentIndex + 1} de {playlist.size()}
            </p>
          </>
        ) : (
          <p>No hay canciones en la lista.</p>
        )}
      </div>

      <div className="controls">
        <button onClick={restart}>Reiniciar</button>
        <button onClick={playNext} disabled={!currentNode?.next}>
          Siguiente
        </button>
      </div>

      <h3>Playlist completa</h3>
      <ol className="song-list">
        {songsList.map((song) => (
          <li
            key={song.title}
            className={song.title === currentSong?.title ? "active" : ""}
          >
            {song.title} - {song.artist}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default SongsPage;