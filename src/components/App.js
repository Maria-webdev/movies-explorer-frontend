// import React, { useState } from "react";
// import { Route, Switch, Redirect, useHistory } from "react-router-dom";
// import "../index.css";
// import Header from "./Header";
// import Main from "./Main";
// import Footer from "./Footer";
// import ImagePopup from "./ImagePopup";
// import CurrentUserContext from "../contexts/CurrentUserContext";
// import EditProfilePopup from "./EditProfilePopup";
// import EditAvatarPopup from "./EditAvatarPopup";
// import AddPlacePopup from "./AddPlacePopup";
// import Login from "./Login";
// import Register from "./Register";
// import ProtectedRoute from "./ProtectedRoute";
// import InfoTooltip from "./InfoTooltip";
// import * as auth from "../utils/auth";
// import api from "../utils/api";


function App() {


  return (

    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="page__container">
          <Header loggedIn={loggedIn} email={email} onSignout={handleLogout} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              loggedIn={loggedIn}
            />
            <Route path="/signin">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>
            <Route> {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}</Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard !== null && selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} success={isSuccess} />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;