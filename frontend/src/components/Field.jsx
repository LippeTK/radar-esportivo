import "./Field.css"

function Field({event, elapsed}) {
  const { type, detail, player, assist, comments, time } = event
  return(
    <div className="field-container">
      {time === elapsed && (
        <h1 className="event-text">
          <>
            {type} - {detail} {player && ` (${player})`}
            {comments && ` - ${comments}`}
          </>
        </h1>
      )}
      {time !== elapsed &&(
        <>
          <h3 className="event-text">Se um evento tiver ocorrido nesse minuto, aparecerá aqui...</h3>        
        </>
      )}
      <img src="/campo.JPEG" alt="Campo" className="field-image"></img>
    </div>
    )
}
export default Field
