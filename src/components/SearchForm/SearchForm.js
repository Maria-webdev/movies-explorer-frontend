import React from 'react';
import './SearchForm.css';
import SearchIcon from '../../images/search_icon.svg';

function SearchForm(props) {
  const [isShortMovie, setIsShortMovie] = React.useState(false);

  function handlePick() {
    setIsShortMovie(!isShortMovie);
  }

  // React.useEffect(() => {
  //   setCards(props.cards.filter((item) => item.duration < 40)
  //   )
  // }, [isShort])

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

            <div onClick={handlePick} className={`search__short_button ${isShortMovie ? '_picked1' : ''}`}>
              <div className={`search__short_disk ${isShortMovie ? '_picked2' : ''}`}></div>
            </div>
          </div>
    
      </div>
    </section>
  );
};

export default SearchForm;