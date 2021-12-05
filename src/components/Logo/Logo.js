import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
import LogoIcon from '../../images/logo.png';

function Logo() {
  return (
    <section className='logo'>
      <Link to='/'>
        <img className='logo__button' src={LogoIcon} alt='логотип' />
      </Link>
    </section>
  );
}

export default Logo;