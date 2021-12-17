import React from 'react';
import './SearchForm.css';
import SearchIcon from '../../images/search_icon.svg';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function SearchForm(props) {
  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const showError = 'Введите ключевое слово';
  
  function handlePick() {
    props.isShortMovie(isShortMovie);
    setIsShortMovie(!isShortMovie);
  }

  const {values, handleChange, errors, isValid} = useFormWithValidation({
    keyWord: '',
  })

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      props.handleSubmit(values.keyWord);
    }
  }

  return (
    <section className='search'>
      <div className='search__container'>
        <form onSubmit={handleSubmit} className='search__form' noValidate>
          <div className='search__input-block'>
            <input className='search__input' type='text' name='keyWord'
                   value={values.keyWord} id='search' onChange={handleChange} placeholder='Фильм'
                   autoComplete='off' minLength='2' maxLength='200' required/>
            <button className='search__button' type='submit'><img src={SearchIcon} alt='иконка кнопки поиска'/></button>
          </div>        
        </form>
        <div className='search__short'>
            <p className='search__short_title'>Короткометражки</p>

            <div onClick={handlePick}
            className={`search__short_button ${isShortMovie ? '_picked1' : ''}`}>
              <div className={`search__short_disk ${isShortMovie ? '_picked2' : ''}`}>
              </div>
            </div>
          </div>
    
      </div>
    </section>
  );
};

export default SearchForm; 