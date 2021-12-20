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

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const [isFiltered, setIsFiltered] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesId, setSavedMoviesId] = React.useState([]);

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
          }
      else {
        setSavedMovies(JSON.parse(savedMovieLocalStorage));
      }
    }
  }, [loggedIn]);


  const checkToken = React.useCallback(() => {
    auth.checkToken()
    .then((data) => {
        setLoggedIn(true);
        setEmail(data.email);
    })
    .catch((err) => console.log(err));
  }, [])

  React.useEffect(() => {
    checkToken();
  }, [checkToken])

  React.useEffect(() => {
    if (loggedIn) {
    Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
      .then((result) => {
        setCurrentUser(result[0]);
        setCards(result[1].reverse());
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleRegister(data) {
    auth
      .register(data)
      .then(() => {
        handleLogin(data);
        history.push('/movies')
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
        history.push('/movies')
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleLogout() {
    auth
    .signOut()
    .then((res) => {
    setLoggedIn(false);
    setCurrentUser({
      name: '',
      email: '',
    });
    history.push('/');
    })
    .catch((err) => {
      console.error(err);
    });
  }

  function handleUpdateUser(email, name) {
    mainApi
    .editUserInfo(email, name)
    .then((res) => {
      localStorage.setItem('currentUser', JSON.stringify(res));
      setCurrentUser(res);
    })
    .catch((err) => console.log(err));
}

  function handleMovieSave(card) {
    mainApi
      .saveMovie(card)
      .then((res) => {
        setSavedMoviesId([...savedMoviesId, card.id]);
        setSavedMovies([...savedMovies, res]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function deleteMovie(card) {
    let cardId = savedMovies.filter(
      (f) => f.cardId === card.id || f.data?.cardId === card.id
    )[0];
    if (cardId) {
      cardId = cardId._id || cardId._id;
    }
    mainApi
      .deleteMovieFromSaved(card.owner ? card._id : cardId)
      .then((deleted) => {
        setSavedMovies(savedMovies.filter((film) => film._id !== deleted._id));
        setSavedMoviesId(savedMoviesId.filter((id) => id !== deleted.movieId));
      })
      .catch((err) => {
        console.error(err);
      });
  };


  function handleSubmit(searchValue) {
    localStorage.setItem('searchedCards', JSON.stringify(cards.filter((item) => {
      return item.nameRU.toLowerCase().includes(searchValue.toLowerCase())
    })));
    localStorage.getItem('searchedCards')
  }

  function isShortMovie(value) {
    value
      ? setCards(cards.filter((item) => item.duration < 40))
      : setIsFiltered(isFiltered.filter((item) => item.duration > 0))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <>

    <Switch>

      <Route path='/' exact
      component={Main}
      loggedIn={loggedIn} >
      </Route>


    <ProtectedRoute
      path='/movies'
      component={Movies}
      loggedIn={loggedIn}
      onSignout={handleLogout}
      cards={cards}
      handleSubmit={handleSubmit}
      isShortMovie={isShortMovie}
      handleSaveMovie={handleMovieSave}
      deleteMovie={deleteMovie}
      savedMovies={savedMovies}>
        {!loggedIn ? <Redirect to='/' /> : <Movies />}
        </ ProtectedRoute>

    <ProtectedRoute
      path='/saved-movies'
      component={SavedMovies}
      loggedIn={loggedIn} 
      onSignout={handleLogout}
      cards={cards}
      handleSubmit={handleSubmit}
      isShortMovie={isShortMovie}
      deleteMovie={deleteMovie}
      savedMovies={savedMovies}>
        {!loggedIn ? <Redirect to='/' /> : <SavedMovies />}
      </ ProtectedRoute>

      <ProtectedRoute path='/profile'
      component={Profile}
      onUpdateUser={handleUpdateUser}
      loggedIn={loggedIn}
      onSignout={handleLogout}
      >
         {!loggedIn ? <Redirect to='/' /> : <Profile />}
      </ ProtectedRoute>

      <Route path='/signup'>
      {!loggedIn ? (
        <Register
        onRegister={handleRegister}
       />
      ) : (
        <Redirect to='/profile' />
      )}
      </Route>

      <Route path='/signin'>
      {!loggedIn ? (
        <Login
        onLogin={handleLogin}
       />
      ) : (
        <Redirect to='/profile' />
      )}
       </Route>

      <Route path='*'>
        <NotFound
        loggedIn={loggedIn}/>
      </Route>

    </Switch>

    </>
    </CurrentUserContext.Provider>
  );
}

export default App;