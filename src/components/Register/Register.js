import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Register(props) {

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  React.useEffect(() => {
    resetForm({});
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    const { name, email, password } = values;
    props.onRegister({ name, email, password });
  }

  return (
    <section className='register'>
      <div className='register__block'>
        <div className='register__center'>
          <Logo className='logo logo_register' />
        </div>
        <h2 className='register__heading'>Добро пожаловать!</h2>
      </div>

      <form className='register__form' onSubmit={handleSubmit} noValidate>
        
        <span className='register__input'>Имя</span>
        <input className='register__field' disabled={props.isLoading} autoComplete='new-name' onChange={handleChange} id='name' name='name' type='text' minLength='2' maxLength='40' required value={values.name || '' } ></input>
        {errors.name ? (<span className='register__input_error'>{errors.name}</span>) : null}
        
        <span className='register__input'>E-mail</span>
        <input className='register__field' disabled={props.isLoading} autoComplete='new-email' onChange={handleChange} id='email' name='email' type='email' required value={values.email || ''}></input>
        {errors.email ? (<span className='register__input_error'>{errors.email}</span>) : null}

        <span className='register__input'>Пароль</span>
        <input className='register__field register__field_password' disabled={props.isLoading} autoComplete='new-password' onChange={handleChange} id='password' name='password' type='password' required minLength='10' value={values.password || ''}></input>
        {errors.password ? (<span className='register__input_error'>{errors.password}</span>) : null}

        <span className='register__message'>{props.message}</span>
      
        <button type='submit' className={`register__form_button ${!isValid || props.isLoading ? 'register__form_button_disabled' : ''} `}>
          Зарегистрироваться
        </button>

        <div className='register__signin'>
          <p className='register__link_title'>Уже зарегистрированы?</p>
          <Link to='/signin' className='register__login_link' >
            Войти
          </Link>
        </div>

      </form>
    </section>
  );
}

export default Register;
