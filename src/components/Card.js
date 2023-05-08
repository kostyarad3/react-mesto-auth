import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  // STATES AND CONSTANTS
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `button place__like ${
    isLiked && "place__like_active"
  }`;
  // FUNCTIONS
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLike() {
    props.onCardLike(props.card);
  }
  function handleDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="place">
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="place__image"
      />
      {isOwn && (
        <button
          className="button place__delete"
          type="button"
          aria-label="Удалить"
          onClick={handleDelete}
        ></button>
      )}
      <div className="place__content">
        <h2 className="place__name">{props.card.name}</h2>
        <div className="place__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLike}
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="place__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
