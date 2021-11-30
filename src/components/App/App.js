import React from 'react';
import './App.css';

import Footer from '../Footer/Footer';
// import AboutProject from '../AboutProject/AboutProject';
// import Techs from '../Techs/Techs';
// import Register from '../Register/Register';
// import Login from '../Login/Login';
// import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className='page'>
        <div className='page__container'>

   
        
              <Footer />
               {/* <AboutProject />
               <Techs />
               <Register />
               <Login /> */}
               {/* <NotFound /> */}
               <Profile />



        </div>
    </div>
  );
}

export default App;