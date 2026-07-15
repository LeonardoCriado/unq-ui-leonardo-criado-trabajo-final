export function GameMessage({ type, text }) {
  return (
    <section
      key={`${type}-${text}`}
      className={`message message-${type} is-message-in`}
      aria-live="polite"
    >
      {text}
    </section>
  )
}
