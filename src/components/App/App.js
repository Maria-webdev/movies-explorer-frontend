import React from 'react';
import './App.css';

// import Footer from '../Footer/Footer';
// import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  return (
    <div className='page'>
        <div className='page__container'>

   
           
              {/* <Footer />
               <AboutProject /> */}
               <Techs />
               <Register />
               <Login />



        </div>
    </div>
  );
}

export default App;