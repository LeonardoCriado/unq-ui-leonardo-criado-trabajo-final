import { GameHeader } from './components/GameHeader'
import { GameMessage } from './components/GameMessage'
import { GameOverPanel } from './components/GameOverPanel'
import { GameStats } from './components/GameStats'
import { Leaderboard } from './components/Leaderboard'
import { RulesPanel } from './components/RulesPanel'
import { getExpectedLetter } from './game/wordRules'
import { WordChain } from './components/WordChain'
import { WordForm } from './components/WordForm'
import { useGame } from './hooks/useGame'
import './App.css'

function App() {
  const { state, resetGame } = useGame()
  const lastWord = state.words.at(-1)
  const expectedLetter = lastWord ? getExpectedLetter(lastWord.normalized) : null

  return (
    <main className="app-shell">
      <GameHeader />

      <section className="game-layout">
        <div className="game-column">
          <GameStats
            score={state.score}
            wordsCount={state.words.length}
            remainingSeconds={state.remainingSeconds}
            status={state.status}
          />

          <RulesPanel />

          <WordForm />

          {expectedLetter ? (
            <section className="panel hint-panel" aria-label="Siguiente letra esperada">
              <p className="hint-label">Siguiente palabra</p>
              <strong className="hint-letter">Debe empezar con {expectedLetter}</strong>
            </section>
          ) : null}

          <GameMessage type={state.feedback.type} text={state.feedback.text} />

          {state.status === 'game-over' ? (
            <GameOverPanel
              score={state.score}
              wordsCount={state.words.length}
              onRestart={resetGame}
            />
          ) : null}
        </div>

        <div className="game-column">
          <WordChain words={state.words} />
          <Leaderboard entries={state.leaderboard} />
        </div>
      </section>
    </main>
  )
}

export default App
