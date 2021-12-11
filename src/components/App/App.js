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
import api from '../../utils/api';
import moviesApi from '../../utils/moviesApi';
import * as auth from '../../utils/auth';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const [isSuccess, setSuccess] = React.useState(false);

  const checkToken = React.useCallback(() => {
    auth.checkToken()
    .then((data) => {
      if (data) {
        setLoggedIn(true);
        setEmail(data.email);
        history.push('/');
      } else {
        setSuccess(false);
      }
    })
    .catch((err) => console.log(err));
  }, [history])

  React.useEffect(() => {
    checkToken();
  }, [checkToken])

  React.useEffect(() => {
    if (loggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((result) => {
        setCurrentUser(result[0]);
        setCards(result[1].reverse());
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  }, [loggedIn, history]);

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        history.push('/signin');
        setSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        setEmail(email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
      });
  }

  function handleLogout() {
    auth
    .signOut()
    .then((res) => {
    setEmail('');
    setLoggedIn(false);
    history.push('/signin');
    })
    .catch((err) => {
      console.error(err);
      setSuccess(false);
    });
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <>

    <Switch>

      <Route path='/' exact
      component={Main}>
      </Route>

      <ProtectedRoute path='/movies'
      component={Movies}
      loggedIn={loggedIn}
      onSignout={handleLogout}>
        {!loggedIn ? <Redirect to='/' /> : <Movies />}
      </ ProtectedRoute>

      <ProtectedRoute path='/saved-movies'
      component={SavedMovies}
      loggedIn={loggedIn} >
        {!loggedIn ? <Redirect to='/' /> : <SavedMovies />}
      </ ProtectedRoute>

      <ProtectedRoute path='/profile'
      component={Profile}
      onUpdateUser={handleUpdateUser}
      loggedIn={loggedIn}
      onSignout={handleLogout}>
        {!loggedIn ? <Redirect to='/' /> : <Profile />}
      </ ProtectedRoute>

      <Route path='/signup'
      onRegister={handleRegister}
      onSignout={handleLogout}>
        {loggedIn ? <Redirect to='/movies' /> : <Register />}
      </Route>

      <Route path='/signin'
      onLogin={handleLogin}
      onSignout={handleLogout} >
        {loggedIn ? <Redirect to='/movies' /> : <Login />}
      </Route>

      <Route path='/*'>
        <NotFound
        loggedIn={loggedIn}
        onSignout={handleLogout}/>
      </Route>

    </Switch>

    </>
    </CurrentUserContext.Provider>
  );
}

export default App;