import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";
import React from "react";

function ConfirmaionPopup({ isConfirmationPopupOpen, handleCardDelete, card }) {
  const { isValid, setIsValid } = useFormWithValidation();

  React.useEffect(() => {
    if (isConfirmationPopupOpen) setIsValid(true);
  }, [isConfirmationPopupOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleCardDelete(card);
  }

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены"
      buttonTitle="Да"
      isOpen={isConfirmationPopupOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
    ></PopupWithForm>
  );
}

export default ConfirmaionPopup;
