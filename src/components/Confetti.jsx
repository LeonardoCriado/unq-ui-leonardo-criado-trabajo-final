import { useEffect, useState } from 'react'

export function Confetti() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2000)
    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="confetti-container" aria-hidden="true">
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
    </div>
  )
}
