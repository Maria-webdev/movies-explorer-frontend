import React from 'react';
import './MoviesCard.css';
import cards from '../../utils/cards';
import ExampleCard from '../../images/film-1.png';
import SavedMovieBtn from '../../images/saved-film-button.png';
import SaveBtn from '../../images/save-button.png';

function MoviesCard(props) {
 
  const [isSaved, setIsSaved] = React.useState(false);

  function handleSave() {
    setIsSaved(true);
  }

  return (
    <section className='moviecard'>
      <div className='moviecard__block'>
        <img className='moviecard__pic' src={ExampleCard} alt='Кадр из фильма 33 слова о дизайне' />
        <div className='moviecard__info'>
          <h3 className='moviecard__title'>33 слова о дизайне</h3>
          <p className='moviecard__duration'>1ч 17м</p>
        </div>
        {isSaved ?
      (
        <div className='moviecard__button_saved'><img src={SavedMovieBtn} alt='фильм сохранен'/></div>
      ) : (
        <button className='moviecard__button' onClick={handleSave}><img src={SaveBtn} alt='кнопка Сохранить'/></button>
      )
    }
      </div>

    </section>
  );
};

export default MoviesCard;