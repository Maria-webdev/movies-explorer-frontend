import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Login(props) {
  return (
    <section className='login'>
      <div className='login__block'>
        <div className='logo__center'>
          <Logo />
        </div>
        <h2 className='login__heading'>Рады видеть!</h2>
      </div>

      <form className='login__form'>
        <span className='login__input'>E-mail</span>
        <input className='login__field' name='email' type='email' required></input>
        <span className='login__input_error'>Неверно заполнено поле 'E-mail'</span>

        <span className='login__input'>Пароль</span>
        <input className='login__field login__field_password' name='password' type='password' required minLength='8'></input>
        <span className='login__input_error'>Неверно заполнено поле 'Пароль'</span>

        <button className='login__form_button' type='submit'>
          Войти
        </button>

        <div className='login__signin'>
          <p className='login__link_title'>Ещё не зарегистрированы?</p>
          <Link to='/signup' className='login__login_link'>
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;

