import React, { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
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
import Preloader from '../Preloader/Preloader';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState(localStorage.getItem('searchedCards') ? JSON.parse(localStorage.getItem('searchedCards')) : []);
  const [initialCards, setInitialCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesId, setSavedMoviesId] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  });

  React.useEffect(() => {
    if (loggedIn) {
      const savedMovieLocalStorage = localStorage.getItem('savedMovies');

      if (!savedMovieLocalStorage) {
        mainApi
          .getSavedMovies()
          .then((res) => {
            localStorage.setItem('savedMovies', JSON.stringify(res || []));
            setSavedMovies(res || []);
          })
          .catch((err) => console.log(err));
      } else {
        setSavedMovies(JSON.parse(savedMovieLocalStorage));
      }
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
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    checkToken();
  }, [checkToken]);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
        .then((result) => {
          setCurrentUser(result[0]);
          // setCards(result[1].reverse());
          //setIsFiltered(result[1].reverse());
          setInitialCards(result[1].reverse());
        })
        .catch((err) => console.log(err));
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
      .then((data) => {
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
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies.filter((i) => i._id !== movie[0]._id)));
        setSavedMovies(savedMovies.filter((i) => i._id !== movie[0]._id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleSubmit(searchValue) {
    localStorage.setItem(
      'searchedCards',
      JSON.stringify(
        initialCards.filter((item) => {
          return item.nameRU.toLowerCase().includes(searchValue.toLowerCase());
        })
      )
    );
    setCards(initialCards.filter((item) => item.nameRU.toLowerCase().includes(searchValue.toLowerCase())));
  }

  function isShortMovie(value) {
    initialCards.filter((item) => item.duration < 40);
    value ? setCards(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration < 40)) : setCards(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration > 0));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        {isLoading ? (
          <Preloader />
        ) : (
          <Switch>

            <Route path='/' exact>
              <Main loggedIn={loggedIn} />
            </Route>

            <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={loggedIn}
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
              <NotFound />
            </Route>
          </Switch>
        )}
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
