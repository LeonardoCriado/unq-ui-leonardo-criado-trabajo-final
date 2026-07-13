import { TURN_SECONDS } from '../context/GameContext'

export function GameStats({ score, wordsCount, remainingSeconds, status }) {
  const timerClassName =
    remainingSeconds <= 5 && status !== 'game-over' ? 'stat-value danger' : 'stat-value'

  return (
    <section className="stats-grid" aria-label="Estado de la partida">
      <article className="stat-card">
        <span className="stat-label">Puntaje</span>
        <strong className="stat-value">{score}</strong>
      </article>
      <article className="stat-card">
        <span className="stat-label">Palabras válidas</span>
        <strong className="stat-value">{wordsCount}</strong>
      </article>
      <article className="stat-card">
        <span className="stat-label">Tiempo</span>
        <strong className={timerClassName}>
          {remainingSeconds}s
        </strong>
      </article>
    </section>
  )
}
