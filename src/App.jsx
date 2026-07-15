import { useEffect, useLayoutEffect, useState } from 'react'
import { GameHeader } from './components/GameHeader'
import { GameMessage } from './components/GameMessage'
import { GameStats } from './components/GameStats'
import { Leaderboard } from './components/Leaderboard'
import { RulesPanel } from './components/RulesPanel'
import { WordChain } from './components/WordChain'
import { WordForm } from './components/WordForm'
import { Confetti } from './components/Confetti'
import { useGame } from './hooks/useGame'
import { loadTheme, saveTheme } from './game/theme'
import './App.css'

function App() {
  const { state } = useGame()
  const [theme, setTheme] = useState(() => loadTheme())
  const [screenShake, setScreenShake] = useState(false)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    saveTheme(theme)
  }, [theme])

  useEffect(() => {
    if (state.feedback.type === 'error') {
      setScreenShake(true)
    }
  }, [state.feedback])

  useEffect(() => {
    setScreenShake(false)
  }, [state.status])

  function handleScreenShakeEnd() {
    setScreenShake(false)
  }

  return (
    <main
      className={`app-shell${screenShake ? ' is-screen-shake' : ''}`}
      onAnimationEnd={handleScreenShakeEnd}
    >
      {state.isPodium && state.status === 'game-over' && <Confetti />}

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
