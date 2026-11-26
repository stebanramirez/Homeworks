import { useMemo, useState } from 'react'
import { SongTrie } from '../../dataStructures/SongTrie'
import { SongMaxHeap } from '../../dataStructures/SongMaxHeap'
import { SongGraph } from '../../dataStructures/SongGraph'
import { CANCIONES, SIMILARES } from '../../helpers/songsData'
import styles from './Index.module.scss'

const NOMBRES_PUESTO = ['oro', 'plata', 'bronce']

// Arma las tres estructuras con los datos iniciales.
function crearSistema() {
  const trie = new SongTrie()
  const grafo = new SongGraph()
  const catalogo = new Map() // titulo -> { titulo, artista, reproducciones }
  for (const c of CANCIONES) {
    trie.insert(c.titulo)
    grafo.addVertex(c.titulo)
    catalogo.set(c.titulo, { ...c })
  }
  for (const [a, b] of SIMILARES) grafo.addEdge(a, b)
  return { trie, grafo, catalogo }
}

function Parcial3() {
  const [sistema] = useState(crearSistema)
  const [version, setVersion] = useState(0) // sube cada vez que cambian las estructuras
  const [texto, setTexto] = useState('')
  const [resultado, setResultado] = useState(null) // { existe, titulo }
  const [seleccionada, setSeleccionada] = useState('')
  const [nuevo, setNuevo] = useState({ titulo: '', artista: '', similar: '', plays: '' })
  const [mensaje, setMensaje] = useState('')

  const refrescar = () => setVersion((v) => v + 1)

  // Buscador predictivo (Trie)
  const sugerencias = useMemo(
    () => sistema.trie.suggest(texto, 6),
    [sistema, texto, version],
  )

  // TOP 5 (Max Heap): se insertan todas y se extrae el maximo 5 veces.
  const ranking = useMemo(() => {
    const heap = new SongMaxHeap()
    for (const c of sistema.catalogo.values()) heap.insert(c.titulo, c.reproducciones)
    const top = heap.top(5)
    const maximo = top[0]?.reproducciones || 1
    return top.map((c) => ({ ...c, porcentaje: Math.round((c.reproducciones / maximo) * 100) }))
  }, [sistema, version])

  // Recomendaciones (Grafo no dirigido, BFS)
  const relacionadas = useMemo(
    () => (seleccionada ? sistema.grafo.recommend(seleccionada, 2) : []),
    [sistema, seleccionada, version],
  )

  function buscar(e) {
    e.preventDefault()
    const titulo = sistema.trie.find(texto)
    setResultado({ existe: titulo !== null, titulo: titulo ?? texto.trim() })
    if (titulo) setSeleccionada(titulo)
  }

  function elegir(titulo) {
    setTexto(titulo)
    setSeleccionada(titulo)
    setResultado({ existe: true, titulo })
  }

  function reproducir(titulo) {
    sistema.catalogo.get(titulo).reproducciones += 1
    refrescar()
  }

  function agregar(e) {
    e.preventDefault()
    const titulo = nuevo.titulo.trim()
    if (!titulo) return setMensaje('Escribe el titulo de la cancion.')
    if (!sistema.trie.insert(titulo)) return setMensaje('Esa cancion ya existe.')
    sistema.grafo.addVertex(titulo)
    sistema.catalogo.set(titulo, {
      titulo,
      artista: nuevo.artista.trim() || 'Artista desconocido',
      reproducciones: Math.max(0, parseInt(nuevo.plays, 10) || 0),
    })
    if (nuevo.similar) sistema.grafo.addEdge(titulo, nuevo.similar)
    setNuevo({ titulo: '', artista: '', similar: '', plays: '' })
    setMensaje(`"${titulo}" se agrego al catalogo.`)
    refrescar()
  }

  const todas = [...sistema.catalogo.keys()].sort()

  return (
    <main className={styles.page}>
      <h1>Mini plataforma de musica</h1>
      <p className={styles.subtitulo}>
        Trie para buscar, Max Heap para el ranking y un grafo no dirigido para recomendar.
      </p>

      <div className={styles.rejilla}>
        <section className={styles.panel}>
          <h2>Buscador predictivo</h2>
          <form className={styles.fila} onSubmit={buscar}>
            <input
              className={styles.campo}
              value={texto}
              onChange={(e) => {
                setTexto(e.target.value)
                setResultado(null)
              }}
              placeholder="Escribe el inicio de una cancion..."
              aria-label="Buscar cancion"
            />
            <button className={styles.boton} type="submit">Buscar</button>
          </form>

          {resultado && (
            <p className={`${styles.estado} ${resultado.existe ? styles.existe : styles.noExiste}`}>
              {resultado.existe
                ? `"${resultado.titulo}" existe en el catalogo.`
                : `"${resultado.titulo}" no existe en el catalogo.`}
            </p>
          )}

          {sugerencias.length > 0 && (
            <ul className={styles.lista}>
              {sugerencias.map((t) => (
                <li key={t}>
                  <button type="button" className={styles.sugerencia} onClick={() => elegir(t)}>
                    <span>{t}</span>
                    <small>{sistema.catalogo.get(t).artista}</small>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.panel}>
          <h2>Top 5 mas escuchadas</h2>
          <ol className={styles.lista}>
            {ranking.map((c, i) => (
              <li key={c.titulo} className={styles.rankingItem}>
                <span className={`${styles.puesto} ${styles[`puesto-${NOMBRES_PUESTO[i] ?? 'normal'}`]}`}>
                  {i + 1}
                </span>
                <div className={styles.rankingCuerpo}>
                  <strong>{c.titulo}</strong>
                  <div className={styles.barra}>
                    <span style={{ '--ancho': `${c.porcentaje}%` }} />
                  </div>
                  <small>{c.reproducciones.toLocaleString('es-CO')} reproducciones</small>
                </div>
                <button type="button" className={styles.botonSuave} onClick={() => reproducir(c.titulo)}>
                  +1
                </button>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${styles.panel} ${styles.completo}`}>
          <h2>Canciones relacionadas</h2>
          <div className={styles.fila}>
            <select
              className={styles.campo}
              value={seleccionada}
              onChange={(e) => setSeleccionada(e.target.value)}
              aria-label="Cancion base"
            >
              <option value="">Elige una cancion...</option>
              {todas.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {seleccionada && (
              <button type="button" className={styles.boton} onClick={() => reproducir(seleccionada)}>
                Reproducir
              </button>
            )}
          </div>
          {seleccionada && relacionadas.length === 0 && (
            <p>Esta cancion todavia no tiene canciones similares.</p>
          )}
          <ul className={styles.lista}>
            {relacionadas.map((r) => (
              <li key={r.titulo} className={styles.cancion}>
                <span>{r.titulo}</span>
                <span className={styles.distancia}>
                  {r.distancia === 1 ? 'Muy parecida' : 'Parecida'}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${styles.panel} ${styles.completo}`}>
          <h2>Agregar cancion</h2>
          <form className={styles.fila} onSubmit={agregar}>
            <input
              className={styles.campo}
              value={nuevo.titulo}
              onChange={(e) => setNuevo({ ...nuevo, titulo: e.target.value })}
              placeholder="Titulo"
              aria-label="Titulo"
            />
            <input
              className={styles.campo}
              value={nuevo.artista}
              onChange={(e) => setNuevo({ ...nuevo, artista: e.target.value })}
              placeholder="Artista"
              aria-label="Artista"
            />
            <select
              className={styles.campo}
              value={nuevo.similar}
              onChange={(e) => setNuevo({ ...nuevo, similar: e.target.value })}
              aria-label="Similar a"
            >
              <option value="">Similar a... (opcional)</option>
              {todas.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input
              className={styles.campo}
              type="number"
              min="0"
              value={nuevo.plays}
              onChange={(e) => setNuevo({ ...nuevo, plays: e.target.value })}
              placeholder="Reproducciones (opcional)"
              aria-label="Reproducciones iniciales"
            />
            <button className={styles.boton} type="submit">Agregar</button>
          </form>
          {mensaje && <p>{mensaje}</p>}
        </section>
      </div>
    </main>
  )
}

export default Parcial3