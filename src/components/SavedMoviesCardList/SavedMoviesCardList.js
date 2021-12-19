import React from 'react';
import '../MoviesCardsList/MoviesCardsList.css';
import MoviesCard from  '../MoviesCard/MoviesCard.js';
import './SavedMoviesCardList.css';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
return (
  <section className='movies-cardlist'>
    {props.isLoading ? (
        <Preloader />
      ) : (
      <section className='movies-cardlist__section'>
        <ul className='cards__list'>
        {props.cards.map((item) => (
           <MoviesCard card={item} key={item.id}/>
        ))}
        </ul>
        </section>
      )}
    </section>

);
};

export default SavedMovies;