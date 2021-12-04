import React from 'react';
// import { Link } from 'react-router-dom';
import './Profile.css';
import logo from '../../images/logo.png';

function Profile() {
  return (
    <section className='profile'>
      <img className='logo' src={logo} alt='логотип' />
      <h2 className='profile__heading'>Привет, Виталий</h2>

      <article className='page__content'>
        <form className='profile__form'>

          <div className='profile__input-box'>
            <span className='profile__input'>Имя</span>
            <input className='profile__field-name' name='name' type='text' minLength='2' maxLength='40' required></input>
          </div>
          <span className='profile__input-error'>Неверно заполнено поле 'Имя'</span>
          
          <div className='line'></div>

          <div className='profile__input-box'>
            <span className='profile__input'>E-mail</span>
            <input className='profile__field-email' name='email' type='email' required></input>
          </div>
          <span className='profile__input-error'>Неверно заполнено поле 'E-mail'</span>


          <button type='submit' className='profile__form-button'>Редактировать</button>
          {/* <Link to='/'>
            <p className='profile__link' >Выйти из аккаунта</p>
          </Link> */}

        </form>
      </article>
    </section>
  );
}

export default Profile;
