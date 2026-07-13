import { useEffect, useLayoutEffect, useState } from 'react'
import { GameHeader } from './components/GameHeader'
import { GameMessage } from './components/GameMessage'
import { GameStats } from './components/GameStats'
import { Leaderboard } from './components/Leaderboard'
import { RulesPanel } from './components/RulesPanel'
import { WordChain } from './components/WordChain'
import { WordForm } from './components/WordForm'
import { useGame } from './hooks/useGame'
import { loadTheme, saveTheme } from './game/theme'
import './App.css'

function App() {
  const { state } = useGame()
  const [theme, setTheme] = useState(() => loadTheme())

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    saveTheme(theme)
  }, [theme])

  return (
    <main className="app-shell">
      <GameHeader activeTheme={theme} onThemeChange={setTheme} />

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
