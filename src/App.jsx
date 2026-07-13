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
          
          <GameMessage type={state.feedback.type} text={state.feedback.text} />

          <WordForm />

          <WordChain words={state.words} />

        </div>

        <div className="game-column">
          <RulesPanel />
          <Leaderboard entries={state.leaderboard} />
        </div>
      </section>
    </main>
  )
}

export default App
