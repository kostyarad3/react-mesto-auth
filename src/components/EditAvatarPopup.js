import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonTitle="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        className="form__input"
        name="avatar-link"
        id="avatar-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__input-error" id="avatar-link-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
