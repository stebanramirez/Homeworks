import { useMemo, useState } from "react";
import { DoublyLinkedList } from "../data/DoublyLinkedList";
import { mockPages } from "../data/mockData";

function BrowserHistoryPage() {
  const history = useMemo(() => {
    const list = new DoublyLinkedList();
    mockPages.forEach((page) => list.append(page));
    return list;
  }, []);

  const [currentNode, setCurrentNode] = useState(history.tail);

  const goBack = () => {
    if (currentNode && currentNode.prev) {
      setCurrentNode(currentNode.prev);
    }
  };

  const goForward = () => {
    if (currentNode && currentNode.next) {
      setCurrentNode(currentNode.next);
    }
  };

  const currentPage = currentNode?.value;
  const pagesList = history.toArray();

  return (
    <section>
      <h1>Historial de navegacion (Doubly Linked List)</h1>
      <p>
        Lista doblemente enlazada: {history.size()} paginas visitadas con{" "}
        <code>append()</code>.
      </p>

      <div className="browser-bar">
        <button onClick={goBack} disabled={!currentNode?.prev} title="Atras">
          Atras
        </button>
        <button
          onClick={goForward}
          disabled={!currentNode?.next}
          title="Adelante"
        >
          Adelante
        </button>
        <span className="address-bar">{currentPage?.url}</span>
      </div>

      <div className="player-card">
        {currentPage ? (
          <>
            <h2>{currentPage.title}</h2>
            <p className="artist">{currentPage.url}</p>
          </>
        ) : (
          <p>No hay paginas en el historial.</p>
        )}
      </div>

      <h3>Historial completo (head a tail)</h3>
      <ol className="song-list">
        {pagesList.map((page) => (
          <li
            key={page.url}
            className={page.url === currentPage?.url ? "active" : ""}
          >
            {page.title} - {page.url}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default BrowserHistoryPage;