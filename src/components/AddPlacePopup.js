import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  // STATES
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");
  // FUNCTIONS
  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }
  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form__input"
        name="card-name"
        value={cardName || ""}
        onChange={handleCardNameChange}
        id="card-name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="form__input-error" id="card-name-error"></span>
      <input
        type="url"
        className="form__input"
        name="card-link"
        value={cardLink || ""}
        onChange={handleCardLinkChange}
        id="card-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__input-error" id="card-link-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
