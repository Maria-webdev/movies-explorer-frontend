import React from 'react';
import { useLocation } from 'react-router';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import './../App/App.css';
import Logo from '../../images/logo.png';
import MobileNavigation from '../MobileNavigation/MobileNavigation';

function Header({ loggedIn }) {
  let location = useLocation();

  return (
    <header
      className={`${
        location.pathname === '/'
          ? 'header'
          : 'header header-logged-in'
      }`}
    >
      <article className='header__section'>
        <Logo />
        <Navigation loggedIn={loggedIn} />
        <MobileNavigation loggedIn={loggedIn} />
      </article>
    </header>
  );
}

export default Header;