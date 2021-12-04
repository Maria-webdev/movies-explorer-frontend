import React from 'react';
import './SearchForm.css';
import SearchIcon from '../../images/search_icon.png';

function SearchForm() {

  return (
    <section className='search'>
      <div className='search__container'>
        <form className='search__form'>
          <div className='search__input-block'>
            <input className='search__input' type='text' placeholder='Фильм' autoComplete='off' minLength='2' maxLength='200'/>
            <button className='search__button' type='submit'><img src={SearchIcon} alt='иконка кнопки поиска'/></button>
          </div>        
        </form>
        <div className='search_short'>
            <p className='search__short-title'>Короткометражки</p>
            <div className='search__short-button'>
              <div className='search__short-disk'></div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default SearchForm;