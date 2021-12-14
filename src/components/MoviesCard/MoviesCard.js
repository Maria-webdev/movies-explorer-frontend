import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import cards from '../../utils/cards';
import ExampleCard from '../../images/film-1.png';
import SavedMovieBtn from '../../images/saved-film_button.svg';
import SaveBtn from '../../images/save_button.svg';
import RemoveSavedMovie from '../../images/delete-film_button.svg';

function MoviesCard(props) {
  function Time(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    if (mins >= 60) {
      return hours + 'ч ' + minutes + 'м';
    } else {
      return minutes + 'м';
    }
  }
  let SavedMovie;
  const [isSaved, setIsSaved] = React.useState(false);
  const { pathname } = useLocation();
  SavedMovie = pathname === '/saved-movies';

  function handleSave() {
    setIsSaved(true);
  }

  function handleRemoveFromSaved() {
    setIsSaved(false);
  }

  return (
    <section className='moviecard'>
      <div className='moviecard__block'>
        {/* сделать ссылкой */}
        <img className='moviecard__pic' src={`https://api.nomoreparties.co${props.card.thumbnail}`} alt={`Кадр из фильма ${props.card.nameRU}`} />}
        <div className='moviecard__info'>
          <h3 className='moviecard__title'>{props.card.nameRu}</h3>
          <p className='moviecard__duration'>{Time(props.card.duration)}</p>
        </div>
        {SavedMovie ? (
           <button className='moviecard__button-delete' onClick={handleRemoveFromSaved}><img src={RemoveSavedMovie} alt='кнопка удаления фильмв из сохранённых'/></button>
        ) : (
          <> 
        {isSaved ?
      (
        <button className='moviecard__button-saved'><img src={SavedMovieBtn} alt='фильм сохранен'/></button>
      ) : (
        <button className='moviecard__button' onClick={handleSave}><img src={SaveBtn} alt='кнопка Сохранить'/></button>
      )
       }
      </> 
    )}
      </div>

    </section>
  );
};

export default MoviesCard;