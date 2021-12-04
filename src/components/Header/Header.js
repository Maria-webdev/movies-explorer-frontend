import React from 'react';
import './Header.css';
import './../App/App.css';
import Logo from '../../images/logo.png';

function Header() {
  return (
    <section className='header'>
      <article className='header__section'>
        <img className='logo' src={Logo} alt='логотип' />
        <div className='header__nav'>
          <p className='header__link'>
            Регистрация
          </p>
          <button className='header__button'>Войти</button>        
        </div>

      </article>
    </section>
  );
}

export default Header;
