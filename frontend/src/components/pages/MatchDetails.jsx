import { useLocation } from 'react-router-dom'
import './MatchDetails.css'
import Timeline from '../Timeline'
import { useState, useEffect } from 'react'
import api from '../../utils/api'
import StatsCard from '../StatsCard'
import Field from '../Field'
import Lineups from '../Lineups'
import Events from '../Events'
import useWindowSize from '../../hooks/useWindowSize'

function MatchDetails() {
  const { width } = useWindowSize()

  const isDesktop = width >= 768
  const [matchDetails, setMatchDetails] = useState(null)
  const location = useLocation()
  const { match } = location.state || {}
  const [activeTab, setActiveTab] = useState('field')

  if (!match) return <p>Jogo não encontrado</p>

  useEffect(() => {
    let intervalId

    const fetchMatchDetails = async () => {
      try {
        const response = await api.get(`/match/${match.id}`)
        setMatchDetails(response.data)
        console.log('🔁 Dados atualizados:', response.data)
      } catch (error) {
        console.error('Erro ao buscar os jogos:', error)
      }
    }

    fetchMatchDetails()

    intervalId = setInterval(fetchMatchDetails, 60000) // 60000ms = 1 min

    return () => clearInterval(intervalId)
  }, [match.id])

  if (!matchDetails) return <p>Carregando estatísticas...</p>

  const homeStats = matchDetails.statistics.find(
    (team) => team.team === match.home
  )
  const awayStats = matchDetails.statistics.find(
    (team) => team.team === match.away
  )

  if (!homeStats || !awayStats) {
    return (
      <p>
        Infelizmente esse jogo não possui estatísticas, tente de um campeonato
        principal...
      </p>
    )
  }

  const statsList = [
    { key: 'blockedShots', label: 'Chutes Bloqueados' },
    { key: 'shotsOnGoal', label: 'Chutes no Gol' },
    { key: 'shotsOffGoal', label: 'Chutes para Fora' },
    { key: 'totalShots', label: 'Total de Chutes' },
    { key: 'shotsInsideBox', label: 'Chutes Dentro da Área' },
    { key: 'shotsOutsideBox', label: 'Chutes Fora da Área' },
    { key: 'fouls', label: 'Faltas' },
    { key: 'cornerKicks', label: 'Escanteios' },
    { key: 'goalkeeperSaves', label: 'Defesas' },
    { key: 'yellowCards', label: 'Cartões Amarelos' },
    { key: 'redCards', label: 'Cartões Vermelhos' },
    { key: 'possession', label: 'Posse de Bola' },
  ]

  return (
    <div>
      <div className="match-header">
        <div className="home-team">
          <h1>{matchDetails.match.teams.home.name}</h1>
        </div>
        <div className="goals">
          <h1>{matchDetails.match.goals.home}</h1>
          <h1>-</h1>
          <h1>{matchDetails.match.goals.away}</h1>
        </div>
        <div className="away-team">
          <h1>{matchDetails.match.teams.away.name}</h1>
        </div>
      </div>

      <Timeline time={matchDetails.match.fixture.status.elapsed} />

      <div className="stats-container">
        <div className="tabs-container">
          <div className="tab-content">
            {activeTab === 'field' && (
              <Field
                event={
                  matchDetails.events[matchDetails.events.length - 1] || ''
                }
                elapsed={matchDetails.match.fixture.status.elapsed}
              />
            )}
            {activeTab === 'lineups' && (
              <Lineups lineups={matchDetails.lineups} />
            )}
            {activeTab === 'events' && <Events events={matchDetails.events} />}
            {/* Se for mobile, Stats entra como aba */}
            {!isDesktop && activeTab === 'stats' && (
              <div className="stats">
                {statsList.map((stat) => (
                  <StatsCard
                    key={stat.key}
                    label={stat.label}
                    homeValue={homeStats ? homeStats[stat.key] : '-'}
                    awayValue={awayStats ? awayStats[stat.key] : '-'}
                    className="stats-card"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="tabs">
            <button
              className={activeTab === 'field' ? 'active' : ''}
              onClick={() => setActiveTab('field')}
            >
              Campo
            </button>
            <button
              className={activeTab === 'lineups' ? 'active' : ''}
              onClick={() => setActiveTab('lineups')}
            >
              Escalações
            </button>
            <button
              className={activeTab === 'events' ? 'active' : ''}
              onClick={() => setActiveTab('events')}
            >
              Eventos
            </button>
            {!isDesktop && (
              <button
                className={activeTab === 'stats' ? 'active' : ''}
                onClick={() => setActiveTab('stats')}
              >
                Estatísticas
              </button>
            )}
          </div>
        </div>

        {isDesktop && (
          <div className="stats">
            {statsList.map((stat) => (
              <StatsCard
                key={stat.key}
                label={stat.label}
                homeValue={homeStats ? homeStats[stat.key] : '-'}
                awayValue={awayStats ? awayStats[stat.key] : '-'}
                className="stats-card"
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <p>
          {matchDetails.match.fixture.status.long} -{' '}
          {matchDetails.match.fixture.status.elapsed} min
        </p>
      </div>
    </div>
  )
}

export default MatchDetails
