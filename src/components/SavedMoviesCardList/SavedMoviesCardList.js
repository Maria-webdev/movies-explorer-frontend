import React from 'react';
import '../MoviesCardsList/MoviesCardsList.css';
import MoviesCard from  '../MoviesCard/MoviesCard.js';
import './SavedMoviesCardList.css';
import cards from '../../utils/cards';

function SavedMovies() {
return (
  <section className='movies-cardlist'>
      <section className='movies-cardlist__section'>
        <ul className='cards__list'>
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </ul>
        </section>
    </section>

);
};

export default SavedMovies;
