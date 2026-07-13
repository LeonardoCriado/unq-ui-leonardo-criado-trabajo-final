export function Leaderboard({ entries }) {
  function getMedal(index) {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'

    return `#${index + 1}`
  }

  return (
    <section className="panel leaderboard-panel" aria-label="Leaderboard local">
      <div className="section-header">
        <h2>Top 10</h2>
      </div>

      {entries.length === 0 ? (
        <p className="empty-state">Todavía no hay puntajes guardados.</p>
      ) : (
        <ol className="leaderboard-list">
          {entries.map((entry, index) => (
            <li key={entry.id} className="leaderboard-item">
              <span className="leaderboard-rank">
                <span className="leaderboard-medal" aria-hidden="true">
                  {getMedal(index)}
                </span>
                <span className="leaderboard-position">{index + 1}</span>
                <span className="leaderboard-score">{entry.score} pts</span>
              </span>
              <span>{entry.wordsCount} palabras</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
