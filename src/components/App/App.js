import React, { useState } from 'react';
import { Switch, Redirect, useHistory } from 'react-router-dom';
import { Router, Route, IndexRoute } from 'react-router';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Main from './../Main/Main';
import Movies from './../Movies/Movies';
import SavedMovies from './../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState(localStorage.getItem('searchedCards') ? JSON.parse(localStorage.getItem('searchedCards')) : []);
  const [initialCards, setInitialCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const [savedMovies, setSavedMovies] = React.useState(localStorage.getItem('savedMovies') ? JSON.parse(localStorage.getItem('savedMovies')) : []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearchedSavedMovie, setIsSearchedSavedMovie] = React.useState(false);
  const [isShortSavedMovie, setIsShortSavedMovie] = React.useState(false);

  React.useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  }, [])

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  });

  React.useEffect(() => {
    if (loggedIn) {
        mainApi
          .getSavedMovies()
          .then((res) => {
            localStorage.setItem('savedMovies', JSON.stringify(res || []));
            setSavedMovies(res || []);
          })
          .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const checkToken = React.useCallback(() => {
    auth
      .checkToken()
      .then((data) => {
        setLoggedIn(true);
        setEmail(data.email);
      })
      .catch((err) => console.log(err))
 });

  React.useEffect(() => {
    checkToken();
  }, [checkToken]);

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
        .then((result) => {
          setCurrentUser(result[0]);
          setInitialCards(result[1]);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  function handleRegister(data) {
    auth
      .register(data)
      .then(() => {
        handleLogin(data);
        history.push('/movies');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleLogin(data) {
    auth
      .authorize(data)
      .then(() => {
        checkToken();
        history.push('/movies');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleLogout() {
    auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({
          name: '',
          email: '',
        });
        window.localStorage.clear();
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser({ email, name }) {
    mainApi
      .editUserInfo({ email, name })
      .then((res) => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }

  function handleSaveMovie(card) {
    mainApi
      .saveMovie(card)
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify([res, ...savedMovies]));
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteMovie(card) {
    const movie = savedMovies.filter((item) => item.nameRU.toLowerCase() === card.nameRU.toLowerCase());
    mainApi
      .deleteMovieFromSaved(movie[0]._id)
      .then(() => {
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies.filter((i) => i._id !== movie[0]._id)));
        setSavedMovies(savedMovies.filter((i) => i._id !== movie[0]._id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleSubmit(searchValue, isSaved) {
    setIsSearchedSavedMovie(searchValue)
    if (isSaved === true) {
      isShortSavedMovie
      ? setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => {
        return item.duration < 40 && item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
      }))
      : setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => {
        return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase())}));
    } else {
      localStorage.setItem('searchedCards', JSON.stringify(initialCards.filter((item) => {
          return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
        })
      )
    );
    setCards(initialCards.filter((item) => {
      return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase())}));
  }}

  function isShortMovie(value, isSaved) {
    setIsShortSavedMovie(value)
    if (isSaved === true) {

        if (isSearchedSavedMovie) {
          value
          ? setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => item.duration < 40 && item.nameRU.toLowerCase().includes(isSearchedSavedMovie)))
          : setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => item.duration > 0 && item.nameRU.toLowerCase().includes(isSearchedSavedMovie)));
        } else {
          value
          ? setSavedMovies(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration < 40))
          : setSavedMovies(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration > 0));
        }
        }  else {
          value
          ? setCards(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration < 40))
          : setCards(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration > 0));
    }
 }

//  function handleGoBack() {
//   this.props.history.goBack()
//  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
          <Switch>

            <Route path='/' exact>
              <Main loggedIn={loggedIn} />
            </Route>

            <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            cards={cards}
            handleSubmit={handleSubmit}
            isShortMovie={isShortMovie}
            handleSaveMovie={handleSaveMovie}
            deleteMovie={deleteMovie}
            savedMovies={savedMovies}>
              {!loggedIn 
              ? <Redirect to='/' /> 
              : <Movies />}
            </ProtectedRoute>

            <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            isShortMovie={isShortMovie}
            deleteMovie={deleteMovie}
            savedMovies={savedMovies}>
              {!loggedIn
              ? <Redirect to='/' />
              : <SavedMovies />}
            </ProtectedRoute>

            <ProtectedRoute
            path='/profile'
            component={Profile}
            onUpdateUser={handleUpdateUser}
            loggedIn={loggedIn}
            onSignout={handleLogout}>
              {!loggedIn
              ? <Redirect to='/' />
              : <Profile />}
            </ProtectedRoute>

            <Route path='/signup'>
              {!loggedIn
              ? <Register
              onRegister={handleRegister} />
              : <Redirect to='/movies' />}
              </Route>

            <Route path='/signin'>
              {!loggedIn
              ? <Login onLogin={handleLogin} />
              : <Redirect to='/movies' />}
              </Route>

            <Route path='*'>
              <NotFound 
              onGoBack={handleGoBack}/>
            </Route>

          </Switch>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
