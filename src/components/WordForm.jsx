import { useEffect, useRef, useState } from 'react'
import { useGame } from '../hooks/useGame'

export function WordForm() {
  const { state, setInputValue, submitWord, resetGame } = useGame()
  const inputRef = useRef(null)
  const [animClass, setAnimClass] = useState('')

  useEffect(() => {
    inputRef.current?.focus()
  }, [state.status])

  useEffect(() => {
    if (state.feedback.type !== 'info') {
      inputRef.current?.focus()
    }
  }, [state.feedback])

  useEffect(() => {
    if (state.feedback.type === 'success') {
      setAnimClass('is-pop is-glow-success')
    } else if (state.feedback.type === 'error') {
      setAnimClass('is-shake is-flash-error')
    } else {
      setAnimClass('')
    }
  }, [state.feedback])

  useEffect(() => {
    setAnimClass('')
  }, [state.status])

  function handleAnimationEnd() {
    setAnimClass('')
  }

  const isGameOver = state.status === 'game-over'

  function handleSubmit(event) {
    event.preventDefault()
    submitWord(state.inputValue)
  }

  function handleReset() {
    resetGame()
    inputRef.current?.focus()
  }

  return (
    <section className="panel">
      <form className="word-form" onSubmit={handleSubmit}>
        <div className="field-row">
          <input
            ref={inputRef}
            id="word-input"
            className={`word-input ${animClass}`}
            value={state.inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Ejemplo: casa"
            autoComplete="off"
            spellCheck="false"
            disabled={isGameOver || state.loading}
            onAnimationEnd={handleAnimationEnd}
          />
          {isGameOver ? (
            <button
              className="primary-button icon-button"
              type="button"
              onClick={handleReset}
              aria-label="Reiniciar partida"
              title="Reiniciar"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 12a8 8 0 1 0 2.5-5.8"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4v4h4"
                />
              </svg>
            </button>
          ) : (
            <button
              className="primary-button icon-button"
              type="submit"
              disabled={state.loading}
              aria-label="Enviar palabra"
              title="Jugar"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
