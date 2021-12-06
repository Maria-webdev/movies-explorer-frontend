import React from 'react';
import './MoviesCard.css';
import cards from '../../utils/cards';
import ExampleCard from '../../images/film-1.png';

function MoviesCard(props) {

  return (
    <section className='moviecard'>
      <div className='moviecard__block'>
        <img className='moviecard__pic' src={ExampleCard} alt='Кадр из фильма 33 слова о дизайне' />
        <div className='moviecard__info'>
          <h3 className='moviecard__title'>33 слова о дизайне</h3>
          <p className='moviecard__duration'>1ч 17м</p>
        </div>
      </div>
      <button className='Сохранить'></button>
    </section>
  );
};

export default MoviesCard;