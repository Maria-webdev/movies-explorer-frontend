import React from 'react';
import './Login.css';
// import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

function Login() {
  return (
    <section className='login'>
      <div className='login__block'>
      <img className="logo" src={logo} alt="логотип" />
        <h2 className='login__heading'>Рады видеть!</h2>
      </div>

      <form className='login__form'>
        <span className='login__input'>E-mail</span>
        <input className='login__field' name='email' type='email' required></input>
        <span className='login__input-error' id='email-error'>Неверно заполнено поле 'E-mail'</span>

        <span className='login__input'>Пароль</span>
        <input className='login__field login__field-password' name='password' type='password' required minLength='8'></input>
        <span className='login__input-error' id='password-error'>Неверно заполнено поле 'Пароль'</span>

        <button className='login__form-button' type='submit'>Войти</button>

        <div className='login__signin'>
          <p className='login__link-title'>Ещё не зарегистрированы?</p>
          {/* <Link to='/signup' className='login__login-link'>
            Регистрация
          </Link> */}
        </div>
      </form>
    </section>
  );
}

export default Login;
