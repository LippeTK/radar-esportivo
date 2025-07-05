import { Link } from 'react-router-dom'
import api from '../utils/api'
import { useEffect, useState } from 'react'
import './LiveMatches.css'

function LiveMatches() {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    let intervalId

    const fetchMatches = () => {
      api
        .get('/match')
        .then((response) => {
          setMatches(response.data)
        })
        .catch((error) => {
          console.error('Erro ao buscar os jogos:', error)
        })
    }

    fetchMatches()

    intervalId = setInterval(fetchMatches, 1800000) // chama a cada 30min

    return () => clearInterval(intervalId) // Limpa o intervalo quando sai da página
  }, [])

  if (matches.length === 0)
    return <p className="no-match">Não há jogos ao vivo no momento.</p>

  return (
    <div>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            <Link to={`/match/${match.id}`} state={{ match }} className="match">
              <div className="match-title">
                <h3>{match.league}</h3>
                <p>
                  {match.home} x {match.away}
                </p>
              </div>
              <div className="match-status">
                {match.goalsHome} x {match.goalsAway} {match.status}{' '}
                {match.elapsed} min
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LiveMatches
