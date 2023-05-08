import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="container">
      <section className="profile">
        <div className="profile__photo">
          <img
            src={currentUser.avatar}
            alt="Фотография пользователя"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            className="profile__avatar"
          />
          <button
            onClick={props.onEditAvatar}
            className="button profile__avatar-button"
          ></button>
        </div>
        <div className="profile__content">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__info">{currentUser.about}</p>
          <button
            onClick={props.onEditProfile}
            className="button button_type_edit"
            type="button"
            aria-label="Редактировать"
          ></button>
        </div>
        <button
          onClick={props.onAddPlace}
          className="button button_type_add"
          type="button"
          aria-label="Добавить"
        ></button>
      </section>
      <section className="cards">
        <ul className="places">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
