import React from 'react';
import './App.css';

import Register from '../Register/Register';
import Login from '../Login/Login';
// import NotFound from '../NotFound/NotFound';
// import Profile from '../Profile/Profile';
// import Preloader from './../Preloader/Preloader';
// import Main from './../Main/Main';
// import Movies from './../Movies/Movies';
// import SavedMovies from './../SavedMovies/SavedMovies';



function App() {
  return (
    <div className='page'>
   

               <Register />
        <Login />
        {/* <NotFound /> */}
        {/* <Profile /> */}
               {/* <Preloader /> */}
        {/* <Main /> */}
        {/* <Movies /> */}
        {/* <SavedMovies /> */}
      </div>
  );
}

export default App;