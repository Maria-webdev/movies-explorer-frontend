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
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  const checkToken = React.useCallback(() => {
    auth.checkToken()
    .then((data) => {
        setLoggedIn(true);
        setEmail(data.email);
    })
    .catch((err) => console.log(err));
  }, [history])

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

  // React.useEffect(() => {
  //   if (loggedIn) {
  //     history.push('/movies')
  //   }
  // }, [loggedIn, history]);

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleLogout() {
    mainApi
    .signOut()
    .then((res) => {
    setLoggedIn(false);
    setCurrentUser({
      name: "",
      email: "",
    });
    history.push('/');
    })
    .catch((err) => {
      console.error(err);
    });
  }

  function handleUpdateUser(data) {
    mainApi
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
      onSignout={handleLogout}
      cards={cards}>
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
      onSignout={handleLogout}
      >
        {!loggedIn ? <Redirect to='/' /> : <Profile />}
      </ ProtectedRoute>

      <Route path='/signup'>
      {!loggedIn ? (
        <Register handleRegister={handleRegister}
        onSignout={handleLogout}
       />
      ) : (
        <Redirect to='/profile' />
      )}
      </Route>

      <Route path='/signin'
      handleLogin={handleLogin}
      onSignout={handleLogout} >
        {loggedIn ? <Redirect to='/profile' /> : <Login />}
      </Route>

      <Route path='*'>
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