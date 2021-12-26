import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import SearchIcon from '../../images/search_icon.svg';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function SearchForm(props) {
  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [isEmptyInput, setIsEmptyInput] = React.useState(true);
  const { pathname } = useLocation();
  const isMoviesPage = pathname === '/movies';
  const isSavedMoviesPage = pathname === '/saved-movies';

  function handlePick() {
    props.isShortMovie(!isShortMovie);
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

  // кнопка Короткометражки _disabled
  // if((props.isSaved && props.savedMovies.length >= 1) || (props.cards.length >=1 && !props.isSaved)) {}
  // React.useEffect(() => {
  //   if (isSavedMoviesPage) {
  //     if  (props.savedMovies.length >= 1) {
  //       console.log(props.savedMovies.length);
  //       setIsEmptyInput(false);
  //     }
  //   } else { 
  //     if (isMoviesPage) {
  //     if (props.cards.length >= 1) {
  //       setIsEmptyInput(false);
  //       console.log(props.cards.length);
  //     }}
  //   }
  // }, [isEmptyInput]);

  return (
    <section className='search'>
      <div className='search__container'>
        <form onSubmit={handleSubmit} className='search__form' noValidate>
          <div className='search__input-block'>
          <input className='search__input' type='text' name='keyWord'
                   value={values.keyWord || ''} id='search' onChange={handleChange} placeholder='Фильм'
                   autoComplete='off' minLength='1' maxLength='200' required key={values.keyWord}/>
            {!isValid ? (<p className='search__input_error'>Нужно ввести ключевое слово</p>) : null}
            <button className='search__button' type='submit'><img src={SearchIcon} alt='иконка кнопки поиска'/></button>
          </div>        
        </form>
        <div className='search__short'>
            <p className='search__short_title'>Короткометражки</p>
            <div onClick={handlePick}
            className='search__short_button'/*{`search__short_button ${isEmptyInput ? '_disabled': ''}`}*/ >
              <div className={`search__short_disk ${isShortMovie ? '_isChoosenButton' : ''}`}>
              </div>
            </div>
          </div>
    
      </div>
    </section>
  );
};

export default SearchForm; 