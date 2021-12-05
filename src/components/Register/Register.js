import React from 'react';
import './Register.css';
// import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

function Register() {
  return (
    <section className='register'> 
      <div className='register__block'>
      <img className='logo__register' src={logo} alt='логотип' />
        <h2 className='register__heading'>Добро пожаловать!</h2>
      </div>

      <form className='register__form'>
        <span className='register__input'>Имя</span>
        <input className='register__field' name='name' type='text' minLength='2' maxLength='40' required></input>
        <span className='register__input-error'>Неверно заполнено поле 'Имя'</span>

        <span className='register__input'>E-mail</span>
        <input className='register__field' name='email' type='email' required></input>
        <span className='register__input-error'>Неверно заполнено поле 'E-mail'</span>

        <span className='register__input'>Пароль</span>
        <input className='register__field register__field-password' name='password' type='password' required minLength='8'></input>
        <span className='register__input-error'>Неверный пароль</span>

        <button type='submit' className='register__form-button'>Зарегистрироваться</button>
        <div className='register__signin'>
          <p className='register__link-title'>Уже зарегистрированы?</p>
          {/* <Link to='/signin' className='register__login-link'>
            Войти
          </Link> */}
        </div>
      </form>
    </section>
  );
}

export default Register;
