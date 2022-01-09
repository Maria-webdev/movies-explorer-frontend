import React from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import './Profile.css';
import Header from '../Header/Header';

function Profile(props) {
  const {email, name} = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = useFormWithValidation ({
    name: '',
    email: ''
  })

  const [hasChanges, setHasChanges] = React.useState(false);

  React.useEffect(() => {
    values.name = name;
    values.email = email;
  }, [])

  React.useEffect(() => {
    setHasChanges((values.name !== name) || (values.email !== email));
  }, [values.name, values.email, name, email]
  );

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({ email: values.email || email, name: values.name || name });
  }

  return (
    <section className='profile'>
      <Header loggedIn={props.loggedIn}/>
      <h2 className='profile__heading'>{`Привет, ${name}!`}</h2>
      <div className='profile__content'>
        <form className='profile__form' onSubmit={handleSubmit} >
          <div className='profile__input-box'>
            <span className='profile__input'>Имя</span>
            <input className='profile__field_name' value={values.name || name} onChange={handleChange} name='name' type='text' minLength='2' maxLength='40' required />
            {errors.name ? (<span className='profile__input_error'>{errors.name}</span>) : null}
          </div>
          <div className='profile__input-box'>
            <span className='profile__input'>E-mail</span>
            <input className='profile__field_email' value={values.email || email} onChange={handleChange} name='email' type='email' required />
            {errors.email ? (<span className='profile__input_error'>{errors.email}</span>) : null}
          </div>
          <button type='submit' disabled={!hasChanges || !isValid} className={`profile__form_button
          ${!isValid || !hasChanges ? 'profile__form_button_disabled' : ''}`}>
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