export function Leaderboard({ entries }) {
  return (
    <section className="panel leaderboard-panel" aria-label="Leaderboard local">
      <div className="section-header">
        <h2>Top 10 local</h2>
        <span>{entries.length} partidas</span>
      </div>

      {entries.length === 0 ? (
        <p className="empty-state">Todavía no hay puntajes guardados.</p>
      ) : (
        <ol className="leaderboard-list">
          {entries.map((entry, index) => (
            <li key={entry.id} className="leaderboard-item">
              <span>
                #{index + 1} · {entry.score} pts
              </span>
              <span>{entry.wordsCount} palabras</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
