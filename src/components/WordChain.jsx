export function WordChain({ words }) {
  return (
    <section className="panel chain-panel" aria-label="Cadena de palabras">
      <div className="section-header">
        <h2>Cadena</h2>
        <span>{words.length} palabras</span>
      </div>

      {words.length === 0 ? (
        <p className="empty-state">Todavía no hay palabras válidas.</p>
      ) : (
        <ol className="word-list">
          {[...words].reverse().map((word, index) => (
            <li
              key={`${word.original}-${index}`}
              className={`word-item${index === 0 ? ' is-slide-in' : ''}`}
            >
              <span className="word-text">{word.original}</span>
              <span className="word-points">{word.points} puntos</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
