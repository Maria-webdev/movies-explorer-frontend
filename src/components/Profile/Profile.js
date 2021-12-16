import React from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import './Profile.css';
import Header from '../Header/Header';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = useFormWithValidation ({
    name: '',
    email: '',
    password: ''
  })

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({ email: values.email, name: values.name });
  }

  return (
    <section className='profile'>
      <Header loggedIn={props.loggedIn}/>
      <h2 className='profile__heading'>{`Привет, ${currentUser.name}!`}</h2>
      <div className='profile__content'>
        <form className='profile__form'>
          <div className='profile__input-box'>
            <span className='profile__input'>Имя</span>
            <input className='profile__field_name' value={values.name || currentUser.name} onChange={handleChange} name='name' type='text' minLength='2' maxLength='40' required></input>
            {errors.name ? (<span className='profile__input_error'>errors.name</span>) : null}
          </div>
          <div className='profile__input-box'>
            <span className='profile__input'>E-mail</span>
            <input className='profile__field_email' value={values.email || currentUser.email} onChange={handleChange} name='email' type='email' required></input>
            {errors.email ? (<span className='profile__input_error'>errors.email</span>) : null}
          </div>
          <button type='submit' onSubmit={handleSubmit} className={`profile__form_button
          ${!isValid || (values.email === currentUser.email && values.name === currentUser.name) ? 'profile__form_button_disabled' : ''}`}>
            Редактировать
          </button>
          <Link to='/' onClick={props.onSignout} className='profile__link'>
            Выйти из аккаунта
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Profile;