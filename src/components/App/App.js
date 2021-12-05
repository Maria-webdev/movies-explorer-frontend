import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Preloader from './../Preloader/Preloader';
import Main from './../Main/Main';
import Movies from './../Movies/Movies';
import SavedMovies from './../SavedMovies/SavedMovies';

function App() {
  return (

      <Switch>

        <Route path='/' exact>
          <Main />
        </Route>

        <Route path='/movies'>
          <Movies />
          <Preloader />
        </Route>

        <Route path='/saved-movies'>
          <SavedMovies />
        </Route>

        <Route path='/profile'>
          <Profile />
        </Route>

        <Route path='/signup'>
          <Register />
        </Route>

        <Route path='/signin'>
          <Login />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
        
      </Switch>
  );
}

export default App;
