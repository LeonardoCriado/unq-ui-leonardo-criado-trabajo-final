import { useEffect, useRef } from 'react'
import { useGame } from '../hooks/useGame'

export function WordForm() {
  const { state, setInputValue, submitWord, resetGame } = useGame()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [state.status])

  useEffect(() => {
    if (state.feedback.type !== 'info') {
      inputRef.current?.focus()
    }
  }, [state.feedback])

  function handleSubmit(event) {
    event.preventDefault()
    submitWord(state.inputValue)
  }

  return (
    <section className="panel">
      <form className="word-form" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="word-input">
          Ingresar palabra
        </label>
        <div className="field-row">
          <input
            ref={inputRef}
            id="word-input"
            className="word-input"
            value={state.inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Ejemplo: casa"
            autoComplete="off"
            spellCheck="false"
            disabled={state.status === 'game-over' || state.loading}
          />
          <button className="primary-button" type="submit" disabled={state.loading}>
            {state.loading ? 'Validando...' : 'Jugar'}
          </button>
          <button className="secondary-button" type="button" onClick={resetGame}>
            Reiniciar
          </button>
        </div>
      </form>
    </section>
  )
}
