import './StatsCard.css'

function StatsCard({ label, homeValue, awayValue }) {
  const labels = [{ 'Blocked Shots': 'Chutes bloqueados' }]

  return (
    <div className="stats-card">
      <div className="stats-card-container">
        <div className="stats-values">
          <span className="home-value">{homeValue ?? 0}</span>|
          <span className="away-value">{awayValue ?? 0}</span>
        </div>
        <div>
          <div className="stats-label">{label}</div>
        </div>
      </div>
    </div>
  )
}
export default StatsCard
