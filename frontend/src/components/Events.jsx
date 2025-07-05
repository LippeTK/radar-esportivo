function Events({ events }) {
  if (!events || events.length === 0) {
    return <p>Não há eventos disponíveis.</p>
  }

  return (
    <div>
      {events.map((event, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <strong>{event.time}’</strong> - {event.team}: {renderEvent(event)}
        </div>
      ))}
    </div>
  )
}

function renderEvent(event) {
  const { type, detail, player, assist, comments } = event

  if (type === 'Goal') {
    return (
      <>
        ⚽ <strong>Gol</strong> de {player}
        {assist && ` (Assistência de ${assist})`}
        {detail && ` - ${detail}`}
      </>
    )
  }

  if (type === 'Card') {
    const cardEmoji = detail === 'Yellow Card' ? '🟨' : '🟥'
    return (
      <>
        {cardEmoji}{' '}
        <strong>
          {detail === 'Yellow Card' ? 'Cartão Amarelo' : 'Cartão Vermelho'}
        </strong>{' '}
        para {player}
      </>
    )
  }

  if (type === 'subst') {
    return (
      <>
        🔄 <strong>Substituição</strong>: Sai {player}, Entra {assist}
      </>
    )
  }

  return (
    <>
      {type} - {detail} {player && ` (${player})`}
      {comments && ` - ${comments}`}
    </>
  )
}

export default Events
