export function GameMessage({ type, text }) {
  return (
    <section className={`message message-${type}`} aria-live="polite">
      {text}
    </section>
  )
}
