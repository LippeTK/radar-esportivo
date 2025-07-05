import { useEffect, useState } from 'react'
import api from '../utils/api' // seu axios configurado para seu backend

function Lineups({ lineups }) {
  if (!lineups || lineups.length === 0) {
    return <p>Não há escalações disponíveis.</p>
  }

  return (
    <div>
      {lineups.map((team) => (
        <div key={team.team}>
          <h2>
            {team.team} - Formação: {team.formation}
          </h2>
          <ul>
            {team.startXI.map((player) => (
              <li key={player.id}>
                #{player.number} - {player.name} ({player.pos})
              </li>
            ))}
          </ul>

          {team.substitutes.length > 0 && (
            <>
              <h3>Reservas:</h3>
              <ul>
                {team.substitutes.map((player) => (
                  <li key={player.id}>
                    #{player.number} - {player.name} ({player.pos})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Lineups