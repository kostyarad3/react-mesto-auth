import PopupWithForm from "./PopupWithForm"

function ConfirmaionPopup ({isConfirmationPopupOpen, handleCardDelete, card}) {
  
  function handleSubmit(evt) {
    evt.preventDefault()
    handleCardDelete(card)
  }

  return (
    <PopupWithForm
          name="confirmation"
          title="Вы уверены"
          buttonTitle="Да"
          isOpen={isConfirmationPopupOpen}
          onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

export default ConfirmaionPopup 