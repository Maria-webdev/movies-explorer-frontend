import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Main from './../Main/Main';
import Movies from './../Movies/Movies';
import SavedMovies from './../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  return (

      <Switch>

        <Route path='/' exact 
        component={Main}>
        </Route>

        <ProtectedRoute path='/movies'
        component={Movies}
        />

        <ProtectedRoute path='/saved-movies'
        component={SavedMovies}
        />

        <ProtectedRoute path='/profile'
        component={Profile}
        />

        <Route path='/signup'
        component={Register}
        />

        <Route path='/signin'
        component={Login}
        />

        <Route path='*'
        component={NotFound}
        />
        
      </Switch>
  );
}

export default App;
