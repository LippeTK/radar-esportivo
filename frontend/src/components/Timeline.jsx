import './Timeline.css'

function Timeline({ time }) {
  const ticks = [
    { label: '0', position: '0%' },
    { label: '15', position: '16.6%' },
    { label: '30', position: '33.3%' },
    { label: 'HT', position: '50%' },
    { label: '60', position: '66.6%' },
    { label: '75', position: '83.3%' },
    { label: '90', position: '100%' },
  ]

  const currentMinute = time
  const progress = (currentMinute / 90) * 100

  return (
    <div className="timeline">
      <div className="progress" style={{ width: `${progress}%` }}></div>

      {ticks.map((tick) => (
        <div key={tick.label} className="tick" style={{ left: tick.position }}>
          {tick.label}
        </div>
      ))}
    </div>
  )
}
export default Timeline
