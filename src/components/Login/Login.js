import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Login(props) {

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  
  React.useEffect(() => {
    resetForm({});
  }, [resetForm]);

  function handleSubmit(e) {
     e.preventDefault();
     if (!values.email || !values.password) {
      return;
    }
     const { email, password } = values;//в консоль выводятся введённые email и пароль
     props.onLogin({email, password});//не функция?
    
  }

  return (
    <section className='login'>
      <div className='login__block'>
        <div className='logo__center'>
          <Logo />
        </div>
        <h2 className='login__heading'>Рады видеть!</h2>
      </div>

      <form className='login__form' onSubmit={handleSubmit} noValidate>
        <span className='login__input'>E-mail</span>
        <input className='login__field' autoComplete='new-email' onChange={handleChange} id='email-login' name='email' type='email' required value={values.email || ''} ></input>
        {errors.email ? (<span className='register__input_error'>{errors.email}</span>) : null}

        <span className='login__input'>Пароль</span>
        <input className='login__field login__field_password' autoComplete='new-password' onChange={handleChange} id='password-login' name='password' type='password' required minLength='10' value={values.password || ''} ></input>
        {errors.password ? (<span className='register__input_error'>{errors.password}</span>) : null}

        <button type='submit' className={`login__form_button ${!isValid ? 'login__form_button_disabled' : ''} `}>
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

