function InfoTooltip({ name, text, image, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="infotooltip">
        <img
          className="infotooltip__image"
          src={image}
          alt="Картинка регистрации"
        />
        <p className="infotooltip__paragraph">{text}</p>
        <button
          onClick={onClose}
          className="button button_type_close"
          type="button"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  );
}
export default InfoTooltip;
