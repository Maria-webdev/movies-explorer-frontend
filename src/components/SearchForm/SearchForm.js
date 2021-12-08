import React from 'react';
import './SearchForm.css';
import SearchIcon from '../../images/search_icon.svg';

function SearchForm() {
  const [isPicked, setIsPicked] = React.useState(false);

  function handlePick() {
    setIsPicked(true);
  }

  function handleUnpick() {
    setIsPicked(false);
  }

  return (
    <section className='search'>
      <div className='search__container'>
        <form className='search__form'>
          <div className='search__input-block'>
            <input className='search__input' type='text' placeholder='Фильм' autoComplete='off' minLength='2' maxLength='200' required/>
            <button className='search__button' type='submit'><img src={SearchIcon} alt='иконка кнопки поиска'/></button>
          </div>        
        </form>
        <div className='search__short'>
            <p className='search__short_title'>Короткометражки</p>

            <div onClick={handlePick} className={`search__short_button ${isPicked ? '_picked1' : ''}`}>
              <div className={`search__short_disk ${isPicked ? '_picked2' : ''}`}></div>
            </div>
          </div>
    
      </div>
    </section>
  );
};

export default SearchForm;