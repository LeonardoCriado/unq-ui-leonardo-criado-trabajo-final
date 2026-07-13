import { useEffect, useRef, useState } from 'react'
import { THEMES } from '../game/theme'

export function GameHeader({ activeTheme, onThemeChange }) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false)
  const themeMenuRef = useRef(null)
  const [isMobileLayout, setIsMobileLayout] = useState(false)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 640px)')

    function handleMediaChange(event) {
      setIsMobileLayout(event.matches)
      setIsThemeMenuOpen(false)
    }

    handleMediaChange(mobileQuery)

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', handleMediaChange)
    } else {
      mobileQuery.addListener(handleMediaChange)
    }

    return () => {
      if (mobileQuery.removeEventListener) {
        mobileQuery.removeEventListener('change', handleMediaChange)
      } else {
        mobileQuery.removeListener(handleMediaChange)
      }
    }
  }, [])

  useEffect(() => {
    function handleDocumentClick(event) {
      if (!themeMenuRef.current?.contains(event.target)) {
        setIsThemeMenuOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsThemeMenuOpen(false)
      }
    }

    if (isThemeMenuOpen) {
      document.addEventListener('mousedown', handleDocumentClick)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isThemeMenuOpen])

  const activeThemeLabel = THEMES.find((theme) => theme.id === activeTheme)?.name ?? THEMES[0].name

  function handleThemeSelect(themeId) {
    onThemeChange(themeId)
    setIsThemeMenuOpen(false)
  }

  return (
    <header className="game-header">
      <div className="game-header-copy">
        <p className="eyebrow">TFI de UI</p>
        <h1>Palabras Encadenadas</h1>
        <p className="intro">
          Formá la cadena más larga posible antes de que se termine el tiempo.
        </p>
      </div>

      <div
        className={isMobileLayout ? 'theme-switcher is-mobile-floating' : 'theme-switcher'}
        ref={themeMenuRef}
      >
        <button
          className="theme-toggle"
          type="button"
          aria-haspopup="menu"
          aria-expanded={isThemeMenuOpen}
          aria-label={`Tema actual: ${activeThemeLabel}`}
          onClick={() => setIsThemeMenuOpen((currentValue) => !currentValue)}
        >
          <span className="theme-toggle-label">Tema</span>
          <strong>{activeThemeLabel}</strong>
        </button>

        {isThemeMenuOpen ? (
          <div className="theme-menu" role="menu" aria-label="Selector de tema">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                className={theme.id === activeTheme ? 'theme-option is-active' : 'theme-option'}
                type="button"
                role="menuitemradio"
                aria-checked={theme.id === activeTheme}
                onClick={() => handleThemeSelect(theme.id)}
              >
                <span>{theme.name}</span>
                <small>{theme.description}</small>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  )
}
