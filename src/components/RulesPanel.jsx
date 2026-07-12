export function RulesPanel() {
  return (
    <section className="panel rules-panel" aria-label="Reglas del juego">
      <div className="section-header">
        <h2>Reglas</h2>
        <span>15 segundos por turno</span>
      </div>

      <ul className="rules-list">
        <li>La primera palabra puede ser cualquier palabra válida.</li>
        <li>Desde la segunda, debe comenzar con la última letra anterior.</li>
        <li>No se pueden repetir palabras durante la partida.</li>
        <li>Cada palabra válida suma puntos según sus letras.</li>
      </ul>
    </section>
  )
}
