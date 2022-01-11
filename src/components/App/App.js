import React from 'react';
import { Switch, Redirect, useHistory } from 'react-router-dom';
import { Route } from 'react-router';
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
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('loggedIn'));
  const [cards, setCards] = React.useState(localStorage.getItem('searchedCards') ? JSON.parse(localStorage.getItem('searchedCards')) : []);
  const [initialCards, setInitialCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const [savedMovies, setSavedMovies] = React.useState(localStorage.getItem('savedMovies') ? JSON.parse(localStorage.getItem('savedMovies')) : []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearchedSavedMovie, setIsSearchedSavedMovie] = React.useState(false);
  const [isShortSavedMovie, setIsShortSavedMovie] = React.useState(false);
  const [isSearched, setIsSearched] = React.useState(false);
  const [isShortMovieButton, setIsShortMovieButton] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  }, []);

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
        setEmail(data.email);
        localStorage.setItem('loggedIn', 'true');
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [loggedIn, history]);

  React.useEffect(() => {
    checkToken();
  }, [checkToken]);

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([mainApi.getUserInfo()])
        .then((result) => {
          setCurrentUser(result[0]);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  function showMessage(message) {
    setMessage(message);
    setTimeout(() => setMessage(''), 10000);
  }

  function handleRegister(data) {
    auth
      .register(data)
      .then(() => {
        handleLogin(data);
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          return showMessage('Внесены неверные данные');
        } else if (err === 'Ошибка: 409') {
          return showMessage('Пользователь с таким email уже существует');
        } else if (err === 'Ошибка: 500') {
          return showMessage('Сервер не отвечает');
        }
        console.log(err);
      });
  }

  function handleLogin(data) {
    auth
      .authorize(data)
      .then(() => {
        checkToken();
      })
      .then(() => {
        setLoggedIn(true);
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          return showMessage('Внесены неверные данные');
        } else if (err === 'Ошибка: 401') {
          return showMessage('Ошибка аутентификации');
        } else if (err === 'Ошибка: 500') {
          return showMessage('Сервер не отвечает');
        }
        console.log(err);
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
        showMessage('Изменения сохранены');
      })
      .catch((err) => {
        if (err === 'Ошибка: 500') {
          return showMessage('Сервер не отвечает');
        } else if (err === 'Ошибка: 400') {
          showMessage('Внесены неверные данные');
        } else if (err === 'Ошибка: 409') {
          return showMessage('Пользователь с таким email уже существует');
        }
        console.log(err);
      });
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
    if (!isSearched) {
      setIsLoading(true);
      new Promise(() => {
        moviesApi
          .getMovies()
          .then((data) => {
            setInitialCards(data);
          })
          .finally(() => setIsLoading(false));
      }).catch((err) => {
        if (err === 'Ошибка: 500') {
          showMessage('Сервер не отвечает');
        }
        console.log(err);
      });
    }

    setIsSearchedSavedMovie(searchValue);
    if (isSaved === true) {
      //
      //
      //

      isShortSavedMovie
        ? setSavedMovies(
            JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => {
              return item.duration < 40 && item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
            })
          )
        : setSavedMovies(
            JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => {
              return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
            })
          );
    } else {
      localStorage.setItem('searchedCards', JSON.stringify(initialCards.filter((item) => {
            return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
          })
        )
      );
      setCards(
        initialCards.filter((item) => {
          return item.nameRU.toLowerCase().includes(searchValue.trim().toLowerCase());
        })
      );
    }
    setIsSearched(true);
  }

  function isShortMovie(value, isSaved) {
    setIsShortMovieButton(value);
    setIsShortSavedMovie(value);
    if (isSaved === true) {
      if (isSearchedSavedMovie) {
        value
          ? setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => item.duration < 40 && item.nameRU.toLowerCase().includes(isSearchedSavedMovie)))
          : setSavedMovies(JSON.parse(localStorage.getItem('savedMovies'))?.filter((item) => item.duration > 0 && item.nameRU.toLowerCase().includes(isSearchedSavedMovie)));
      } else {
        value ? setSavedMovies(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration < 40)) : setSavedMovies(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration > 0));
      }
    } else {
      value ? setCards(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration < 40)) : setCards(JSON.parse(localStorage.getItem('searchedCards'))?.filter((item) => item.duration > 0));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Switch>

          <Route
          path='/' exact>
            <Main
            loggedIn={loggedIn} />
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
            isSearched={isSearched}
            isShortMovieButton={isShortMovieButton}
            savedMovies={savedMovies}
          ></ProtectedRoute>

          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            isSearched={isSearched}
            handleSubmit={handleSubmit}
            isShortMovie={isShortMovie}
            deleteMovie={deleteMovie}
            isShortMovieButton={isShortMovieButton}
            savedMovies={savedMovies}
          ></ProtectedRoute>

          <ProtectedRoute 
           path='/profile'
           component={Profile}
           onUpdateUser={handleUpdateUser}
           loggedIn={loggedIn}
           message={message}
           onSignout={handleLogout}>
           </ProtectedRoute>

          <Route
          path='/signup'>
            {!loggedIn 
            ? <Register
            message={message}
            onRegister={handleRegister} />
            : <Redirect
            to='/movies' />}
            </Route>

          <Route
          path='/signin'>
            {!loggedIn
            ? <Login
            onLogin={handleLogin}
            message={message} />
            : <Redirect
            to='/movies' />}
            </Route>

          <Route
          path='*'>
            <NotFound />
          </Route>

        </Switch>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
