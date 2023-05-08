function ImagePopup (props) {
  return (
    <div className={`popup popup_type_place ${props.card.name ? 'popup_opened' : ''}`}>
      <figure className="popup__content">
        <img 
        src={props.card.name ? props.card.link : ''} 
        alt={props.card.name ? props.card.name : ''} 
        className="popup__image"/>
        <figcaption className="popup__caption">{props.card ? props.card.name : ''}</figcaption>
        <button 
        onClick={props.onClose} 
        className="button button_type_close"
        type="button" 
        aria-label="Закрыть"
        ></button>
      </figure>
    </div>   
  )
}

export default ImagePopup
