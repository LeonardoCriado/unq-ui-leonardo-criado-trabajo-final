export function GameOverPanel({ score, wordsCount, onRestart }) {
  return (
    <section className="panel game-over-panel" aria-live="polite">
      <p className="eyebrow">Partida finalizada</p>
      <h2>Se terminó el tiempo</h2>
      <p>
        Lograste {wordsCount} palabras válidas y sumaste {score} puntos.
      </p>
      <button className="primary-button" type="button" onClick={onRestart}>
        Jugar de nuevo
      </button>
    </section>
  )
}
