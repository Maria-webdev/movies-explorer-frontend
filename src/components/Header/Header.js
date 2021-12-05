import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import './../App/App.css';
import Logo from '../Logo/Logo';

function Header() {
  return (
    <section className='header'>
      <article className='header__section'>
        <Logo />
        <div className='header__nav'>
          <Link to='/signup' className='header__link'>
            Регистрация
          </Link>
          <button className='header__button'>
            <Link to='/signin' className='header__button_link'>
              Войти
            </Link>
          </button>
        </div>
      </article>
    </section>
  );
}

export default Header;
