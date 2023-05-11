import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";

function App() {
  const navigate = useNavigate();
  // STATES
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  // EFFECTS
  React.useEffect(() => {
    api
      .getInitialData()
      .then((data) => {
        const [userData, initialCardsData] = data;
        setCurrentUser(userData);
        setCards(initialCardsData);
      })
      .catch((err) => console.log(err));
  }, []);
  // FUNCTIONS
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((newCard) => newCard._id !== card._id)
        );
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateUser(userInfo) {
    api
      .editUserInfo(userInfo.name, userInfo.about)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar(avatar) {
    api
      .editUserAvatar(avatar.avatar)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard.name, newCard.link)
      .then((updatedCard) => {
        setCards([updatedCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setIsSuccess(true);
        navigate("./sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("../", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // добавил зависимость, чтобы email добавлялся сразу,
  // после входа на основную страницу, а не после повторного входа
  React.useEffect(() => {
    checkToken();
  }, [window.location.href]);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/sign-in"
            element={
              <>
                <Header text={"Регистрация"} link={"/sign-up"} />
                <Login handleLogin={handleLogin} />
              </>
            }
          />

          <Route
            path="/sign-up"
            element={
              <>
                <Header text={"Войти"} link={"/sign-in"} />
                <Register handleRegistration={handleRegistration} />
              </>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Header
                    text={"Выйти"}
                    link={"/sign-in"}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    email={userEmail}
                  />
                  <Main
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* popup edit profile */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* popup add card */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/* popup edit avatar */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* confirmation popup */}
        <PopupWithForm
          name="confirmation"
          title="Вы уверены"
          buttonTitle="Да"
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          name="infotooltip"
          isSuccess={isSuccess}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

// TODO
// validation
// burger menu
