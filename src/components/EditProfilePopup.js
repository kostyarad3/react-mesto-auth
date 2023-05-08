import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  // STATES
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  // FUNCTIONS
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  // EFFECTS
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form__input"
        name="profile-name"
        id="profile-name"
        value={name || ""}
        onChange={handleNameChange}
        required
        minLength="2"
        maxLength="40"
      />
      <span className="form__input-error" id="profile-name-error"></span>
      <input
        type="text"
        className="form__input"
        name="profile-job"
        id="profile-job"
        value={description || ""}
        onChange={handleDescriptionChange}
        required
        minLength="2"
        maxLength="200"
      />
      <span className="form__input-error" id="profile-job-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
