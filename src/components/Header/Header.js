import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import './../App/App.css';
import Logo from '../Logo/Logo';
import ProfileIcon from '../../images/profile_icon.svg';
import Burger from '../../images/burger.svg';
import CloseButton from '../../images/close_button.svg';

function Header({loggedIn}) {
  const { pathname } = useLocation();
  const isTablet = window.matchMedia('(max-width: 1023px)').matches;
  const isColor = pathname === '/' ? '' : '_color';
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = React.useState(false);

  function handleOpenBurger() {
    setIsBurgerMenuOpened(true);
  }

  function handleCloseBurger() {
    setIsBurgerMenuOpened(false);
  }

  return (
    <header className={`header ${isColor}`}>
      <article className='header__section'>
        <Logo />
        {!loggedIn ? (
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
        ) : (
          <div className='header__nav'>
          {isTablet ? (
            <button onClick={handleOpenBurger} className='header__button-burger'>
              <img src={Burger} alt='кнопка открытия скрытого меню' />
            </button>
          ) : (
            <>
              <Link to='/movies' className='header__link_logged'>
                Фильмы
              </Link>
              <Link to='/saved-movies' className='header__link_logged'>
                Сохранённые фильмы
              </Link>
              <Link to='/profile' className='header__link_profile'>
                <p className='header__link_profile_title'>Аккаунт</p>
                <div className='header__link_profile_image-box'><img className='header__link_profile_image' src={ProfileIcon} alt='значок аккаунта' /></div>
              </Link>
            </>
          )}
        </div>
        )}
      </article>
      <div className={`burger__overlay ${isBurgerMenuOpened ? '_showed' : ''}`}>
        <div className={`burger-menu ${isBurgerMenuOpened ? '_opened' : ''}`}>
        <button className='burger__close-button' onClick={handleCloseBurger}>
          <img src={CloseButton} alt='кнопка закрытия скрытого меню' />
        </button>
        <div className='burger-menu__links'>
          <Link to='/' className='burger-menu__link'  onClick={handleCloseBurger}>
            Главная
          </Link>
          <Link to='/movies' className='burger-menu__link _active'  onClick={handleCloseBurger}>
            Фильмы
          </Link>
          <Link to='/saved-movies' className='burger-menu__link'  onClick={handleCloseBurger}>
            Сохранённые фильмы
          </Link>
          <Link to='/profile' className='burger-menu__link_profile'  onClick={handleCloseBurger}>
            <p className='burger-menu__link_profile_title'>Аккаунт</p>
            <div className='header__link_profile_image-box'><img className='burger-menu__link_profile_image' src={ProfileIcon} alt='значок аккаунта' /></div>
          </Link>
        </div>
      </div>
      </div>
    </header>
  );
}

export default Header;

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